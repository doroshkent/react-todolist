import { useDispatch, useSelector } from 'react-redux'
import { SubmitHandler } from 'react-hook-form'
import { selectIsLoggedIn, Inputs, authThunks } from 'features/login'

export const useLogin = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(authThunks.login(data))
  }

  return { isLoggedIn, onSubmit }
}
