import { RESULT_CODE, ServerError, todolistsApi, Todolist } from 'api/todolists-api'
import { AppThunkType } from 'app/store'
import { RequestStatus, setAppRequestStatus } from 'app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { AxiosError } from 'axios'
import { getTasksTC } from 'features/todolists/todolist/tasks/tasks-reducer'

const initialState: TodolistsState = []

export function todolistsReducer(state = initialState, action: TodolistsActions): TodolistsState {
  switch (action.type) {
    case 'todolists/SET-TODOLISTS':
      return action.todolists.map((tl) => {
        return { ...tl, filter: 'all', entityStatus: 'idle' }
      })
    case 'todolists/REMOVE-TODOLIST':
      return state.filter((tl) => tl.id !== action.id)
    case 'todolists/RENAME-TODOLIST':
      return state.map((tl) => (tl.id === action.id ? { ...tl, title: action.title } : tl))
    case 'todolists/ADD-TODOLIST':
      const newTodolist: TodolistDomain = {
        ...action.todolist,
        filter: 'all',
        entityStatus: 'idle',
      }
      return [newTodolist, ...state]
    case 'todolists/CHANGE-FILTER':
      return state.map((tl) => (tl.id === action.id ? { ...tl, filter: action.filter } : tl))
    case 'todolists/CHANGE-ENTITY-STATUS':
      return state.map((tl) => (tl.id === action.id ? { ...tl, entityStatus: action.status } : tl))
    case 'todolists/CLEAR-TODOLISTS-DATA':
      return []
    default:
      return state
  }
}

// actions
export const removeTodolistAC = (id: string) => ({ type: 'todolists/REMOVE-TODOLIST', id } as const)
export const renameTodolistAC = (id: string, title: string) =>
  ({ type: 'todolists/RENAME-TODOLIST', id, title } as const)
export const addTodolistAC = (todolist: Todolist) => ({ type: 'todolists/ADD-TODOLIST', todolist } as const)
export const changeFilterAC = (id: string, filter: FilterValues) =>
  ({ type: 'todolists/CHANGE-FILTER', id, filter } as const)
export const setTodolistsAC = (todolists: Todolist[]) => ({ type: 'todolists/SET-TODOLISTS', todolists } as const)
export const setTodolistEntityStatusAC = (id: string, status: RequestStatus) =>
  ({ type: 'todolists/CHANGE-ENTITY-STATUS', id, status } as const)
export const clearTodolistsDataAC = () => ({ type: 'todolists/CLEAR-TODOLISTS-DATA' } as const)

// thunks
export const getTodolists = (): AppThunkType => async (dispatch) => {
  try {
    const res = await todolistsApi.getTodolists()
    const todos = res.data
    dispatch(setTodolistsAC(todos))
    dispatch(setAppRequestStatus('succeeded'))
    todos.forEach((tl) => dispatch(getTasksTC(tl.id)))
  } catch (e) {
    handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
    dispatch(setAppRequestStatus('failed'))
  }
}
export const addTodolistTC =
  (title: string): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppRequestStatus('loading'))
    try {
      const res = await todolistsApi.createTodolist(title)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setAppRequestStatus('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(setAppRequestStatus('failed'))
      }
    } catch (e) {
      handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
      dispatch(setAppRequestStatus('failed'))
    }
  }
export const removeTodolistTC =
  (todolistId: string): AppThunkType =>
  async (dispatch) => {
    dispatch(setTodolistEntityStatusAC(todolistId, 'loading'))
    try {
      const res = await todolistsApi.deleteTodolist(todolistId)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(removeTodolistAC(todolistId))
        dispatch(setTodolistEntityStatusAC(todolistId, 'succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(setTodolistEntityStatusAC(todolistId, 'failed'))
      }
    } catch (e) {
      handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
      dispatch(setTodolistEntityStatusAC(todolistId, 'failed'))
    }
  }
export const renameTodolistTC =
  (todolistsId: string, newTitle: string): AppThunkType =>
  async (dispatch) => {
    dispatch(setTodolistEntityStatusAC(todolistsId, 'loading'))
    try {
      const res = await todolistsApi.updateTodolistTitle(todolistsId, newTitle)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(renameTodolistAC(todolistsId, newTitle))
        dispatch(setTodolistEntityStatusAC(todolistsId, 'succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(setTodolistEntityStatusAC(todolistsId, 'failed'))
      }
    } catch (e) {
      handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
      dispatch(setTodolistEntityStatusAC(todolistsId, 'failed'))
    }
  }

//types
export type FilterValues = 'all' | 'active' | 'completed'
export type TodolistDomain = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}
export type TodolistsState = TodolistDomain[]
export type TodolistsActions =
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof renameTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof setTodolistEntityStatusAC>
  | ReturnType<typeof clearTodolistsDataAC>
