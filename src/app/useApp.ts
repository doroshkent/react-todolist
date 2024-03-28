import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppIsInitialized } from './app-selectors'
import { authThunks } from 'features/login'

export const useApp = () => {
  const dispatch = useDispatch()
  const isInitialized = useSelector(selectAppIsInitialized)

  useEffect(() => {
    dispatch(authThunks.initializeApp())
  }, [])

  return {
    isInitialized,
  }
}
