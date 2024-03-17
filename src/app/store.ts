import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { TodolistsActionsType, todolistsReducer } from 'state/todolists-reducer'
import { TasksActionsType, tasksReducer } from 'state/tasks-reducer'
import { thunk, ThunkAction } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppActionsType, appReducer } from 'app/app-reducer'
import { AuthActions, authReducer } from 'features/login/auth-reducer'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = legacy_createStore(rootReducer, undefined, applyMiddleware(thunk))
export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// types
export type AppRootStateType = ReturnType<typeof rootReducer>
type AppDispatchType = typeof store.dispatch
export type ActionsType = TodolistsActionsType | TasksActionsType | AppActionsType | AuthActions
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsType>
