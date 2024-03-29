const initialState = {
  status: 'idle' as RequestStatus,
  error: null as string | null,
  isInitialized: false,
}

export const appReducer = (state: AppInitialState = initialState, action: AppActions): AppInitialState => {
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

// actions
export const setAppRequestStatus = (status: RequestStatus) => ({ type: 'app/SET-STATUS', status } as const)
export const setAppRequestError = (error: string | null) => ({ type: 'app/SET-ERROR', error } as const)
export const setIsInitialized = (isInitialized: boolean) => ({ type: 'app/SET-IS-INITIALIZED', isInitialized } as const)

// types
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetAppError = ReturnType<typeof setAppRequestError>
export type SetAppStatus = ReturnType<typeof setAppRequestStatus>
export type AppActions = SetAppStatus | SetAppError | ReturnType<typeof setIsInitialized>
type AppInitialState = typeof initialState
