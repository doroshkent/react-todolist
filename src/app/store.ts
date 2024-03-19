import { UnknownAction } from 'redux'
import { todolistsReducer } from 'features/todolists/todolistsSlice'
import { tasksReducer } from 'features/todolists/todolist/tasks/tasksSlice'
import { ThunkAction } from 'redux-thunk'
import { useDispatch } from 'react-redux'
import { appReducer } from 'app/appSlice'
import { authReducer } from 'features/login/authSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
  },
})
export const useAppDispatch = useDispatch<AppDispatch>

// types
export type AppRootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, UnknownAction>
