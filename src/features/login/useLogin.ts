import { SubmitHandler } from 'react-hook-form'
import { login } from 'features/login/authSlice'
import { selectIsLoggedIn } from 'features/login/auth-selectors'
import { useDispatch, useSelector } from 'react-redux'
import { Inputs } from 'features/login/Login'

export const useLogin = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(login(data))
  }

  return { isLoggedIn, onSubmit }
}
