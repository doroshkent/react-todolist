import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { todolistsThunks, selectTodolists } from 'features/todolists'
import { selectIsLoggedIn } from 'features/login'

export const useTodolists = () => {
  const todolists = useSelector(selectTodolists)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(todolistsThunks.getTodolists())
  }, [])

  return { todolists, isLoggedIn }
}
