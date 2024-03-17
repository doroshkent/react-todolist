import { useEffect } from 'react'
import { useAppDispatch } from 'app/store'
import { getTodolists } from 'features/todolists/todolists-reducer'
import { selectTodolists } from 'features/todolists/todolists-selectors'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from 'features/login/auth-selectors'

export const useTodolists = () => {
  const todolists = useSelector(selectTodolists)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(getTodolists())
  }, [])

  return { todolists, isLoggedIn }
}
