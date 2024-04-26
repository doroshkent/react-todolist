import * as React from 'react'
import { useSelector } from 'react-redux'
import { selectAppError } from 'app'
import { useActions } from 'common/hooks'

export const useErrorSnackbar = () => {
  const error = useSelector(selectAppError)
  const { setAppRequestError } = useActions()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setAppRequestError({ error: null })
  }
  return {
    error,
    handleClose,
  }
}
