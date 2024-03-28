import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppRootState } from 'common/types'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootState
  rejectValue: null
}>()
