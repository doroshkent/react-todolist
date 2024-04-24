import { ServerResponse } from 'common/types'
import { instance } from 'common/api'

export const authAPI = {
  me() {
    return instance.get<ServerResponse<User>>('auth/me')
  },
  login(params: LoginParams) {
    return instance.post<ServerResponse<{ userId: number }>>('auth/login', params)
  },
  logout() {
    return instance.delete<ServerResponse>('auth/login')
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
