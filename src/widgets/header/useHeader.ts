import { useCallback } from 'react'
import { addTodolistTC } from 'features/todolists/todolistsSlice'
import { logout } from 'features/login/authSlice'
import { selectIsLoggedIn } from 'features/login/auth-selectors'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppStatus } from 'app/app-selectors'

export const useHeader = () => {
  const dispatch = useDispatch()
  const status = useSelector(selectAppStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const onTodolistAdded = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [])

  const onLogout = useCallback(() => {
    dispatch(logout())
  }, [])

  return { onTodolistAdded, status, onLogout, isLoggedIn }
}
