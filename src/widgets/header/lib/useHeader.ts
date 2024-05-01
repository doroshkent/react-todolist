import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from 'features/auth'
import { selectAppStatus } from 'app'
import { useActions } from 'common/hooks'

export const useHeader = () => {
  const { addTodolist, logout } = useActions()
  const status = useSelector(selectAppStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const onAddTodolist = (title: string) => {
    addTodolist({ title })
  }

  const onLogout = () => {
    logout()
  }

  return { onAddTodolist, status, onLogout, isLoggedIn }
}
