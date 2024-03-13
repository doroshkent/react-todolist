import { instance } from 'api/todolists-api'
import { ResponseType } from 'api/todolists-api'

export const authAPI = {
  login(params: LoginParams) {
    return instance.post<ResponseType<{ userId: number }>>('auth/login', params)
  },
}

// types
export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}
