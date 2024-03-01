export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'loading' as RequestStatusType,
  error: null as string | null
}

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    default:
      return state
  }
}

export const setRequestStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setRequestErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)

// types
export type AppActionsType = ReturnType<typeof setRequestStatusAC>
  | ReturnType<typeof setRequestErrorAC>
type InitialStateType = typeof initialState
