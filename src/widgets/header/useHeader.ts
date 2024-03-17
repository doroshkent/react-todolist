import { useCallback } from 'react'
import { addTodolistTC } from 'features/todolists/todolists-reducer'
import { useAppDispatch } from 'app/store'
import { logout } from 'features/login/auth-reducer'
import { selectIsLoggedIn } from 'features/login/auth-selectors'
import { useSelector } from 'react-redux'
import { selectAppStatus } from 'app/app-selectors'

export const useHeader = () => {
  const dispatch = useAppDispatch()
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
