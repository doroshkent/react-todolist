import { createSlice, isFulfilled } from '@reduxjs/toolkit'
import { RESULT_CODE } from 'common/enums'
import { authAPI } from 'features/auth/api/auth-api'
import { appThunks } from 'app/model/app-slice'
import { clearTodolistsAndTasks } from 'common/actions'
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk'
import { LoginParams } from 'features/auth/api/auth-api.types'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authThunks.logout.fulfilled, (state) => {
        state.isLoggedIn = false
      })
      .addMatcher(isFulfilled(authThunks.login, appThunks.initializeApp), (state) => {
        state.isLoggedIn = true
      })
  },
  selectors: {
    selectIsLoggedIn: (auth) => auth.isLoggedIn,
  },
})

// thunks
const login = createAppAsyncThunk<undefined, LoginParams>(
  `${authSlice.name}/login`,
  async (arg, { rejectWithValue }) => {
    const res = await authAPI.login(arg)
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return undefined
    } else {
      return rejectWithValue(res.data)
    }
  }
)

const logout = createAppAsyncThunk<undefined>(`${authSlice.name}/logout`, async (_, { dispatch }) => {
  await authAPI.logout()
  dispatch(clearTodolistsAndTasks())
  return undefined
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
export const authThunks = { login, logout }
export const { selectIsLoggedIn } = authSlice.selectors
