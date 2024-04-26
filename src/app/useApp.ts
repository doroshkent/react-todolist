import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAppIsInitialized } from './app-selectors'
import { useActions } from 'common/hooks'

export const useApp = () => {
  const { initializeApp } = useActions()
  const isInitialized = useSelector(selectAppIsInitialized)

  useEffect(() => {
    initializeApp()
  }, [])

  return {
    isInitialized,
  }
}
