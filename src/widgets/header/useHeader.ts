import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { todolistsThunks } from 'features/todolists'
import { authThunks, selectIsLoggedIn } from 'features/auth'
import { selectAppStatus } from 'app'

export const useHeader = () => {
  const dispatch = useDispatch()
  const status = useSelector(selectAppStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const onTodolistAdded = useCallback((title: string) => {
    dispatch(todolistsThunks.addTodolist({ title }))
  }, [])

  const onLogout = useCallback(() => {
    dispatch(authThunks.logout())
  }, [])

  return { onTodolistAdded, status, onLogout, isLoggedIn }
}
