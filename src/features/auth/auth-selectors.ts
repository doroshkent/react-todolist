import { AppRootState } from 'common/types'

export const selectIsLoggedIn = (state: AppRootState) => state.auth.isLoggedIn
