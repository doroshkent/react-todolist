import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { appActions } from 'app'
import { tasksThunks } from '../tasks'
import { handleServerAppError, handleServerNetworkError } from 'common/utils'
import { RESULT_CODE } from 'common/enums'
import { AppThunk, RequestStatus, ServerError } from 'common/types'
import { TodolistApi, todolistsApi } from './todolists-api'

const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistDomain[],
  reducers: {
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistApi[] }>) => {
      action.payload.todolists.forEach((tl) => {
        state.push({ ...tl, filter: 'all', entityStatus: 'idle' })
      })
    },
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state.splice(index, 1)
    },
    renameTodolist: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index) state[index].title = action.payload.title
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistApi }>) => {
      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
    },
    changeFilter: (state, action: PayloadAction<{ id: string; filter: FilterValues }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    setTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatus }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus
    },
    clearTodolistsData: (state) => {
      state.length = 0
    },
  },
})

// thunks
export const getTodolists = (): AppThunk => async (dispatch) => {
  dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
  try {
    const res = await todolistsApi.getTodolists()
    const todolists = res.data
    dispatch(todolistsActions.setTodolists({ todolists }))
    dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
    todolists.forEach((tl) => dispatch(tasksThunks.fetchTasks(tl.id)))
  } catch (e) {
    handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
  }
}
export const addTodolistTC =
  (title: string): AppThunk =>
  async (dispatch) => {
    dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
    try {
      const res = await todolistsApi.createTodolist(title)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }))
        dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (e) {
      handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
    }
  }
export const removeTodolistTC =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'loading' }))
    try {
      const res = await todolistsApi.deleteTodolist(id)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(todolistsActions.removeTodolist({ id }))
        dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'failed' }))
      }
    } catch (e) {
      handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
      dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'failed' }))
    }
  }
export const renameTodolistTC =
  (id: string, newTitle: string): AppThunk =>
  async (dispatch) => {
    dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'loading' }))
    try {
      const res = await todolistsApi.updateTodolistTitle(id, newTitle)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(todolistsActions.renameTodolist({ id, title: newTitle }))
        dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'failed' }))
      }
    } catch (e) {
      handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
      dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'failed' }))
    }
  }

export const todolistsReducer = todolistsSlice.reducer
export const todolistsActions = todolistsSlice.actions
export const todolistsThunks = { getTodolists, removeTodolistTC, renameTodolistTC, addTodolistTC }

//types
export type FilterValues = 'all' | 'active' | 'completed'
export type TodolistDomain = TodolistApi & {
  filter: FilterValues
  entityStatus: RequestStatus
}
