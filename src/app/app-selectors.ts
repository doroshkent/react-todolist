import { AppRootState } from 'common/types'

export const selectAppIsInitialized = (state: AppRootState) => state.app.isInitialized
export const selectAppError = (state: AppRootState) => state.app.error
export const selectAppStatus = (state: AppRootState) => state.app.status
