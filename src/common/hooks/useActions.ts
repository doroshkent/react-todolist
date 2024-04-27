import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { tasksThunks } from 'features/tasks'
import { todolistsActions, todolistsThunks } from 'features/todolists'
import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit'
import { appThunks, appActions } from 'app'
import { authThunks } from 'features/auth'

/**
 * Hook `useActions`: A custom React Hook that binds dispatch to all action creators from different slices/features and
 * app-wide actions. Using this Hook in a component allows you to dispatch any Redux action from one single object.
 *
 * @returns An object containing all the action creators, each bound to the Redux `dispatch` function.
 *
 * @example const { addTodoList, fetchTodoList } = useActions();
 *
 * Inside this Hook:
 * - A `useDispatch` hook is called to get the `dispatch` function from Redux.
 * - The `bindActionCreators` utility from Redux is used inside a `useMemo` hook to bind `dispatch` to all action creators,
 *   ensuring that the binding only occurs once during the component's lifespan, unless `dispatch` changes for some reason.
 *
 * The types used here:
 * - `AllActions`: A type representing all action creators by combining the individual sets of action creators.
 * - `ReplaceReturnType`: A utility type used within `RemapActionCreators` to change the return type of all functions
 * within the `RemapActionCreators` mapped type.
 * - `RemapActionCreators`: A mapped type that iterates over all keys in given `ActionCreatorsMapObject`, and maps the
 * types to replace original thunk return type (Promise<Action<any> | void>) with `ReturnType<Action<any>>`.
 * This is done for more precise type-checking, allowing the consumers of `useActions` to have cleaner auto-suggestion
 * and precise return types for each action from `useActions`.
 */

const actionsAll = {
  ...tasksThunks,
  ...todolistsThunks,
  ...todolistsActions,
  ...appThunks,
  ...authThunks,
  ...appActions,
}

export const useActions = () => {
  const dispatch = useDispatch()

  return useMemo(
    () => bindActionCreators<AllActions, RemapActionCreators<AllActions>>(actionsAll, dispatch),
    [dispatch]
  )
}

// types
type AllActions = typeof actionsAll
type ReplaceReturnType<T> = T extends (...args: any[]) => any
  ? (...args: Parameters<T>) => ReturnType<ReturnType<T>>
  : () => T

type RemapActionCreators<T extends ActionCreatorsMapObject> = {
  [K in keyof T]: ReplaceReturnType<T[K]>
}
