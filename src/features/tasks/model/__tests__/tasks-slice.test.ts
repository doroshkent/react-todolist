import { v4 } from 'uuid'
import { test } from 'vitest'
import { TodolistApi, todolistsThunks } from 'features/todolists'
import { TASK_PRIORITIES, TASK_STATUSES } from 'common/enums'
import { tasksReducer, TasksState, tasksThunks } from 'features/tasks/model/tasks-slice'
import { ApiTask } from 'features/tasks/api/tasks-api.types'
import { createFulfilledAction } from 'common/utils/createFullfilledAction'

const todolistId1 = v4()
const todolistId2 = v4()

const startState: TasksState = {
  [todolistId1]: [
    {
      id: '1',
      title: 'HTML&CSS',
      status: TASK_STATUSES.Completed,
      addedDate: null,
      order: 0,
      deadline: null,
      description: '',
      priority: TASK_PRIORITIES.Low,
      startDate: null,
      todoListId: todolistId1,
      fetchStatus: 'idle',
    },
    {
      id: '2',
      title: 'JS',
      status: TASK_STATUSES.Completed,
      addedDate: null,
      order: 0,
      deadline: null,
      description: '',
      priority: TASK_PRIORITIES.Low,
      startDate: null,
      todoListId: todolistId1,
      fetchStatus: 'idle',
    },
    {
      id: '3',
      title: 'React',
      status: TASK_STATUSES.New,
      addedDate: null,
      order: 0,
      deadline: null,
      description: '',
      priority: TASK_PRIORITIES.Low,
      startDate: null,
      todoListId: todolistId1,
      fetchStatus: 'idle',
    },
  ],
  [todolistId2]: [
    {
      id: '1',
      title: 'milk',
      status: TASK_STATUSES.Completed,
      addedDate: null,
      order: 0,
      deadline: null,
      description: '',
      priority: TASK_PRIORITIES.Low,
      startDate: null,
      todoListId: todolistId2,
      fetchStatus: 'idle',
    },
    {
      id: '2',
      title: 'book',
      status: TASK_STATUSES.Completed,
      addedDate: null,
      order: 0,
      deadline: null,
      description: '',
      priority: TASK_PRIORITIES.Low,
      startDate: null,
      todoListId: todolistId2,
      fetchStatus: 'idle',
    },
    {
      id: '3',
      title: 'tea',
      status: TASK_STATUSES.New,
      addedDate: null,
      order: 0,
      deadline: null,
      description: '',
      priority: TASK_PRIORITIES.Low,
      startDate: null,
      todoListId: todolistId2,
      fetchStatus: 'idle',
    },
  ],
}

const newTitle = 'new task'

test('should remove the correct task from the correct todolist', ({ expect }) => {
  type RemoveTask = ReturnType<typeof tasksThunks.removeTask.fulfilled>

  const action: RemoveTask = {
    type: tasksThunks.removeTask.fulfilled.type,
    payload: {
      todolistId: todolistId2,
      taskId: '2',
    },
    meta: {
      arg: {
        todolistId: todolistId2,
        taskId: '2',
      },
      requestStatus: 'fulfilled',
      requestId: 'requestId',
    },
  }
  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    [todolistId1]: [
      {
        id: '1',
        title: 'HTML&CSS',
        status: TASK_STATUSES.Completed,
        addedDate: null,
        order: 0,
        deadline: null,
        description: '',
        priority: TASK_PRIORITIES.Low,
        startDate: null,
        todoListId: todolistId1,
        fetchStatus: 'idle',
      },
      {
        id: '2',
        title: 'JS',
        status: TASK_STATUSES.Completed,
        addedDate: null,
        order: 0,
        deadline: null,
        description: '',
        priority: TASK_PRIORITIES.Low,
        startDate: null,
        todoListId: todolistId1,
        fetchStatus: 'idle',
      },
      {
        id: '3',
        title: 'React',
        status: TASK_STATUSES.New,
        addedDate: null,
        order: 0,
        deadline: null,
        description: '',
        priority: TASK_PRIORITIES.Low,
        startDate: null,
        todoListId: todolistId1,
        fetchStatus: 'idle',
      },
    ],
    [todolistId2]: [
      {
        id: '1',
        title: 'milk',
        status: TASK_STATUSES.Completed,
        addedDate: null,
        order: 0,
        deadline: null,
        description: '',
        priority: TASK_PRIORITIES.Low,
        startDate: null,
        todoListId: todolistId2,
        fetchStatus: 'idle',
      },
      {
        id: '3',
        title: 'tea',
        status: TASK_STATUSES.New,
        addedDate: null,
        order: 0,
        deadline: null,
        description: '',
        priority: TASK_PRIORITIES.Low,
        startDate: null,
        todoListId: todolistId2,
        fetchStatus: 'idle',
      },
    ],
  })
})

type UpdateTask = ReturnType<typeof tasksThunks.updateTask.fulfilled>

