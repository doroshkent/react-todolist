import { instance } from 'api/todolists-api'
import { ResponseType } from 'api/todolists-api'

export const authAPI = {
  me() {
    return instance.get<ResponseType<User>>('auth/me')
  },
  login(params: LoginParams) {
    return instance.post<ResponseType<{ userId: number }>>('auth/login', params)
  },
  logout() {
    return instance.delete<ResponseType>('auth/login')
  },
}

// types
export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}
type User = {
  id: number
  email: string
  login: string
}
