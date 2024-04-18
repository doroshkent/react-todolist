import { createSlice } from '@reduxjs/toolkit'
import { appActions } from 'app'
import { todolistsActions } from '../todolists'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils'
import { RESULT_CODE } from 'common/enums'
import { authAPI, LoginParams } from './auth-api'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authThunks.initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(authThunks.login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(authThunks.logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
})

// thunks
const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParams>(
  `${authSlice.name}/login`,
  async (arg, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
    try {
      const res = await authAPI.login(arg)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
        return { isLoggedIn: true }
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

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }>(
  `${authSlice.name}/logout`,
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
    try {
      await authAPI.logout()
      dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
      dispatch(todolistsActions.clearTodolistsData())
      return { isLoggedIn: false }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  }
)

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }>(
  'auth/initializeApp',
  async (_, { dispatch, rejectWithValue }) => {
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
  }
)

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
export const authThunks = { initializeApp, login, logout }
