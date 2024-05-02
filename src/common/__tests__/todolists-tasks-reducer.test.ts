import { test } from 'vitest'
import { tasksReducer, TasksState } from 'features/tasks/model/tasks-slice'
import { TodolistDomain, todolistsReducer, todolistsThunks } from 'features/todolists/model/todolists-slice'
import { TodolistApi } from 'features/todolists'

test('new array should be added when new todolist is added', ({ expect }) => {
  const newTodolist: TodolistApi = {
    id: '1',
    title: 'new todolist',
    addedDate: new Date(),
    order: 0,
  }
  const startState: TasksState = {}
  type AddTodolist = Omit<ReturnType<typeof todolistsThunks.addTodolist.fulfilled>, 'meta'>
  const action: AddTodolist = {
    type: todolistsThunks.addTodolist.fulfilled.type,
    payload: {
      todolist: newTodolist,
    },
  }

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(1)
  expect(endState[newKey]).toEqual([])
})

test('ids should be equal', ({ expect }) => {
  const tasksStartState: TasksState = {}
  const todolistsStartState: TodolistDomain[] = []
  const newTodolist = {
    id: '1',
    title: 'new tl',
    filter: 'all',
    addedDate: new Date(),
    order: 0,
  }
  type AddTodolist = Omit<ReturnType<typeof todolistsThunks.addTodolist.fulfilled>, 'meta'>
  const action: AddTodolist = {
    type: todolistsThunks.addTodolist.fulfilled.type,
    payload: {
      todolist: newTodolist,
    },
  }

  const tasksEndState = tasksReducer(tasksStartState, action)
  const todolistsEndState = todolistsReducer(todolistsStartState, action)

  const keys = Object.keys(tasksEndState)
  const idFromTasks = keys[0]
  const idFromTodolists = todolistsEndState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
