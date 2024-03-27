import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppRootState } from 'app/store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootState
  rejectValue: null
}>()
