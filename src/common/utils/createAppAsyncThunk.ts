import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppRootState, ServerError } from '../types'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootState
  rejectValue: ServerError | null
}>()
