import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'
import { RequestStatus } from 'common/types'
import { authAPI } from 'features/auth'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'
import { RESULT_CODE } from 'common/enums'
import { todolistsThunks } from 'features/todolists'
import { tasksThunks } from 'features/tasks'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatus,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.fulfilled, (state) => {
        state.isInitialized = true
      })
      .addCase(initializeApp.rejected, (state) => {
        state.isInitialized = true
      })
      .addMatcher(isPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addMatcher(isRejected, (state, action: any) => {
        state.status = 'failed'
        if (action.payload && action.payload.messages && action.payload.messages.length > 0) {
          if (
            action.type === todolistsThunks.addTodolist.rejected.type ||
            todolistsThunks.renameTodolist.rejected.type ||
            tasksThunks.updateTask.rejected.type ||
            tasksThunks.addTask.rejected.type ||
            initializeApp.rejected.type
          ) {
            return
          }

          state.error = action.payload.messages[0]
        } else {
          state.error = action.error.message
        }
      })
  },
  selectors: {
    selectAppIsInitialized: (sliceState) => sliceState.isInitialized,
    selectAppError: (sliceState) => sliceState.error,
    selectAppStatus: (sliceState) => sliceState.status,
  },
})

const initializeApp = createAppAsyncThunk<undefined, undefined>(
  `${appSlice.name}/initializeApp`,
  async (_, { rejectWithValue }) => {
    const res = await authAPI.me()
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return undefined
    } else {
      return rejectWithValue(res.data)
    }
  }
)

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions
export const appThunks = { initializeApp }
export const { selectAppIsInitialized, selectAppStatus, selectAppError } = appSlice.selectors
