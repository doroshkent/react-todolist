import { configureStore } from '@reduxjs/toolkit'
import { todolistsReducer } from 'features/todolists'
import { tasksReducer } from 'features/todolists/todolist/tasks'
import { appReducer } from 'app'
import { authReducer } from 'features/login'

export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
  },
})
