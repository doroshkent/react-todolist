export type ServerError = {
  statusCode: number
  messages: [
    {
      message: string
      field: string
    },
    string
  ]
  error: string
}
