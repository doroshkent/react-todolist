import { Dispatch } from 'redux'
import { SetAppError, setAppRequestError, setAppRequestStatus, SetAppStatus } from 'app/app-reducer'
import { ResponseType } from 'api/todolists-api'

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatch) => {
  if (data.messages.length) {
    dispatch(setAppRequestError(data.messages[0]))
  } else {
    dispatch(setAppRequestError('Some error occurred'))
  }
  dispatch(setAppRequestStatus('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatch) => {
  dispatch(setAppRequestError(error.message))
  dispatch(setAppRequestStatus('failed'))
}

// types
type ErrorUtilsDispatch = Dispatch<SetAppError | SetAppStatus>
