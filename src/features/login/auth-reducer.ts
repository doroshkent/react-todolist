import { AppThunk } from 'app/store'
import { authAPI, LoginParams } from 'features/login/auth-api'
import { setAppRequestStatus, setIsInitialized } from 'app/app-reducer'
import { RESULT_CODE, ServerError } from 'features/todolists/todolists-api'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { AxiosError } from 'axios'
import { clearTodolistsDataAC } from 'features/todolists/todolists-reducer'

const initialState = {
  isLoggedIn: false,
}

export const authReducer = (state: AuthState = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.isLoggedIn }
    default:
      return state
  }
}

// actions
export const setIsLoggedIn = (isLoggedIn: boolean) => ({ type: 'login/SET-IS-LOGGED-IN', isLoggedIn } as const)

// thunks
export const login =
  (data: LoginParams): AppThunk =>
  async (dispatch) => {
    dispatch(setAppRequestStatus('loading'))
    try {
      const res = await authAPI.login(data)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(setIsLoggedIn(true))
        dispatch(setAppRequestStatus('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(setAppRequestStatus('failed'))
      }
    } catch (e) {
      handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
      dispatch(setAppRequestStatus('failed'))
    }
  }

export const me = (): AppThunk => async (dispatch) => {
  dispatch(setAppRequestStatus('loading'))
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      dispatch(setIsLoggedIn(true))
      dispatch(setAppRequestStatus('succeeded'))
    } else {
      dispatch(setAppRequestStatus('failed'))
    }
  } catch (e) {
    handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
    dispatch(setAppRequestStatus('failed'))
  } finally {
    dispatch(setIsInitialized(true))
  }
}

export const logout = (): AppThunk => async (dispatch) => {
  dispatch(setAppRequestStatus('loading'))
  try {
    await authAPI.logout()
    dispatch(setIsLoggedIn(false))
    dispatch(setAppRequestStatus('succeeded'))
    dispatch(clearTodolistsDataAC())
  } catch (e) {
    handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
    dispatch(setAppRequestStatus('failed'))
  }
}

// types
type AuthState = typeof initialState
export type AuthActions = ReturnType<typeof setIsLoggedIn>
