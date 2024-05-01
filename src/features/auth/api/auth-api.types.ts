export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}
export type User = {
  id: number
  email: string
  login: string
}
