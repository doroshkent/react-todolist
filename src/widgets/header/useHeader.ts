import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from 'features/auth'
import { selectAppStatus } from 'app'
import { useActions } from 'common/hooks'

export const useHeader = () => {
  const { addTodolist, logout } = useActions()
  const status = useSelector(selectAppStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const onTodolistAdded = useCallback((title: string) => {
    addTodolist({ title })
  }, [])

  const onLogout = useCallback(() => {
    logout()
  }, [])

  return { onTodolistAdded, status, onLogout, isLoggedIn }
}
