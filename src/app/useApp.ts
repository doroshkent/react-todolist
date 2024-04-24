import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppIsInitialized } from './app-selectors'
import { appThunks } from 'app/app-slice'

export const useApp = () => {
  const dispatch = useDispatch()
  const isInitialized = useSelector(selectAppIsInitialized)

  useEffect(() => {
    dispatch(appThunks.initializeApp())
  }, [])

  return {
    isInitialized,
  }
}
