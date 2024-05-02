import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleServerAppError, thunkTryCatch } from 'common/utils'
import { RESULT_CODE } from 'common/enums'
import {
  ApiTask,
  CreateTaskArg,
  RemoveTaskArg,
  UpdateApiTaskModel,
  UpdateTaskArg,
} from 'features/tasks/api/tasks-api.types'
import { RequestStatus } from 'common/types'
import { clearTodolistsAndTasks } from 'common/actions'
import { todolistsThunks } from 'features/todolists'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'
import { tasksApi } from 'features/tasks/api/tasks-api'
import { maxLengthError } from 'common/constants'

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as Record<string, DomainTask[]>,
  reducers: {
    setTaskEntityStatus: (
      state,
      action: PayloadAction<{ todolistId: string; taskId: string; fetchStatus: RequestStatus }>
    ) => {
      const tasks = state[action.payload.todolistId]
      const task = tasks.find((t) => t.id === action.payload.taskId)
      if (task) {
        task.fetchStatus = action.payload.fetchStatus
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        action.payload.tasks.forEach((t) => {
          state[action.payload.todolistId].push({ ...t, fetchStatus: 'idle' })
        })
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        tasks.unshift({ ...action.payload.task, fetchStatus: 'idle' })
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
  async (todolistId, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksApi.getTasks(todolistId)
      const tasks = res.data.items
      return { tasks, todolistId }
    })
  }
)

const addTask = createAppAsyncThunk<{ task: ApiTask; todolistId: string }, CreateTaskArg>(
  `${tasksSlice.name}/addTask`,
  async (arg, thunkAPI) => {
    const { todolistId } = arg
    const { dispatch, rejectWithValue } = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksApi.createTask(arg)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        const task = res.data.data.item
        return { task, todolistId }
      } else {
        handleServerAppError(res.data, dispatch, false)
        return rejectWithValue(maxLengthError)
      }
    })
  }
)

const updateTask = createAppAsyncThunk<{ task: ApiTask; todolistId: string }, UpdateTaskArg<UpdateDomainTaskModel>>(
  `${tasksSlice.name}/updateTask`,
  async ({ todolistId, taskId, model }, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI

    dispatch(tasksActions.setTaskEntityStatus({ todolistId, taskId, fetchStatus: 'loading' }))

    return thunkTryCatch(thunkAPI, async () => {
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
        return { todolistId, task }
      } else {
        handleServerAppError(res.data, dispatch, false)
        return rejectWithValue(maxLengthError)
      }
    }).finally(() => dispatch(tasksActions.setTaskEntityStatus({ todolistId, taskId, fetchStatus: 'idle' })))
  }
)

const removeTask = createAppAsyncThunk<RemoveTaskArg, RemoveTaskArg>(
  `${tasksSlice.name}/removeTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(tasksActions.setTaskEntityStatus({ ...arg, fetchStatus: 'loading' }))

    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksApi.deleteTask(arg)

      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        return arg
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    }).finally(() => dispatch(tasksActions.setTaskEntityStatus({ ...arg, fetchStatus: 'idle' })))
  }
)

export const tasksReducer = tasksSlice.reducer
export const tasksActions = tasksSlice.actions
export const tasksThunks = { fetchTasks, addTask, updateTask, removeTask }

// types
type UpdateDomainTaskModel = Partial<UpdateApiTaskModel>
export type DomainTask = ApiTask & {
  fetchStatus: RequestStatus
}
export type TasksState = ReturnType<typeof tasksSlice.getInitialState>
