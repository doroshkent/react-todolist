import { Dispatch } from '@reduxjs/toolkit'
import { appActions } from 'app'
import { ServerResponse } from '../types'

export const handleServerAppError = <T>(data: ServerResponse<T>, dispatch: Dispatch, showError: boolean = true) => {
  if (showError) {
    dispatch(appActions.setAppRequestError({ error: data.messages.length ? data.messages[0] : 'Some error occurred' }))
  }
}
