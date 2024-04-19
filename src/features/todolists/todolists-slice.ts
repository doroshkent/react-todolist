import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { appActions } from 'app'
import { tasksThunks } from '../tasks'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils'
import { RESULT_CODE } from 'common/enums'
import { RequestStatus } from 'common/types'
import { RemoveTodolistArg, RenameTodolistArg, TodolistApi, todolistsApi } from './todolists-api'
import { clearTodolistsAndTasks } from 'common/actions'

const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistDomain[],
  reducers: {
    changeFilter: (state, action: PayloadAction<{ id: string; filter: FilterValues }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    setTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatus }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state.push({ ...tl, filter: 'all', entityStatus: 'idle' })
        })
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(renameTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index) state[index].title = action.payload.title
      })
      .addCase(clearTodolistsAndTasks, () => {
        return []
      })
  },
})

// thunks
const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistApi[] }>(
  `${todolistsSlice.name}/getTodolists`,
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
    try {
      const res = await todolistsApi.getTodolists()
      const todolists = res.data
      dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
      todolists.forEach((tl) => dispatch(tasksThunks.fetchTasks(tl.id)))
      return { todolists }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  }
)
const addTodolist = createAppAsyncThunk<{ todolist: TodolistApi }, { title: string }>(
  `${todolistsSlice.name}/addTodolist`,
  async (arg, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
    try {
      const res = await todolistsApi.createTodolist(arg.title)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        const todolist = res.data.data.item
        dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
        return { todolist }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  }
)
const removeTodolist = createAppAsyncThunk<RemoveTodolistArg, RemoveTodolistArg>(
  `${todolistsSlice.name}/removeTodolist`,
  async ({ id }, { dispatch, rejectWithValue }) => {
    dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'loading' }))
    dispatch(appActions.setAppRequestStatus({ status: 'loading' }))

    try {
      const res = await todolistsApi.deleteTodolist({ id })
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'succeeded' }))
        dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))

        return { id }
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'failed' }))
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'failed' }))
      return rejectWithValue(null)
    }
  }
)
const renameTodolist = createAppAsyncThunk<RenameTodolistArg, RenameTodolistArg>(
  `${todolistsSlice.name}/renameTodolist`,
  async (arg, { dispatch, rejectWithValue }) => {
    const { id } = arg

    dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'loading' }))

    try {
      const res = await todolistsApi.renameTodolist(arg)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'succeeded' }))
        return arg
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'failed' }))
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'failed' }))
      return rejectWithValue(null)
    }
  }
)

export const todolistsReducer = todolistsSlice.reducer
export const todolistsActions = todolistsSlice.actions
export const todolistsThunks = { fetchTodolists, removeTodolist, renameTodolist, addTodolist }

//types
export type FilterValues = 'all' | 'active' | 'completed'
export type TodolistDomain = TodolistApi & {
  filter: FilterValues
  entityStatus: RequestStatus
}
