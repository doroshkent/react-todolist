import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from 'common/hooks'
import { selectAppIsInitialized } from 'app/model/app-slice'

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
