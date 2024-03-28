import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../login'
import { todolistsThunks } from './todolistsSlice'
import { selectTodolists } from './todolists-selectors'

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
