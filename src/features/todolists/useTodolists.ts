import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../auth'
import { selectTodolists } from './todolists-selectors'
import { useActions } from 'common/hooks'

export const useTodolists = () => {
  const todolists = useSelector(selectTodolists)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { fetchTodolists } = useActions()

  useEffect(() => {
    if (!isLoggedIn) return
    fetchTodolists()
  }, [])

  return { todolists, isLoggedIn }
}
