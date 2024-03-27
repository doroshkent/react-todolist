import { AppThunk } from 'app/store'
import { authAPI, LoginParams } from 'features/login/auth-api'
import { appActions } from 'app/appSlice'
import { AxiosError } from 'axios'
import { todolistsActions } from 'features/todolists/todolistsSlice'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleServerAppError, handleServerNetworkError } from 'common/utils'
import { RESULT_CODE } from 'common/enums/enums'
import { ServerError } from 'common/types/ServerError'

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

export const logout = (): AppThunk => async (dispatch) => {
  dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
  try {
    await authAPI.logout()
    dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
    dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
    dispatch(todolistsActions.clearTodolistsData())
  } catch (e) {
    handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
  }
}

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
