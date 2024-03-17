import { appReducer, RequestStatus, setAppRequestError, setAppRequestStatus, setIsInitialized } from 'app/app-reducer'

describe('appReducer', () => {
  const initialState = {
    status: 'idle' as RequestStatus,
    error: null as string | null,
    isInitialized: false,
  }

  test('should handle setAppRequestStatus', () => {
    const endState = appReducer(initialState, setAppRequestStatus('loading'))
    expect(endState.status).toBe('loading')
  })

  test('should handle setAppRequestError', () => {
    const endState = appReducer(initialState, setAppRequestError('An error has occurred'))
    expect(endState.error).toBe('An error has occurred')
  })

  test('should handle setIsInitialized', () => {
    const endState = appReducer(initialState, setIsInitialized(true))
    expect(endState.isInitialized).toBe(true)
  })
})
