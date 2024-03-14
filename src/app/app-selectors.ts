import { AppRootStateType } from 'app/store'

export const selectAppIsInitialized = (state: AppRootStateType) => state.app.isInitialized
