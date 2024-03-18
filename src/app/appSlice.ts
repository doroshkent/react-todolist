import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatus,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppRequestStatus: (state, action: PayloadAction<{ status: RequestStatus }>) => {
      state.status = action.payload.status
    },
    setAppRequestError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions

// types
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
