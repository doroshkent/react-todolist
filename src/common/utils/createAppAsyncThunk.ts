import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppRootState, ServerResponse } from '../types'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootState
  rejectValue: ServerResponse | null
}>()
