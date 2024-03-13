import { RESULT_CODE, ServerError, todolistsApi, TodolistType } from 'api/todolists-api'
import { ActionsType, AppThunkType } from 'state/store'
import { RequestStatusType, setAppRequestStatusAC } from 'state/app-reducer'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { AxiosError } from 'axios'
import { getTasksTC } from 'state/tasks-reducer'

const initialState: TodoListStateType = []

export function todolistsReducer(state = initialState, action: ActionsType): TodoListStateType {
  switch (action.type) {
    case 'SET-TODOLISTS':
      return action.todolists.map((tl) => {
        return { ...tl, filter: 'all', entityStatus: 'idle' }
      })
    case 'REMOVE-TODOLIST':
      return state.filter((tl) => tl.id !== action.id)
    case 'RENAME-TODOLIST':
      return state.map((tl) => (tl.id === action.id ? { ...tl, title: action.title } : tl))
    case 'ADD-TODOLIST':
      const newTodolist: TodolistDomainType = {
        ...action.todolist,
        filter: 'all',
        entityStatus: 'idle',
      }
      return [newTodolist, ...state]
    case 'CHANGE-FILTER':
      return state.map((tl) => (tl.id === action.id ? { ...tl, filter: action.filter } : tl))
    case 'CHANGE-ENTITY-STATUS':
      return state.map((tl) => (tl.id === action.id ? { ...tl, entityStatus: action.status } : tl))
    case 'CLEAR-TODOLISTS-DATA':
      return []
    default:
      return state
  }
}

// actions
export const removeTodolistAC = (id: string) => ({ type: 'REMOVE-TODOLIST', id } as const)
export const renameTodolistAC = (id: string, title: string) => ({ type: 'RENAME-TODOLIST', id, title } as const)
export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist } as const)
export const changeFilterAC = (id: string, filter: FilterValuesType) => ({ type: 'CHANGE-FILTER', id, filter } as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({ type: 'SET-TODOLISTS', todolists } as const)
export const setTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
  ({ type: 'CHANGE-ENTITY-STATUS', id, status } as const)
export const clearTodolistsDataAC = () => ({ type: 'CLEAR-TODOLISTS-DATA' } as const)

// thunks
export const getTodolists = (): AppThunkType => async (dispatch) => {
  try {
    const res = await todolistsApi.getTodolists()
    const todos = res.data
    dispatch(setTodolistsAC(todos))
    dispatch(setAppRequestStatusAC('succeeded'))
    todos.forEach((tl) => dispatch(getTasksTC(tl.id)))
  } catch (e) {
    handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
    dispatch(setAppRequestStatusAC('failed'))
  }
}
export const addTodolistTC =
  (title: string): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppRequestStatusAC('loading'))
    try {
      const res = await todolistsApi.createTodolist(title)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setAppRequestStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(setAppRequestStatusAC('failed'))
      }
    } catch (e) {
      handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
      dispatch(setAppRequestStatusAC('failed'))
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
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
export type TodoListStateType = TodolistDomainType[]
export type TodolistsActionsType =
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof renameTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof setTodolistEntityStatusAC>
  | ReturnType<typeof clearTodolistsDataAC>
