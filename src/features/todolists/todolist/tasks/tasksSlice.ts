import {
  RESULT_CODE,
  ServerError,
  Task,
  TaskPriorities,
  TaskStatuses,
  todolistsApi,
  UpdateTaskModel,
} from 'features/todolists/todolists-api'
import { AppRootState, AppThunk } from 'app/store'
import { appActions, RequestStatus } from 'app/appSlice'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { AxiosError } from 'axios'
import { todolistsActions } from 'features/todolists/todolistsSlice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as { [key: string]: TaskDomain[] },
  reducers: {
    setTasks: (state, action: PayloadAction<{ todolistId: string; tasks: Task[] }>) => {
      action.payload.tasks.forEach((t) => {
        state[action.payload.todolistId].push({ ...t, entityStatus: 'idle' })
      })
    },
    removeTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    },
    addTask: (state, action: PayloadAction<{ todolistId: string; task: Task }>) => {
      const tasks = state[action.payload.todolistId]
      tasks.unshift({ ...action.payload.task, entityStatus: 'idle' })
    },
    updateTask: (state, action: PayloadAction<{ todolistId: string; task: Task }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.task.id)
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.task }
      }
    },
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

export const tasksReducer = tasksSlice.reducer
export const tasksActions = tasksSlice.actions

// thunks
export const getTasksTC =
  (todolistId: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
      const res = await todolistsApi.getTasks(todolistId)
      dispatch(tasksActions.setTasks({ todolistId, tasks: res.data.items }))
      dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
    }
  }
export const removeTaskTC =
  (todolistId: string, taskId: string): AppThunk =>
  async (dispatch) => {
    dispatch(tasksActions.setTaskEntityStatus({ todolistId, taskId, entityStatus: 'loading' }))
    try {
      const res = await todolistsApi.deleteTask(todolistId, taskId)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(tasksActions.removeTask({ todolistId, taskId }))
        dispatch(tasksActions.setTaskEntityStatus({ todolistId, taskId, entityStatus: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(tasksActions.setTaskEntityStatus({ todolistId, taskId, entityStatus: 'failed' }))
      }
    } catch (e) {
      handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
      dispatch(tasksActions.setTaskEntityStatus({ todolistId, taskId, entityStatus: 'failed' }))
    }
  }
export const addTaskTC =
  (todolistId: string, title: string): AppThunk =>
  async (dispatch) => {
    dispatch(todolistsActions.setTodolistEntityStatus({ id: todolistId, entityStatus: 'loading' }))
    try {
      const res = await todolistsApi.createTask(todolistId, title)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(tasksActions.addTask({ todolistId, task: res.data.data.item }))
        dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
        dispatch(todolistsActions.setTodolistEntityStatus({ id: todolistId, entityStatus: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(todolistsActions.setTodolistEntityStatus({ id: todolistId, entityStatus: 'failed' }))
      }
    } catch (e) {
      handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
      dispatch(todolistsActions.setTodolistEntityStatus({ id: todolistId, entityStatus: 'failed' }))
    }
  }
export const updateTaskTC =
  (todolistId: string, taskId: string, payload: UpdateTaskDomainModel): AppThunk =>
  async (dispatch, getState: () => AppRootState) => {
    dispatch(tasksActions.setTaskEntityStatus({ todolistId, taskId, entityStatus: 'loading' }))
    try {
      const task = getState().tasks[todolistId].find((t) => t.id === taskId)
      if (!task) {
        return
      }
      const model: UpdateTaskModel = {
        title: task.title,
        status: task.status,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...payload,
      }

      const res = await todolistsApi.updateTask(todolistId, taskId, model)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(tasksActions.updateTask({ todolistId, task: res.data.data.item }))
        dispatch(tasksActions.setTaskEntityStatus({ todolistId, taskId, entityStatus: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(tasksActions.setTaskEntityStatus({ todolistId, taskId, entityStatus: 'failed' }))
      }
    } catch (e) {
      handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
      dispatch(tasksActions.setTaskEntityStatus({ todolistId, taskId, entityStatus: 'failed' }))
    }
  }

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
