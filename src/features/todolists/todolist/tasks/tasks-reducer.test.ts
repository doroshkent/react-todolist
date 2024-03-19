import { v4 } from 'uuid'
import {
  addTaskAC,
  removeTaskAC,
  setTaskEntityStatusAC,
  tasksReducer,
  TasksState,
  updateTaskAC,
} from 'features/todolists/todolist/tasks/tasks-reducer'
import { TaskPriorities, TaskStatuses, Task, Todolist } from 'features/todolists/todolists-api'
import { todolistsActions } from 'features/todolists/todolistsSlice'

const todolistId1 = v4()
const todolistId2 = v4()

const startState: TasksState = {
  [todolistId1]: [
    {
      id: '1',
      title: 'HTML&CSS',
      status: TaskStatuses.Completed,
      addedDate: '',
      order: 0,
      deadline: null,
      description: '',
      priority: TaskPriorities.Low,
      startDate: null,
      todoListId: todolistId1,
      entityStatus: 'idle',
    },
    {
      id: '2',
      title: 'JS',
      status: TaskStatuses.Completed,
      addedDate: '',
      order: 0,
      deadline: null,
      description: '',
      priority: TaskPriorities.Low,
      startDate: null,
      todoListId: todolistId1,
      entityStatus: 'idle',
    },
    {
      id: '3',
      title: 'React',
      status: TaskStatuses.New,
      addedDate: '',
      order: 0,
      deadline: null,
      description: '',
      priority: TaskPriorities.Low,
      startDate: null,
      todoListId: todolistId1,
      entityStatus: 'idle',
    },
  ],
  [todolistId2]: [
    {
      id: '1',
      title: 'milk',
      status: TaskStatuses.Completed,
      addedDate: '',
      order: 0,
      deadline: null,
      description: '',
      priority: TaskPriorities.Low,
      startDate: null,
      todoListId: todolistId2,
      entityStatus: 'idle',
    },
    {
      id: '2',
      title: 'book',
      status: TaskStatuses.Completed,
      addedDate: '',
      order: 0,
      deadline: null,
      description: '',
      priority: TaskPriorities.Low,
      startDate: null,
      todoListId: todolistId2,
      entityStatus: 'idle',
    },
    {
      id: '3',
      title: 'tea',
      status: TaskStatuses.New,
      addedDate: '',
      order: 0,
      deadline: null,
      description: '',
      priority: TaskPriorities.Low,
      startDate: null,
      todoListId: todolistId2,
      entityStatus: 'idle',
    },
  ],
}

const newTitle = 'new task'

test('should remove the correct task from the correct todolist', () => {
  const endState = tasksReducer(startState, removeTaskAC(todolistId2, '2'))

  expect(endState).toEqual({
    [todolistId1]: [
      {
        id: '1',
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        addedDate: '',
        order: 0,
        deadline: null,
        description: '',
        priority: TaskPriorities.Low,
        startDate: null,
        todoListId: todolistId1,
        entityStatus: 'idle',
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        addedDate: '',
        order: 0,
        deadline: null,
        description: '',
        priority: TaskPriorities.Low,
        startDate: null,
        todoListId: todolistId1,
        entityStatus: 'idle',
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        deadline: null,
        description: '',
        priority: TaskPriorities.Low,
        startDate: null,
        todoListId: todolistId1,
        entityStatus: 'idle',
      },
    ],
    [todolistId2]: [
      {
        id: '1',
        title: 'milk',
        status: TaskStatuses.Completed,
        addedDate: '',
        order: 0,
        deadline: null,
        description: '',
        priority: TaskPriorities.Low,
        startDate: null,
        todoListId: todolistId2,
        entityStatus: 'idle',
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        deadline: null,
        description: '',
        priority: TaskPriorities.Low,
        startDate: null,
        todoListId: todolistId2,
        entityStatus: 'idle',
      },
    ],
  })
})

test('should update the correct task', () => {
  const updatedTask: Task = {
    id: '2',
    title: newTitle,
    status: TaskStatuses.New,
    description: null,
    deadline: null,
    addedDate: null,
    startDate: null,
    priority: TaskPriorities.Low,
    order: 0,
    todoListId: todolistId2,
  }

  const endState = tasksReducer(startState, updateTaskAC(todolistId2, updatedTask))

  expect(endState[todolistId1][1].title).toBe('JS')
  expect(endState[todolistId2][1].title).toBe(newTitle)
  expect(endState[todolistId2][1].status).toBe(TaskStatuses.New)
})

test('should not affect other properties of the task', () => {
  const updatedTaskTitle = {
    id: '2',
    title: newTitle,
    status: TaskStatuses.Completed,
    description: null,
    deadline: null,
    addedDate: null,
    startDate: null,
    priority: TaskPriorities.Low,
    order: 0,
    todoListId: todolistId2,
  }

  const endState = tasksReducer(startState, updateTaskAC(todolistId2, updatedTaskTitle))

  expect(endState[todolistId2][1].title).toBe(newTitle)
  expect(endState[todolistId2][1].status).toBe(TaskStatuses.Completed) // or whatever it was initially
})

test('should change status of task in correct todolist', () => {
  const endState = tasksReducer(startState, setTaskEntityStatusAC(todolistId1, '1', 'succeeded'))

  expect(endState[todolistId1][0].entityStatus).toBe('succeeded')
  expect(endState[todolistId2][0].entityStatus).toBe('idle')
})

test('should add new task', () => {
  const newTask: Task = {
    id: '1',
    title: newTitle,
    status: TaskStatuses.New,
    addedDate: '',
    order: 0,
    deadline: null,
    description: '',
    priority: TaskPriorities.Low,
    startDate: null,
    todoListId: todolistId2,
  }
  const endState = tasksReducer(startState, addTaskAC(todolistId2, newTask))

  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId2].length).toBe(4)
  expect(endState[todolistId2][0].id).toBeDefined()
  expect(endState[todolistId2][0].title).toBe(newTitle)
  expect(endState[todolistId2][0].status).toBe(TaskStatuses.New)
})

test('should add a new property with a new array when a new todolist is added', () => {
  const newTodolist = {
    id: '1',
    title: 'new todolist',
    filter: 'all',
    addedDate: new Date(),
    order: 0,
  }
  const endState = tasksReducer(startState, todolistsActions.addTodolist({ todolist: newTodolist }))

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== todolistId1 && k !== todolistId2)
  if (!newKey) {
    throw new Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('should delete the property with todolistId', () => {
  const endState = tasksReducer(startState, todolistsActions.removeTodolist({ id: todolistId2 }))

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState[todolistId2]).toBeUndefined()
})

test('should add a new property with a new array when a new todolists are set', () => {
  const dataFromApi: Todolist[] = [
    { id: todolistId1, title: 'To Learn', addedDate: new Date(), order: 0 },
    { id: todolistId2, title: 'To Buy', addedDate: new Date(), order: 0 },
  ]
  const endState = tasksReducer({}, todolistsActions.setTodolists({ todolists: dataFromApi }))

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(keys[0]).toBe(todolistId1)
  expect(keys[1]).toBe(todolistId2)
})
