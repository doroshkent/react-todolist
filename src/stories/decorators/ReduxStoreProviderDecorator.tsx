import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, legacy_createStore } from 'redux'
import { v1 } from 'uuid'
import { tasksReducer } from 'features/todolists/todolist/tasks/tasksSlice'
import { todolistsReducer } from 'features/todolists/todolistsSlice'
import { AppRootState } from 'app/store'
import { TaskPriorities, TaskStatuses } from 'features/todolists/todolists-api'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
})

const initialGlobalState: AppRootState = {
  todolists: [
    { id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: new Date(), order: 0, entityStatus: 'idle' },
    { id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: new Date(), order: 0, entityStatus: 'idle' },
  ],
  tasks: {
    ['todolistId1']: [
      {
        id: 'task1_1',
        title: 'HTML&CSS',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        deadline: null,
        description: '',
        priority: TaskPriorities.Low,
        startDate: null,
        todoListId: 'todolistId1',
        entityStatus: 'idle',
      },
      {
        id: 'task1_2',
        title: 'JS',
        status: TaskStatuses.Completed,
        addedDate: '',
        order: 0,
        deadline: null,
        description: '',
        priority: TaskPriorities.Low,
        startDate: null,
        todoListId: 'todolistId1',
        entityStatus: 'idle',
      },
    ],
    ['todolistId2']: [
      {
        id: v1(),
        title: 'Milk',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        deadline: null,
        description: '',
        priority: TaskPriorities.Low,
        startDate: null,
        todoListId: 'todolistId2',
        entityStatus: 'idle',
      },
      {
        id: v1(),
        title: 'React Book',
        status: TaskStatuses.Completed,
        addedDate: '',
        order: 0,
        deadline: null,
        description: '',
        priority: TaskPriorities.Low,
        startDate: null,
        todoListId: 'todolistId2',
        entityStatus: 'idle',
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

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
