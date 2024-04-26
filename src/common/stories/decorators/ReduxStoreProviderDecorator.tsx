import React from 'react'
import { Provider } from 'react-redux'
import { v1 } from 'uuid'
import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer } from 'features/tasks/tasks-slice'
import { todolistsReducer } from 'features/todolists'
import { appReducer } from 'app'
import { authReducer } from 'features/auth'
import { TaskPriorities, TaskStatuses } from '../../enums'
import { AppRootState } from '../../types'

const initialGlobalState: AppRootState = {
  todolists: [
    { id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: new Date(), order: 0, fetchStatus: 'idle' },
    { id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: new Date(), order: 0, fetchStatus: 'idle' },
  ],
  tasks: {
    ['todolistId1']: [
      {
        id: 'task1_1',
        title: 'HTML&CSS',
        status: TaskStatuses.New,
        addedDate: null,
        order: 0,
        deadline: null,
        description: '',
        priority: TaskPriorities.Low,
        startDate: null,
        todoListId: 'todolistId1',
        fetchStatus: 'idle',
      },
      {
        id: 'task1_2',
        title: 'JS',
        status: TaskStatuses.Completed,
        addedDate: null,
        order: 0,
        deadline: null,
        description: '',
        priority: TaskPriorities.Low,
        startDate: null,
        todoListId: 'todolistId1',
        fetchStatus: 'idle',
      },
    ],
    ['todolistId2']: [
      {
        id: v1(),
        title: 'Milk',
        status: TaskStatuses.New,
        addedDate: null,
        order: 0,
        deadline: null,
        description: '',
        priority: TaskPriorities.Low,
        startDate: null,
        todoListId: 'todolistId2',
        fetchStatus: 'idle',
      },
      {
        id: v1(),
        title: 'React Book',
        status: TaskStatuses.Completed,
        addedDate: null,
        order: 0,
        deadline: null,
        description: '',
        priority: TaskPriorities.Low,
        startDate: null,
        todoListId: 'todolistId2',
        fetchStatus: 'idle',
      },
    ],
  },
  app: {
    status: 'idle',
    error: null,
    isInitialized: true,
  },
  auth: {
    isLoggedIn: true,
  },
}

export const storyBookStore = configureStore({
  reducer: {
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
  },
  preloadedState: initialGlobalState,
})

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
