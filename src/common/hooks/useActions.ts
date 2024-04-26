import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { tasksThunks } from 'features/tasks'
import { todolistsActions, todolistsThunks } from 'features/todolists'
import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit'
import { appThunks, appActions } from 'app'
import { authThunks } from 'features/auth'

const actionsAll = {
  ...tasksThunks,
  ...todolistsThunks,
  ...todolistsActions,
  ...appThunks,
  ...authThunks,
  ...appActions,
}

type AllActions = typeof actionsAll

export const useActions = () => {
  const dispatch = useDispatch()

  return useMemo(
    () => bindActionCreators<AllActions, RemapActionCreators<AllActions>>(actionsAll, dispatch),
    [dispatch]
  )
}

// Types
type ReplaceReturnType<T> = T extends (...args: any[]) => any
  ? (...args: Parameters<T>) => ReturnType<ReturnType<T>>
  : () => T

type RemapActionCreators<T extends ActionCreatorsMapObject> = {
  [K in keyof T]: ReplaceReturnType<T[K]>
}
