import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectTodolists } from './todolists-selectors'
import { useActions } from 'common/hooks'
import { selectIsLoggedIn } from 'features/auth'

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
