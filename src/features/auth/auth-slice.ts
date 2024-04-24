import { createSlice } from '@reduxjs/toolkit'
import { appActions } from 'app'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils'
import { RESULT_CODE } from 'common/enums'
import { authAPI, LoginParams } from './auth-api'
import { appThunks } from 'app/app-slice'
import { clearTodolistsAndTasks } from 'common/actions'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authThunks.login.fulfilled, (state) => {
        state.isLoggedIn = true
      })
      .addCase(authThunks.logout.fulfilled, (state) => {
        state.isLoggedIn = false
      })
      .addCase(appThunks.initializeApp.fulfilled, (state) => {
        state.isLoggedIn = true
      })
  },
})

// thunks
const login = createAppAsyncThunk<undefined, LoginParams>(
  `${authSlice.name}/login`,
  async (arg, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
    try {
      const res = await authAPI.login(arg)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
        return
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

const logout = createAppAsyncThunk<undefined>(`${authSlice.name}/logout`, async (_, { dispatch, rejectWithValue }) => {
  dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
  try {
    await authAPI.logout()
    dispatch(appActions.setAppRequestStatus({ status: 'succeeded' }))
    dispatch(clearTodolistsAndTasks())
    return
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
export const authThunks = { login, logout }
