import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appActions, selectAppError } from 'app'

export const useErrorSnackbar = () => {
  const error = useSelector(selectAppError)
  const dispatch = useDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(appActions.setAppRequestError({ error: null }))
  }
  return {
    error,
    handleClose,
  }
}
