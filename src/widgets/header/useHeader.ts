import { useCallback } from 'react'
import { addTodolistTC } from 'features/todolists/todolists-reducer'
import { useAppDispatch, useAppSelector } from 'app/store'
import { RequestStatus } from 'app/app-reducer'
import { logout } from 'features/login/auth-reducer'

export const useHeader = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector<RequestStatus>((state) => state.app.status)
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)

  const onTodolistAdded = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [])

  const onLogout = useCallback(() => {
    dispatch(logout())
  }, [])

  return { onTodolistAdded, status, onLogout, isLoggedIn }
}
