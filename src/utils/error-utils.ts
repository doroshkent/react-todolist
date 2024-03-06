import { Dispatch } from 'redux'
import { SetAppError, setAppRequestErrorAC, setAppRequestStatusAC, SetAppStatus } from "state/app-reducer";
import { ResponseType } from "api/todolists-api";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>,
                                          dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch( setAppRequestErrorAC( data.messages[0] ) )
  } else {
    dispatch( setAppRequestErrorAC( 'Some error occurred' ) )
  }
  dispatch( setAppRequestStatusAC( 'failed' ) )
}

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: ErrorUtilsDispatchType
) => {
  dispatch( setAppRequestErrorAC( error.message ) )
  dispatch( setAppRequestStatusAC( 'failed' ) )
}

// types
type ErrorUtilsDispatchType = Dispatch<SetAppError | SetAppStatus>
