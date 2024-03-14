import { useAppDispatch, useAppSelector } from 'app/store'
import * as React from 'react'
import { setAppRequestError } from 'app/app-reducer'

export const useErrorSnackbar = () => {
  const error = useAppSelector<string | null>((state) => state.app.error)
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
