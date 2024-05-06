import { createAction } from '@reduxjs/toolkit'
import type { AsyncThunk } from '@reduxjs/toolkit'

export const createFulfilledAction = <Returned, ThArg>(
  asyncThunk: AsyncThunk<Returned, ThArg, { rejectValue: any }>
) => {
  return createAction<Returned>(asyncThunk.fulfilled.type)
}
