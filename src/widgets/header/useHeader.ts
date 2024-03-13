import { useCallback } from 'react'
import { addTodolistTC } from 'state/todolists-reducer'
import { useAppDispatch, useAppSelector } from 'state/store'
import { RequestStatusType } from 'state/app-reducer'
import { logout } from 'state/auth-reducer'

export const useHeader = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector<RequestStatusType>((state) => state.app.status)
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)

  const onTodolistAdded = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [])

  const onLogout = useCallback(() => {
    dispatch(logout())
  }, [])

  return { onTodolistAdded, status, onLogout, isLoggedIn }
}
