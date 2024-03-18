import { combineReducers, UnknownAction } from 'redux'
import { todolistsReducer } from 'features/todolists/todolists-reducer'
import { tasksReducer } from 'features/todolists/todolist/tasks/tasks-reducer'
import { ThunkAction } from 'redux-thunk'
import { useDispatch } from 'react-redux'
import { appReducer } from 'app/app-reducer'
import { authReducer } from 'features/login/auth-slice'
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
export const useAppDispatch = useDispatch<AppDispatch>

// types
export type AppRootState = ReturnType<typeof rootReducer>
type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, UnknownAction>
