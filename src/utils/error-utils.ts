import { Response } from 'features/todolists/todolists-api'
import { appActions } from 'app/appSlice'
import { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'

// generic function
export const handleServerAppError = <T>(data: Response<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setAppRequestError({ error: data.messages[0] }))
  } else {
    dispatch(appActions.setAppRequestError({ error: 'Some error occurred' }))
  }
  dispatch(appActions.setAppRequestStatus({ status: 'failed' }))
}

export const handleServerNetworkError = (err: unknown, dispatch: Dispatch): void => {
  let errorMessage = 'Some error occurred'

  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`
  } else {
    errorMessage = JSON.stringify(err)
  }

  dispatch(appActions.setAppRequestError({ error: errorMessage }))
  dispatch(appActions.setAppRequestStatus({ status: 'failed' }))
}
