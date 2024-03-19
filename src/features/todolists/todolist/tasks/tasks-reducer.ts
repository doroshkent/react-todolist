import {
  RESULT_CODE,
  ServerError,
  TaskPriorities,
  TaskStatuses,
  Task,
  todolistsApi,
  UpdateTaskModel,
} from 'features/todolists/todolists-api'
import { AppRootState, AppThunk } from 'app/store'
import { appActions, RequestStatus } from 'app/appSlice'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { AxiosError } from 'axios'
import { todolistsActions } from 'features/todolists/todolistsSlice'

const initialState: TasksState = {}

export function tasksReducer(state: TasksState = initialState, action: TasksActions): TasksState {
  switch (action.type) {
    // case 'todolists/SET-TODOLISTS':
    //   return action.todolists.reduce(
    //     (acc, tl) => {
    //       acc[tl.id] = []
    //       return acc
    //     },
    //     { ...state }
    //   )
    case 'tasks/SET-TASKS':
      return { ...state, [action.todolistId]: action.tasks.map((t) => ({ ...t, entityStatus: 'idle' })) }
    case 'tasks/REMOVE-TASK':
      return { ...state, [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.taskId) }
    case 'tasks/ADD-TASK':
      return { ...state, [action.todolistId]: [{ ...action.task, entityStatus: 'idle' }, ...state[action.todolistId]] }
    case 'tasks/UPDATE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.task.id ? { ...action.task, entityStatus: 'idle' } : t
        ),
      }
    case 'tasks/SET-TASK-ENTITY-STATUS':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, entityStatus: action.entityStatus } : t
        ),
      }
    // case 'todolists/ADD-TODOLIST':
    //   return { ...state, [action.todolist.id]: [] }
    // case 'todolists/REMOVE-TODOLIST':
    //   const stateCopy = { ...state }
    //   delete stateCopy[action.id]
    //   return stateCopy
    // case 'todolists/CLEAR-TODOLISTS-DATA':
    //   return {}
    default:
      return state
  }
}

// actions
export const removeTaskAC = (todolistId: string, taskId: string) =>
  ({ type: 'tasks/REMOVE-TASK', todolistId, taskId } as const)
export const addTaskAC = (todolistId: string, task: Task) => ({ type: 'tasks/ADD-TASK', todolistId, task } as const)
export const setTasksAC = (todolistId: string, tasks: Task[]) =>
  ({ type: 'tasks/SET-TASKS', todolistId, tasks } as const)
export const updateTaskAC = (todolistId: string, task: Task) =>
  ({ type: 'tasks/UPDATE-TASK', todolistId, task } as const)
export const setTaskEntityStatusAC = (todolistId: string, taskId: string, entityStatus: RequestStatus) =>
  ({ type: 'tasks/SET-TASK-ENTITY-STATUS', todolistId, taskId, entityStatus } as const)

// thunks
export const getTasksTC =
  (todolistId: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
      const res = await todolistsApi.getTasks(todolistId)
      dispatch(setTasksAC(todolistId, res.data.items))
      dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
    } catch (e) {
      handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
    }
  }
export const removeTaskTC =
  (todolistId: string, taskId: string): AppThunk =>
  async (dispatch) => {
    dispatch(setTaskEntityStatusAC(todolistId, taskId, 'loading'))
    try {
      const res = await todolistsApi.deleteTask(todolistId, taskId)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(removeTaskAC(todolistId, taskId))
        dispatch(setTaskEntityStatusAC(todolistId, taskId, 'succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(setTaskEntityStatusAC(todolistId, taskId, 'failed'))
      }
    } catch (e) {
      handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
      dispatch(setTaskEntityStatusAC(todolistId, taskId, 'failed'))
    }
  }
export const addTaskTC =
  (todolistId: string, title: string): AppThunk =>
  async (dispatch) => {
    dispatch(todolistsActions.setTodolistEntityStatus({ id: todolistId, status: 'loading' }))
    try {
      const res = await todolistsApi.createTask(todolistId, title)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(addTaskAC(todolistId, res.data.data.item))
        dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
        dispatch(todolistsActions.setTodolistEntityStatus({ id: todolistId, status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(todolistsActions.setTodolistEntityStatus({ id: todolistId, status: 'failed' }))
      }
    } catch (e) {
      handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
      dispatch(todolistsActions.setTodolistEntityStatus({ id: todolistId, status: 'failed' }))
    }
  }
export const updateTaskTC =
  (todolistId: string, taskId: string, payload: UpdateTaskDomainModel): AppThunk =>
  async (dispatch, getState: () => AppRootState) => {
    dispatch(setTaskEntityStatusAC(todolistId, taskId, 'loading'))
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
        dispatch(updateTaskAC(todolistId, res.data.data.item))
        dispatch(setTaskEntityStatusAC(todolistId, taskId, 'succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(setTaskEntityStatusAC(todolistId, taskId, 'failed'))
      }
    } catch (e) {
      handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
      dispatch(setTaskEntityStatusAC(todolistId, taskId, 'failed'))
    }
  }

// types
export type TasksState = {
  [key: string]: TaskDomain[]
}
export type TasksActions =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof setTaskEntityStatusAC>
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
