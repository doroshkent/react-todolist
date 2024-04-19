import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RequestStatus } from 'common/types'
import { createAppAsyncThunk, handleServerNetworkError } from 'common/utils'
import { authAPI } from 'features/auth'
import { RESULT_CODE } from 'common/enums'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatus,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppRequestStatus: (state, action: PayloadAction<{ status: RequestStatus }>) => {
      state.status = action.payload.status
    },
    setAppRequestError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.fulfilled, (state) => {
        state.isInitialized = true
      })
      .addCase(initializeApp.rejected, (state) => {
        state.isInitialized = true
      })
  },
})

const initializeApp = createAppAsyncThunk(
  `${appSlice.name}/initializeApp`,
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
    try {
      const res = await authAPI.me()
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
        return
      } else {
        dispatch(appActions.setAppRequestStatus({ status: 'failed' }))
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  }
)

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions
export const appThunks = { initializeApp }
