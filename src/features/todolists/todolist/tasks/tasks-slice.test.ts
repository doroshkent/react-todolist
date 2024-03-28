import { v4 } from 'uuid'
import { tasksActions, tasksReducer, TasksState, tasksThunks } from 'features/todolists/todolist/tasks/tasks-slice'
import { Todolist } from 'features/todolists/todolists-api'
import { todolistsActions } from 'features/todolists/todolistsSlice'
import { TaskPriorities, TaskStatuses } from 'common/enums/enums'
import { Task } from 'features/todolists/todolist/tasks/tasks-api'

const todolistId1 = v4()
const todolistId2 = v4()

const startState: TasksState = {
  [todolistId1]: [
    {
      id: '1',
      title: 'HTML&CSS',
      status: TaskStatuses.Completed,
      addedDate: null,
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
      addedDate: null,
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
      addedDate: null,
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
      addedDate: null,
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
      addedDate: null,
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
      addedDate: null,
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
  type RemoveTask = Omit<ReturnType<typeof tasksThunks.removeTask.fulfilled>, 'meta'>

  const action: RemoveTask = {
    type: tasksThunks.removeTask.fulfilled.type,
    payload: {
      todolistId: todolistId2,
      taskId: '2',
    },
  }
  const endState = tasksReducer(startState, action)

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

type UpdateTask = Omit<ReturnType<typeof tasksThunks.updateTask.fulfilled>, 'meta'>

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

  const action: UpdateTask = {
    type: tasksThunks.updateTask.fulfilled.type,
    payload: {
      task: updatedTask,
      todolistId: todolistId2,
    },
  }

  const endState = tasksReducer(startState, action)

  expect(endState[todolistId1][1].title).toBe('JS')
  expect(endState[todolistId2][1].title).toBe(newTitle)
  expect(endState[todolistId2][1].status).toBe(TaskStatuses.New)
})

test('should not affect other properties of the task', () => {
  const taskWithUpdatedTitle = {
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

  const action: UpdateTask = {
    type: tasksThunks.updateTask.fulfilled.type,
    payload: {
      task: taskWithUpdatedTitle,
      todolistId: todolistId2,
    },
  }

  const endState = tasksReducer(startState, action)

  expect(endState[todolistId2][1].title).toBe(newTitle)
  expect(endState[todolistId2][1].status).toBe(TaskStatuses.Completed) // or whatever it was initially
})

test('should change status of task in correct todolist', () => {
  const endState = tasksReducer(
    startState,
    tasksActions.setTaskEntityStatus({ todolistId: todolistId1, taskId: '1', entityStatus: 'succeeded' })
  )

  expect(endState[todolistId1][0].entityStatus).toBe('succeeded')
  expect(endState[todolistId2][0].entityStatus).toBe('idle')
})

test('should add new task with entity status', () => {
  const newTask: Task = {
    id: '1',
    title: newTitle,
    status: TaskStatuses.New,
    addedDate: null,
    order: 0,
    deadline: null,
    description: '',
    priority: TaskPriorities.Low,
    startDate: null,
    todoListId: todolistId2,
  }

  type AddTask = Omit<ReturnType<typeof tasksThunks.addTask.fulfilled>, 'meta'>

  const action: AddTask = {
    type: tasksThunks.addTask.fulfilled.type,
    payload: {
      task: newTask,
      todolistId: todolistId2,
    },
  }

  const endState = tasksReducer(startState, action)

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

test('should set tasks with entity status for todolist', () => {
  type FetchTasks = Omit<ReturnType<typeof tasksThunks.fetchTasks.fulfilled>, 'meta'>

  const taskFromApi: Task[] = [
    {
      id: '1',
      title: 'HTML&CSS',
      status: TaskStatuses.Completed,
      addedDate: null,
      order: 0,
      deadline: null,
      description: '',
      priority: TaskPriorities.Low,
      startDate: null,
      todoListId: todolistId1,
    },
  ]

  const action: FetchTasks = {
    type: tasksThunks.fetchTasks.fulfilled.type,
    payload: {
      tasks: taskFromApi,
      todolistId: todolistId1,
    },
  }

  const endState = tasksReducer({ [todolistId1]: [], [todolistId2]: [] }, action)

  expect(endState[todolistId1].length).toBe(1)
  expect(endState[todolistId1][0].entityStatus).toBe('idle')
  expect(endState[todolistId2].length).toBe(0)
})
