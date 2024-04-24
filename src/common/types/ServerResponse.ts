import { RESULT_CODE } from '../enums'

export type ServerResponse<D = {}> = {
  resultCode: RESULT_CODE
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}
