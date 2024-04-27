import { useSelector } from 'react-redux'
import { SubmitHandler } from 'react-hook-form'
import { Inputs } from './Login'
import { useActions } from 'common/hooks'
import { selectIsLoggedIn } from 'features/auth/auth-slice'

export const useLogin = () => {
  const { login } = useActions()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login(data)
  }

  return { isLoggedIn, onSubmit }
}
