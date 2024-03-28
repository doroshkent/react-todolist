import { appActions, appReducer, RequestStatus } from 'app/app-slice'

describe('appReducer', () => {
  const initialState = {
    status: 'idle' as RequestStatus,
    error: null as string | null,
    isInitialized: false,
  }

  test('should handle setAppRequestStatus', () => {
    const endState = appReducer(initialState, appActions.setAppRequestStatus({ status: 'loading' }))
    expect(endState.status).toBe('loading')
  })

  test('should handle setAppRequestError', () => {
    const endState = appReducer(initialState, appActions.setAppRequestError({ error: 'An error has occurred' }))
    expect(endState.error).toBe('An error has occurred')
  })

  test('should handle setIsInitialized', () => {
    const endState = appReducer(initialState, appActions.setIsInitialized({ isInitialized: true }))
    expect(endState.isInitialized).toBe(true)
  })
})
