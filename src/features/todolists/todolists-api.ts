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
  createTask(todolistId: string, title: string) {
    return instance.post<Response<{ item: Task }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<Response>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<Response<{ item: Task }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}

// entity types
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
