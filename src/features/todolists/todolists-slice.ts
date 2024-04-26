import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk, handleServerAppError, thunkTryCatch } from 'common/utils'
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
  async (_, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsApi.getTodolists()
      const todolists = res.data
      return { todolists }
    })
  }
)
const addTodolist = createAppAsyncThunk<{ todolist: TodolistApi }, { title: string }>(
  `${todolistsSlice.name}/addTodolist`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsApi.createTodolist(arg.title)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        const todolist = res.data.data.item
        return { todolist }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    })
  }
)
const removeTodolist = createAppAsyncThunk<RemoveTodolistArg, RemoveTodolistArg>(
  `${todolistsSlice.name}/removeTodolist`,
  async ({ id }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'loading' }))
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsApi.deleteTodolist({ id })
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        return { id }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    }).finally(() => dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'idle' })))
  }
)
const renameTodolist = createAppAsyncThunk<RenameTodolistArg, RenameTodolistArg>(
  `${todolistsSlice.name}/renameTodolist`,
  async (arg, thunkAPI) => {
    const { id } = arg
    const { dispatch, rejectWithValue } = thunkAPI

    dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'loading' }))

    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsApi.renameTodolist(arg)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        return arg
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    }).finally(() => dispatch(todolistsActions.setTodolistEntityStatus({ id, entityStatus: 'idle' })))
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
