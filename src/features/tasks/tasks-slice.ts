import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { appActions } from 'app'
import { handleServerAppError, handleServerNetworkError } from 'common/utils'
import { RESULT_CODE, TaskPriorities, TaskStatuses } from 'common/enums'
import { CreateTaskArg, RemoveTaskArg, ApiTask, tasksApi, UpdateTaskArg, UpdateApiTaskModel } from './tasks-api'
import { RequestStatus } from 'common/types'
import { clearTodolistsAndTasks } from 'common/actions'
import { todolistsActions, todolistsThunks } from 'features/todolists'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'

export type TasksInitialState = ReturnType<typeof tasksSlice.getInitialState>

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as { [key: string]: DomainTask[] },
  reducers: {
    setTaskEntityStatus: (
      state,
      action: PayloadAction<{ todolistId: string; taskId: string; entityStatus: RequestStatus }>
    ) => {
      const tasks = state[action.payload.todolistId]
      const task = tasks.find((t) => t.id === action.payload.taskId)
      if (task) {
        task.entityStatus = action.payload.entityStatus
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        action.payload.tasks.forEach((t) => {
          state[action.payload.todolistId].push({ ...t, entityStatus: 'idle' })
        })
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        tasks.unshift({ ...action.payload.task, entityStatus: 'idle' })
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.task.id)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.task }
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks.splice(index, 1)
        }
      })
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(clearTodolistsAndTasks, () => {
        return {}
      })
  },
})

// thunks
const fetchTasks = createAppAsyncThunk<{ tasks: ApiTask[]; todolistId: string }, string>(
  `${tasksSlice.name}/fetchTasks`,
  async (todolistId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
      const res = await tasksApi.getTasks(todolistId)
      const tasks = res.data.items
      dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
      return { tasks, todolistId }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  }
)

const addTask = createAppAsyncThunk<{ task: ApiTask; todolistId: string }, CreateTaskArg>(
  `${tasksSlice.name}/addTask`,
  async (arg, { dispatch, rejectWithValue }) => {
    const { todolistId } = arg

    dispatch(todolistsActions.setTodolistEntityStatus({ id: todolistId, entityStatus: 'loading' }))

    try {
      const res = await tasksApi.createTask(arg)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        const task = res.data.data.item
        dispatch(todolistsActions.setTodolistEntityStatus({ id: todolistId, entityStatus: 'succeeded' }))
        return { task, todolistId }
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(todolistsActions.setTodolistEntityStatus({ id: todolistId, entityStatus: 'failed' }))
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      dispatch(todolistsActions.setTodolistEntityStatus({ id: todolistId, entityStatus: 'failed' }))
      return rejectWithValue(null)
    }
  }
)

const updateTask = createAppAsyncThunk<{ task: ApiTask; todolistId: string }, UpdateTaskArg<UpdateDomainTaskModel>>(
  `${tasksSlice.name}/updateTask`,
  async (arg, { dispatch, rejectWithValue, getState }) => {
    const { todolistId, taskId, model } = arg

    dispatch(tasksActions.setTaskEntityStatus({ todolistId, taskId, entityStatus: 'loading' }))

    try {
      const task = getState().tasks[todolistId].find((t) => t.id === taskId)
      if (!task) {
        return rejectWithValue(null)
      }

      const apiModel: UpdateApiTaskModel = {
        title: task.title,
        status: task.status,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...model,
      }

      const res = await tasksApi.updateTask({ todolistId, taskId, model: apiModel })

      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        const task = res.data.data.item
        dispatch(tasksActions.setTaskEntityStatus({ todolistId, taskId, entityStatus: 'succeeded' }))
        return { todolistId, task }
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(tasksActions.setTaskEntityStatus({ todolistId, taskId, entityStatus: 'failed' }))
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      dispatch(tasksActions.setTaskEntityStatus({ todolistId, taskId, entityStatus: 'failed' }))
      return rejectWithValue(null)
    }
  }
)

const removeTask = createAppAsyncThunk<RemoveTaskArg, RemoveTaskArg>(
  `${tasksSlice.name}/removeTask`,
  async (arg, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
    dispatch(tasksActions.setTaskEntityStatus({ ...arg, entityStatus: 'loading' }))

    try {
      const res = await tasksApi.deleteTask(arg)

      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(tasksActions.setTaskEntityStatus({ ...arg, entityStatus: 'succeeded' }))
        dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))

        return arg
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(tasksActions.setTaskEntityStatus({ ...arg, entityStatus: 'failed' }))
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      dispatch(tasksActions.setTaskEntityStatus({ ...arg, entityStatus: 'failed' }))
      return rejectWithValue(null)
    }
  }
)

// types
type UpdateDomainTaskModel = {
  title?: string
  status?: TaskStatuses
  description?: string
  priority?: TaskPriorities
  startDate?: Date | null
  deadline?: Date | null
}
export type DomainTask = ApiTask & {
  entityStatus: RequestStatus
}
export type TasksState = ReturnType<typeof tasksSlice.getInitialState>

export const tasksReducer = tasksSlice.reducer
export const tasksActions = tasksSlice.actions
export const tasksThunks = { fetchTasks, addTask, updateTask, removeTask }
