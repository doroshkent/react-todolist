import { AppThunkType } from 'state/store'
import { authAPI, LoginParams } from 'api/auth-api'
import { setAppRequestStatusAC, setIsInitialized } from 'state/app-reducer'
import { RESULT_CODE, ServerError } from 'api/todolists-api'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { AxiosError } from 'axios'

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
  (data: LoginParams): AppThunkType =>
  async (dispatch) => {
    dispatch(setAppRequestStatusAC('loading'))
    try {
      const res = await authAPI.login(data)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(setIsLoggedIn(true))
        dispatch(setAppRequestStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(setAppRequestStatusAC('failed'))
      }
    } catch (e) {
      handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
      dispatch(setAppRequestStatusAC('failed'))
    }
  }

export const me = (): AppThunkType => async (dispatch) => {
  dispatch(setAppRequestStatusAC('loading'))
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      dispatch(setIsLoggedIn(true))
      dispatch(setAppRequestStatusAC('succeeded'))
    } else {
      dispatch(setAppRequestStatusAC('failed'))
    }
  } catch (e) {
    handleServerNetworkError(e as AxiosError<ServerError> | Error, dispatch)
    dispatch(setAppRequestStatusAC('failed'))
  } finally {
    dispatch(setIsInitialized(true))
  }
}

// types
type AuthState = typeof initialState
export type AuthActions = ReturnType<typeof setIsLoggedIn>
