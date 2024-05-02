import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils'
import { RESULT_CODE } from 'common/enums'
import { RequestStatus } from 'common/types'
import { RemoveTodolistArg, RenameTodolistArg, TodolistApi } from 'features/todolists/api/todolists-api.types'
import { clearTodolistsAndTasks } from 'common/actions'
import { todolistsApi } from 'features/todolists/api/todolists-api'

const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistDomain[],
  reducers: {
    changeFilter: (state, action: PayloadAction<{ id: string; filter: Filter }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state.push({ ...tl, filter: 'all', fetchStatus: 'idle' })
        })
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: 'all', fetchStatus: 'idle' })
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(renameTodolist.fulfilled, (state, action) => {
        debugger
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) state[index].title = action.payload.title
      })
      .addCase(clearTodolistsAndTasks, () => {
        return []
      })
      .addMatcher(isPending(renameTodolist, removeTodolist), (state, action) => {
        state.forEach((tl) => {
          if (tl.id === action.meta.arg.id) {
            tl.fetchStatus = 'loading'
          }
        })
      })
      .addMatcher(isFulfilled(renameTodolist, removeTodolist), (state, action) => {
        state.forEach((tl) => {
          if (tl.id === action.meta.arg.id) {
            tl.fetchStatus = 'succeeded'
          }
        })
      })
      .addMatcher(isRejected(removeTodolist, renameTodolist), (state, action) => {
        state.forEach((tl) => {
          if (tl.id === action.meta.arg.id) {
            tl.fetchStatus = 'failed'
          }
        })
      })
  },
  selectors: {
    selectTodolists: (todolists) => todolists,
  },
})

// thunks
export const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistApi[] }>(
  `${todolistsSlice.name}/getTodolists`,
  async () => {
    const res = await todolistsApi.getTodolists()
    const todolists = res.data
    return { todolists }
  }
)
export const addTodolist = createAppAsyncThunk<{ todolist: TodolistApi }, { title: string }>(
  `${todolistsSlice.name}/addTodolist`,
  async (arg, { rejectWithValue }) => {
    const res = await todolistsApi.createTodolist(arg.title)
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      const todolist = res.data.data.item
      return { todolist }
    } else {
      return rejectWithValue(res.data)
    }
  }
)
export const removeTodolist = createAppAsyncThunk<RemoveTodolistArg, RemoveTodolistArg>(
  `${todolistsSlice.name}/removeTodolist`,
  async ({ id }, { rejectWithValue }) => {
    const res = await todolistsApi.deleteTodolist({ id })
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return { id }
    } else {
      return rejectWithValue(res.data)
    }
  }
)
export const renameTodolist = createAppAsyncThunk<RenameTodolistArg, RenameTodolistArg>(
  `${todolistsSlice.name}/renameTodolist`,
  async (arg, { rejectWithValue }) => {
    const res = await todolistsApi.renameTodolist(arg)
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return arg
    } else {
      return rejectWithValue(res.data)
    }
  }
)

export const todolistsReducer = todolistsSlice.reducer
export const todolistsActions = todolistsSlice.actions
export const todolistsThunks = { fetchTodolists, removeTodolist, renameTodolist, addTodolist }
export const { selectTodolists } = todolistsSlice.selectors

//types
export type Filter = 'all' | 'active' | 'completed'
export type TodolistDomain = TodolistApi & {
  filter: Filter
  fetchStatus: RequestStatus
}
