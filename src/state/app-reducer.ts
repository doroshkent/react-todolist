export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'app/SET-STATUS':
      return { ...state, status: action.status }
    case 'app/SET-ERROR':
      return { ...state, error: action.error }
    case 'app/SET-IS-INITIALIZED':
      return { ...state, isInitialized: action.isInitialized }
    default:
      return state
  }
}

export const setAppRequestStatusAC = (status: RequestStatusType) => ({ type: 'app/SET-STATUS', status } as const)
export const setAppRequestErrorAC = (error: string | null) => ({ type: 'app/SET-ERROR', error } as const)
export const setIsInitialized = (isInitialized: boolean) => ({ type: 'app/SET-IS-INITIALIZED', isInitialized } as const)

// types
export type SetAppError = ReturnType<typeof setAppRequestErrorAC>
export type SetAppStatus = ReturnType<typeof setAppRequestStatusAC>
export type AppActionsType = SetAppStatus | SetAppError | ReturnType<typeof setIsInitialized>
type InitialStateType = typeof initialState
