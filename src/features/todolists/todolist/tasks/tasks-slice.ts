import {
  CreateTaskArg,
  RemoveTaskArg,
  Task,
  todolistsApi,
  UpdateTaskArg,
  UpdateTaskModel,
} from 'features/todolists/todolists-api'
import { appActions, RequestStatus } from 'app/appSlice'
import { todolistsActions } from 'features/todolists/todolistsSlice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils'
import { RESULT_CODE, TaskPriorities, TaskStatuses } from 'common/enums/enums'

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as { [key: string]: TaskDomain[] },
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
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(todolistsActions.removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todolistsActions.clearTodolistsData, (state) => {
        const todolistIds = Object.keys(state)
        todolistIds.forEach((id) => {
          delete state[id]
        })
      })
  },
})

// thunks
const fetchTasks = createAppAsyncThunk<{ tasks: Task[]; todolistId: string }, string>(
  `${tasksSlice.name}/fetchTasks`,
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
      const res = await todolistsApi.getTasks(todolistId)
      const tasks = res.data.items
      dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
      return { tasks, todolistId }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  }
)

const addTask = createAppAsyncThunk<{ task: Task; todolistId: string }, CreateTaskArg>(
  `${tasksSlice.name}/addTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    const { todolistId } = arg

    dispatch(todolistsActions.setTodolistEntityStatus({ id: todolistId, entityStatus: 'loading' }))

    try {
      const res = await todolistsApi.createTask(arg)
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

const updateTask = createAppAsyncThunk<{ task: Task; todolistId: string }, UpdateTaskArg<UpdateTaskDomainModel>>(
  `${tasksSlice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    const { todolistId, taskId, model } = arg

    dispatch(tasksActions.setTaskEntityStatus({ todolistId, taskId, entityStatus: 'loading' }))

    try {
      const task = getState().tasks[todolistId].find((t) => t.id === taskId)
      if (!task) {
        return rejectWithValue(null)
      }

      const apiModel: UpdateTaskModel = {
        title: task.title,
        status: task.status,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...model,
      }

      const res = await todolistsApi.updateTask({ todolistId, taskId, model: apiModel })

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
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    dispatch(tasksActions.setTaskEntityStatus({ ...arg, entityStatus: 'loading' }))

    try {
      const res = await todolistsApi.deleteTask(arg)

      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(tasksActions.setTaskEntityStatus({ ...arg, entityStatus: 'succeeded' }))
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
type UpdateTaskDomainModel = {
  title?: string
  status?: TaskStatuses
  description?: string
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export type TaskDomain = Task & {
  entityStatus: RequestStatus
}
export type TasksState = ReturnType<typeof tasksSlice.getInitialState>

export const tasksReducer = tasksSlice.reducer
export const tasksActions = tasksSlice.actions
export const tasksThunks = { fetchTasks, addTask, updateTask, removeTask }
