import { combineReducers, UnknownAction } from 'redux'
import { todolistsReducer } from 'features/todolists/todolists-reducer'
import { tasksReducer } from 'features/todolists/todolist/tasks/tasks-reducer'
import { ThunkAction } from 'redux-thunk'
import { useDispatch } from 'react-redux'
import { appReducer } from 'app/appSlice'
import { authReducer } from 'features/login/authSlice'
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
