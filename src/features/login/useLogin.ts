import { SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from 'app/store'
import { login } from 'features/login/auth-reducer'
import { selectIsLoggedIn } from 'features/login/auth-selectors'
import { useSelector } from 'react-redux'
import { Inputs } from 'features/login/Login'

export const useLogin = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(login(data))
  }

  return { isLoggedIn, onSubmit }
}
