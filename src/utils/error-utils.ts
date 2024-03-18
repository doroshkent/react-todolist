import { Dispatch } from 'redux'
import { Response } from 'features/todolists/todolists-api'
import { appActions } from 'app/appSlice'

// generic function
export const handleServerAppError = <T>(data: Response<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setAppRequestError({ error: data.messages[0] }))
  } else {
    dispatch(appActions.setAppRequestError({ error: 'Some error occurred' }))
  }
  dispatch(appActions.setAppRequestStatus({ status: 'failed' }))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(appActions.setAppRequestError({ error: error.message }))
  dispatch(appActions.setAppRequestStatus({ status: 'failed' }))
}
