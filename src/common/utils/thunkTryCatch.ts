import { AsyncThunkConfig, GetThunkAPI, OverrideThunkApiConfigs } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { AppRootState, ServerError } from 'common/types'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { appActions } from 'app'

/**
 * A utility function to handle try-catch for asynchronous Redux Thunks.
 *
 * @template T The type of the resolved value of the Promise.
 *
 * @param {GetThunkAPI<OverrideThunkApiConfigs<AsyncThunkConfig,{
 * state: AppRootState,
 * rejectValue: ServerError | null
 * }>>} thunkAPI - The API object provided to Redux by redux-toolkit, including methods like `dispatch` and `getState`,
 * and current `state` and `rejectValue` properties.
 *
 * @param {() => Promise<T>} logic - The function containing the main logical part of the Thunk that needs to be executed
 * and which returns a `Promise<T>`.
 *
 * @returns {Promise<ReturnType<typeof thunkAPI.rejectWithValue> | T>} - Returns a Promise that either resolves to the
 * return value of the `logic` function or rejects with the value obtained from invoking `rejectWithValue(null)`.
 *
 * Note: This function will also handle dispatching actions to change the app's request status to `loading` when the logic
 * is being executed, and back to `idle` after the `logic` has finished executing. If an error occurs while executing `logic`,
 * it will dispatch an action to handle the server's network error.
 */

export const thunkTryCatch = async <T>(
  thunkAPI: GetThunkAPI<
    OverrideThunkApiConfigs<
      AsyncThunkConfig,
      {
        state: AppRootState
        rejectValue: ServerError | null
      }
    >
  >,
  logic: () => Promise<T>
): Promise<ReturnType<typeof thunkAPI.rejectWithValue> | T> => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppRequestStatus({ status: 'loading' }))
  try {
    return await logic()
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(appActions.setAppRequestStatus({ status: 'idle' }))
  }
}
