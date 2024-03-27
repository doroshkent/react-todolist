import { useEffect } from 'react'
import { getTodolists } from 'features/todolists/todolistsSlice'
import { selectTodolists } from 'features/todolists/todolists-selectors'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoggedIn } from 'features/login/auth-selectors'

export const useTodolists = () => {
  const todolists = useSelector(selectTodolists)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(getTodolists())
  }, [])

  return { todolists, isLoggedIn }
}
