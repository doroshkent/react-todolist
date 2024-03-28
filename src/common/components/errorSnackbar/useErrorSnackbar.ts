import * as React from 'react'
import { appActions } from 'app/app-slice'
import { selectAppError } from 'app/app-selectors'
import { useDispatch, useSelector } from 'react-redux'

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
