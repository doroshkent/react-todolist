import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppIsInitialized } from 'app/app-selectors'
import { initializeApp } from 'app/app-slice'

export const useApp = () => {
  const dispatch = useDispatch()
  const isInitialized = useSelector(selectAppIsInitialized)

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  return {
    isInitialized,
  }
}
