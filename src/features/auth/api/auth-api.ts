import { ServerResponse } from 'common/types'
import { instance } from 'common/api'
import { LoginParams, User } from 'features/auth/api/auth-api.types'

export const authAPI = {
  me() {
    return instance.get<ServerResponse<User>>('auth/me')
  },
  login(params: LoginParams) {
    return instance.post<ServerResponse<{ userId: number; token: string }>>('auth/login', params)
  },
  logout() {
    return instance.delete<ServerResponse>('auth/login')
  },
}
