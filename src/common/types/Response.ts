import { RESULT_CODE } from 'common/enums/enums'

export type Response<D = {}> = {
  resultCode: RESULT_CODE
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}
