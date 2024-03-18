import { AppThunk } from 'app/store'
import { authAPI, LoginParams } from 'features/login/auth-api'
import { appActions } from 'app/appSlice'
import { RESULT_CODE, ServerError } from 'features/todolists/todolists-api'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { AxiosError } from 'axios'
import { clearTodolistsDataAC } from 'features/todolists/todolists-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

// thunks
export const login =
  (data: LoginParams): AppThunk =>
  async (dispatch) => {
    dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
    try {
      const res = await authAPI.login(data)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
        dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (e) {
      handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
    }
  }

export const me = (): AppThunk => async (dispatch) => {
  dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
      dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
    }
  } catch (e) {
    handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
  } finally {
    dispatch(appActions.setIsInitialized({ isInitialized: true }))
  }
}

export const logout = (): AppThunk => async (dispatch) => {
  dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
  try {
    await authAPI.logout()
    dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
    dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
    dispatch(clearTodolistsDataAC())
  } catch (e) {
    handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
  }
}

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
