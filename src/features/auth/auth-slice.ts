import { createSlice } from '@reduxjs/toolkit'
import { handleServerAppError, thunkTryCatch } from 'common/utils'
import { RESULT_CODE } from 'common/enums'
import { authAPI, LoginParams } from './auth-api'
import { appThunks } from 'app/app-slice'
import { clearTodolistsAndTasks } from 'common/actions'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'

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
const login = createAppAsyncThunk<undefined, LoginParams>(`${authSlice.name}/login`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.login(arg)
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return undefined
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  })
})

const logout = createAppAsyncThunk<undefined>(`${authSlice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch } = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    await authAPI.logout()
    dispatch(clearTodolistsAndTasks())
    return undefined
  })
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
export const authThunks = { login, logout }
