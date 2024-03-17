import { addTodolistAC, TodolistDomain, todolistsReducer } from 'features/todolists/todolists-reducer'
import { tasksReducer, TasksState } from 'features/todolists/todolist/tasks/tasks-reducer'

test('new array should be added when new todolist is added', () => {
  const newTodolist = {
    id: '1',
    title: 'new todolist',
    filter: 'all',
    addedDate: new Date(),
    order: 0,
  }
  const startState: TasksState = {}

  const action = addTodolistAC(newTodolist)

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(1)
  expect(endState[newKey]).toEqual([])
})

test('ids should be equal', () => {
  const tasksStartState: TasksState = {}
  const todolistsStartState: TodolistDomain[] = []
  const newTodolist = {
    id: '1',
    title: 'new tl',
    filter: 'all',
    addedDate: new Date(),
    order: 0,
  }

  const action = addTodolistAC(newTodolist)

  const tasksEndState = tasksReducer(tasksStartState, action)
  const todolistsEndState = todolistsReducer(todolistsStartState, action)

  const keys = Object.keys(tasksEndState)
  const idFromTasks = keys[0]
  const idFromTodolists = todolistsEndState[0].id

  expect(idFromTasks).toBe(action.todolist.id)
  expect(idFromTodolists).toBe(action.todolist.id)
})
