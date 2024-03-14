import { useAppDispatch } from 'app/store'
import { useEffect } from 'react'
import { me } from 'state/auth-reducer'
import { useSelector } from 'react-redux'
import { selectAppIsInitialized } from 'app/app-selectors'

export const useApp = () => {
  const dispatch = useAppDispatch()
  const isInitialized = useSelector(selectAppIsInitialized)

  useEffect(() => {
    dispatch(me())
  }, [])

  return {
    isInitialized,
  }
}
