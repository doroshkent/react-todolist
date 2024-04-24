import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppRootState } from '../types'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootState
  rejectValue: null
}>()
