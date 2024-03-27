import { Dispatch } from '@reduxjs/toolkit'
import { appActions } from 'app/appSlice'
import { Response } from 'common/types/Response'

export const handleServerAppError = <T>(data: Response<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setAppRequestError({ error: data.messages[0] }))
  } else {
    dispatch(appActions.setAppRequestError({ error: 'Some error occurred' }))
  }
  dispatch(appActions.setAppRequestStatus({ status: 'failed' }))
}
