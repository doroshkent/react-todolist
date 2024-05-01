import { useSelector } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useActions } from 'common/hooks'
import { selectIsLoggedIn } from 'features/auth/model/auth-slice'
import { LoginParams } from 'features/auth/api/auth-api.types'

export const useLogin = () => {
  const { login } = useActions()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onBlur',
  })

  const onLogin: SubmitHandler<Inputs> = (data) => {
    login(data)
  }

  return { isLoggedIn, onLogin, control, register, watch, errors, handleSubmit }
}

type Inputs = Omit<LoginParams, 'captcha'>