test('should update the correct task', ({ expect }) => {
  const updatedTask: ApiTask = {
    id: '2',
    title: newTitle,
    status: TASK_STATUSES.New,
    description: null,
    deadline: null,
    addedDate: null,
    startDate: null,
    priority: TASK_PRIORITIES.Low,
    order: 0,
    todoListId: todolistId2,
  }

  const action: UpdateTask = {
    type: tasksThunks.updateTask.fulfilled.type,
    payload: {
      task: updatedTask,
      todolistId: todolistId2,
    },
    meta: {
      arg: {
        taskId: updatedTask.id,
        todolistId: todolistId2,
        model: updatedTask,
      },
      requestStatus: 'fulfilled',
      requestId: 'requestId',
    },
  }

  const endState = tasksReducer(startState, action)

  expect(endState[todolistId1][1].title).toBe('JS')
  expect(endState[todolistId2][1].title).toBe(newTitle)
  expect(endState[todolistId2][1].status).toBe(TASK_STATUSES.New)
})

test('should not affect other properties of the task', ({ expect }) => {
  const taskWithUpdatedTitle = {
    id: '2',
    title: newTitle,
    status: TASK_STATUSES.Completed,
    description: null,
    deadline: null,
    addedDate: null,
    startDate: null,
    priority: TASK_PRIORITIES.Low,
    order: 0,
    todoListId: todolistId2,
  }

  const action: UpdateTask = {
    type: tasksThunks.updateTask.fulfilled.type,
    payload: {
      task: taskWithUpdatedTitle,
      todolistId: todolistId2,
    },
    meta: {
      arg: {
        taskId: taskWithUpdatedTitle.id,
        todolistId: todolistId2,
        model: taskWithUpdatedTitle,
      },
      requestStatus: 'fulfilled',
      requestId: 'requestId',
    },
  }

  const endState = tasksReducer(startState, action)

  expect(endState[todolistId2][1].title).toBe(newTitle)
  expect(endState[todolistId2][1].status).toBe(TASK_STATUSES.Completed) // or whatever it was initially
})

test('should add new task with entity status', ({ expect }) => {
  const newTask: ApiTask = {
    id: '1',
    title: newTitle,
    status: TASK_STATUSES.New,
    addedDate: null,
    order: 0,
    deadline: null,
    description: '',
    priority: TASK_PRIORITIES.Low,
    startDate: null,
    todoListId: todolistId2,
  }
  const addTaskFulfilled = createFulfilledAction(tasksThunks.addTask)

  const endState = tasksReducer(
    startState,
    addTaskFulfilled({
      task: newTask,
      todolistId: todolistId2,
    })
  )

  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId2].length).toBe(4)
  expect(endState[todolistId2][0].id).toBeDefined()
  expect(endState[todolistId2][0].title).toBe(newTitle)
  expect(endState[todolistId2][0].status).toBe(TASK_STATUSES.New)
})

test('should add a new property with a new array when a new todolist is added', ({ expect }) => {
  const newTodolist: TodolistApi = {
    id: '1',
    title: 'new todolist',
    addedDate: new Date(),
    order: 0,
  }
  const addTodolistFulfilled = createFulfilledAction(todolistsThunks.addTodolist)
  const endState = tasksReducer(
    startState,
    addTodolistFulfilled({
      todolist: newTodolist,
    })
  )

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== todolistId1 && k !== todolistId2)
  if (!newKey) {
    throw new Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('should delete the property with todolistId', ({ expect }) => {
  const removeTodolistFulfilled = createFulfilledAction(todolistsThunks.removeTodolist)
  const endState = tasksReducer(
    startState,
    removeTodolistFulfilled({
      id: todolistId2,
    })
  )

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState[todolistId2]).toBeUndefined()
})

test('should add a new property with a new array when a new todolists are set', ({ expect }) => {
  const dataFromApi: TodolistApi[] = [
    { id: todolistId1, title: 'To Learn', addedDate: new Date(), order: 0 },
    { id: todolistId2, title: 'To Buy', addedDate: new Date(), order: 0 },
  ]
  const fetchTodolistsFulfilled = createFulfilledAction(todolistsThunks.fetchTodolists)
  const endState = tasksReducer(
    {},
    fetchTodolistsFulfilled({
      todolists: dataFromApi,
    })
  )

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(keys[0]).toBe(todolistId1)
  expect(keys[1]).toBe(todolistId2)
})

test('should set tasks with entity status for todolist', ({ expect }) => {
  const taskFromApi: ApiTask[] = [
    {
      id: '1',
      title: 'HTML&CSS',
      status: TASK_STATUSES.Completed,
      addedDate: null,
      order: 0,
      deadline: null,
      description: '',
      priority: TASK_PRIORITIES.Low,
      startDate: null,
      todoListId: todolistId1,
    },
  ]

  const fetchTasksFulfilled = createFulfilledAction(tasksThunks.fetchTasks)
  const endState = tasksReducer(
    { [todolistId1]: [], [todolistId2]: [] },
    fetchTasksFulfilled({ tasks: taskFromApi, todolistId: todolistId1 })
  )

  expect(endState[todolistId1].length).toBe(1)
  expect(endState[todolistId1][0].fetchStatus).toBe('idle')
  expect(endState[todolistId2].length).toBe(0)
})
