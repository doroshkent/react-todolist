import { AppRootStateType } from 'app/store'

export const selectAppIsInitialized = (state: AppRootStateType) => state.app.isInitialized
export const selectAppError = (state: AppRootStateType) => state.app.error
