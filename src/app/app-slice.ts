import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RequestStatus } from 'common/types'
import { handleServerAppError, thunkTryCatch } from 'common/utils'
import { authAPI } from 'features/auth'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'
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
  selectors: {
    selectAppIsInitialized: (sliceState) => sliceState.isInitialized,
    selectAppError: (sliceState) => sliceState.error,
    selectAppStatus: (sliceState) => sliceState.status,
  },
})

const initializeApp = createAppAsyncThunk<undefined, undefined>(
  `${appSlice.name}/initializeApp`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.me()
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        return undefined
      } else {
        handleServerAppError(res.data, dispatch, false)
        return rejectWithValue(null)
      }
    })
  }
)

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions
export const appThunks = { initializeApp }
export const { selectAppIsInitialized, selectAppStatus, selectAppError } = appSlice.selectors
