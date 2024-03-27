import { instance } from 'common/api/instance'
import { Response } from 'common/types/Response'
import { TaskPriorities, TaskStatuses } from 'common/enums/enums'

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

// response types
type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: Task[]
}
