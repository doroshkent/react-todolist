import { ThunkAction } from 'redux-thunk'
import { UnknownAction } from '@reduxjs/toolkit'
import { AppRootState } from 'common/types'

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, UnknownAction>
