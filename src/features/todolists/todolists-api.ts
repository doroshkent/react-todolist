import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
})

export const todolistsApi = {
  // todolists
  getTodolists() {
    return instance.get<Todolist[]>('todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<Response<{ item: Todolist }>>('todo-lists', { title })
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<Response>(`todo-lists/${todolistId}`)
  },
  updateTodolistTitle(todolistId: string, title: string) {
    return instance.put<Response>(`todo-lists/${todolistId}`, { title })
  },
  // tasks
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(arg: CreateTaskArg) {
    return instance.post<Response<{ item: Task }>>(`todo-lists/${arg.todolistId}/tasks`, { title: arg.title })
  },
  deleteTask(arg: RemoveTaskArg) {
    return instance.delete<Response>(`/todo-lists/${arg.todolistId}/tasks/${arg.taskId}`)
  },
  updateTask(arg: UpdateTaskArg<UpdateTaskModel>) {
    return instance.put<Response<{ item: Task }>>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`, arg.model)
  },
}

// types
export type Todolist = {
  id: string
  addedDate: Date
  order: number
  title: string
}
export type Task = {
  todoListId: string
  id: string
  title: string
  status: TaskStatuses
  addedDate: string | null
  deadline: null
  description: null | string
  order: number
  priority: TaskPriorities
  startDate: null
}
export type UpdateTaskModel = {
  title: string
  description: string | null
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string | null
  deadline: string | null
}
export type CreateTaskArg = {
  todolistId: string
  title: string
}
export type UpdateTaskArg<T> = {
  todolistId: string
  taskId: string
  model: T
}
export type RemoveTaskArg = {
  todolistId: string
  taskId: string
}

export enum TaskStatuses {
  New,
  InProgress,
  Completed,
  Draft,
}
export enum TaskPriorities {
  Low,
  Middle,
  High,
  Urgently,
  Later,
}

// response types
export type Response<D = {}> = {
  resultCode: RESULT_CODE
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}
type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: Task[]
}
export enum RESULT_CODE {
  SUCCEEDED,
  ERROR,
  CAPTCHA = 10,
}
export type ServerError = {
  statusCode: number
  messages: [
    {
      message: string
      field: string
    },
    string
  ]
  error: string
}
