import { configureStore } from '@reduxjs/toolkit'
import { todolistsReducer } from 'features/todolists'
import { tasksReducer } from 'features/tasks'
import { appReducer } from './app-slice'
import { authReducer } from 'features/auth'

export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
  },
})
