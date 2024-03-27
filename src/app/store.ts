import { todolistsReducer } from 'features/todolists/todolistsSlice'
import { tasksReducer } from 'features/todolists/todolist/tasks/tasks-slice'
import { ThunkAction } from 'redux-thunk'
import { appReducer } from 'app/appSlice'
import { authReducer } from 'features/login/authSlice'
import { configureStore, UnknownAction } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
  },
})

// types
export type AppRootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, UnknownAction>
