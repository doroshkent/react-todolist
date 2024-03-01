export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'loading' as RequestStatusType,
}

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    default:
      return state
  }
}

export const setRequestStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)

// types
export type AppActionsType = ReturnType<typeof setRequestStatusAC>
type InitialStateType = typeof initialState
