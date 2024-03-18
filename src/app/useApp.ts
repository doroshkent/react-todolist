import { useAppDispatch } from 'app/store'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAppIsInitialized } from 'app/app-selectors'
import { initializeApp } from 'app/appSlice'

export const useApp = () => {
  const dispatch = useAppDispatch()
  const isInitialized = useSelector(selectAppIsInitialized)

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  return {
    isInitialized,
  }
}
