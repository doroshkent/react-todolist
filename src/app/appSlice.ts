import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { authAPI } from 'features/login/auth-api'
import { RESULT_CODE, ServerError } from 'features/todolists/todolists-api'
import { handleServerNetworkError } from 'utils/error-utils'
import { AxiosError } from 'axios'
import { authActions } from 'features/login/authSlice'

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
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

// thunks
export const initializeApp = (): AppThunk => async (dispatch) => {
  dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
      dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
    } else {
      dispatch(appActions.setAppRequestStatus({ status: 'failed' }))
    }
  } catch (e) {
    handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
  } finally {
    dispatch(appActions.setIsInitialized({ isInitialized: true }))
  }
}

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions

// types
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
