import { test } from 'vitest'
import { v4 } from 'uuid'
import {
  Filter,
  TodolistDomain,
  todolistsActions,
  todolistsReducer,
  todolistsThunks,
} from 'features/todolists/model/todolists-slice'
import { TodolistApi } from 'features/todolists/api/todolists-api.types'

const todolistId1 = v4()
const todolistId2 = v4()

const DATE = new Date()

const startState: TodolistDomain[] = [
  { id: todolistId1, title: 'To Learn', filter: 'all', addedDate: DATE, order: 0, fetchStatus: 'idle' },
  { id: todolistId2, title: 'To Buy', filter: 'all', addedDate: DATE, order: 0, fetchStatus: 'idle' },
]

const newTitle = 'new title'

test('should remove the correct todolist', ({ expect }) => {
  type RemoveTodolist = ReturnType<typeof todolistsThunks.removeTodolist.fulfilled>
  const action: RemoveTodolist = {
    type: todolistsThunks.removeTodolist.fulfilled.type,
    payload: {
      id: todolistId2,
    },
    meta: {
      arg: { id: todolistId2 },
      requestId: 'requestId',
      requestStatus: 'fulfilled',
    },
  }
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId1)
})

test('should rename the correct todolist', ({ expect }) => {
  type RenameTodolist = ReturnType<typeof todolistsThunks.renameTodolist.fulfilled>
  const action: RenameTodolist = {
    type: todolistsThunks.renameTodolist.fulfilled.type,
    payload: {
      id: todolistId2,
      title: newTitle,
    },
    meta: {
      arg: {
        id: todolistId2,
        title: newTitle,
      },
      requestId: 'requestId',
      requestStatus: 'fulfilled',
    },
  }
  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe('To Learn')
  expect(endState[1].title).toBe(newTitle)
})

test('should add a new correct todolist', ({ expect }) => {
  const newTodolist: TodolistApi = {
    id: todolistId1,
    title: newTitle,
    addedDate: DATE,
    order: 0,
  }
  type AddTodolist = Omit<ReturnType<typeof todolistsThunks.addTodolist.fulfilled>, 'meta'>
  const action: AddTodolist = {
    type: todolistsThunks.addTodolist.fulfilled.type,
    payload: {
      todolist: newTodolist,
    },
  }
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTitle)
  expect(endState[0].filter).toBe('all')
})

test('should change the filter of the correct todolist', ({ expect }) => {
  const newFilter: Filter = 'completed'

  const endState = todolistsReducer(startState, todolistsActions.changeFilter({ id: todolistId2, filter: newFilter }))

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})

test('should update the state with todolists and set the filter to "all"', ({ expect }) => {
  const dataFromApi: TodolistApi[] = [
    { id: todolistId1, title: 'To Learn', addedDate: DATE, order: 0 },
    { id: todolistId2, title: 'To Buy', addedDate: DATE, order: 0 },
  ]
  type SetTodolists = Omit<ReturnType<typeof todolistsThunks.fetchTodolists.fulfilled>, 'meta'>
  const action: SetTodolists = {
    type: todolistsThunks.fetchTodolists.fulfilled.type,
    payload: {
      todolists: dataFromApi,
    },
  }

  expect(todolistsReducer([], action)).toEqual(startState)
})
