import axios from 'axios'
import { Dispatch } from '@reduxjs/toolkit'
import { appActions } from 'app'

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
