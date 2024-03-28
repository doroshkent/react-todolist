import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { appActions } from 'app'
import { authAPI, LoginParams } from 'features/login'
import { todolistsActions } from 'features/todolists'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils'
import { RESULT_CODE } from 'common/enums'
import { AppThunk, ServerError } from 'common/types'

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
  extraReducers: (builder) => {
    builder.addCase(authThunks.initializeApp.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    })
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

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }>('auth/initializeApp', async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
      return { isLoggedIn: true }
    } else {
      dispatch(appActions.setAppRequestStatus({ status: 'failed' }))
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(appActions.setIsInitialized({ isInitialized: true }))
  }
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
export const authThunks = { initializeApp, login, logout }
