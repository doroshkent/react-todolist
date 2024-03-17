import { useAppDispatch } from 'app/store'
import * as React from 'react'
import { setAppRequestError } from 'app/app-reducer'
import { selectAppError } from 'app/app-selectors'
import { useSelector } from 'react-redux'

export const useErrorSnackbar = () => {
  const error = useSelector(selectAppError)
  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppRequestError(null))
  }
  return {
    error,
    handleClose,
  }
}
