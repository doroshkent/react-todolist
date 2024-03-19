import { v4 } from 'uuid'
import { FilterValues, TodolistDomain, todolistsReducer, todolistsActions } from 'features/todolists/todolistsSlice'
import { Todolist } from 'features/todolists/todolists-api'

const todolistId1 = v4()
const todolistId2 = v4()

const DATE = new Date()

const startState: TodolistDomain[] = [
  { id: todolistId1, title: 'To Learn', filter: 'all', addedDate: DATE, order: 0, entityStatus: 'idle' },
  { id: todolistId2, title: 'To Buy', filter: 'all', addedDate: DATE, order: 0, entityStatus: 'idle' },
]

const newTitle = 'new title'

test('should remove the correct todolist', () => {
  const endState = todolistsReducer(startState, todolistsActions.removeTodolist({ id: todolistId2 }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId1)
})

test('should rename the correct todolist', () => {
  const endState = todolistsReducer(startState, todolistsActions.renameTodolist({ id: todolistId2, title: newTitle }))

  expect(endState[0].title).toBe('To Learn')
  expect(endState[1].title).toBe(newTitle)
})

test('should add a new correct todolist', () => {
  const newTodolist = {
    id: todolistId1,
    title: newTitle,
    filter: 'all',
    addedDate: DATE,
    order: 0,
  }
  const endState = todolistsReducer(startState, todolistsActions.addTodolist({ todolist: newTodolist }))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTitle)
  expect(endState[0].filter).toBe('all')
})

test('should change the filter of the correct todolist', () => {
  const newFilter: FilterValues = 'completed'

  const endState = todolistsReducer(startState, todolistsActions.changeFilter({ id: todolistId2, filter: newFilter }))

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})

test('should update the state with todolists and set the filter to "all"', () => {
  const dataFromApi: Todolist[] = [
    { id: todolistId1, title: 'To Learn', addedDate: DATE, order: 0 },
    { id: todolistId2, title: 'To Buy', addedDate: DATE, order: 0 },
  ]

  expect(todolistsReducer([], todolistsActions.setTodolists({ todolists: dataFromApi }))).toEqual(startState)
})

test('should update entityStatus of todo with a given id', () => {
  const endState = todolistsReducer(
    startState,
    todolistsActions.setTodolistEntityStatus({ id: todolistId1, entityStatus: 'loading' })
  )

  expect(endState).toEqual([
    { id: todolistId1, title: 'To Learn', filter: 'all', addedDate: DATE, order: 0, entityStatus: 'loading' },
    { id: todolistId2, title: 'To Buy', filter: 'all', addedDate: DATE, order: 0, entityStatus: 'idle' },
  ])
})
