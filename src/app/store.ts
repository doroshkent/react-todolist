import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { TodolistsActions, todolistsReducer } from 'features/todolists/todolists-reducer'
import { TasksActions, tasksReducer } from 'features/todolists/todolist/tasks/tasks-reducer'
import { thunk, ThunkAction } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppActions, appReducer } from 'app/app-reducer'
import { AuthActions, authReducer } from 'features/login/auth-reducer'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = legacy_createStore(rootReducer, undefined, applyMiddleware(thunk))
export const useAppDispatch = useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector

// types
export type AppRootState = ReturnType<typeof rootReducer>
type AppDispatch = typeof store.dispatch
export type Actions = TodolistsActions | TasksActions | AppActions | AuthActions
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, Actions>
