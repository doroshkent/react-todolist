import { useAppDispatch } from 'app/store'
import * as React from 'react'
import { appActions } from 'app/appSlice'
import { selectAppError } from 'app/app-selectors'
import { useSelector } from 'react-redux'

export const useErrorSnackbar = () => {
  const error = useSelector(selectAppError)
  const dispatch = useAppDispatch()

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
