export { authAPI } from 'features/auth/api/auth-api'
export { authThunks, authActions, authReducer, selectIsLoggedIn } from 'features/auth/model/auth-slice'
export { Login } from 'features/auth/ui/Login'
export { useLogin } from 'features/auth/lib/useLogin'

// types
export type { LoginParams } from 'features/auth/api/auth-api.types'
