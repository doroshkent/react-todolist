import { instance } from 'common/api/instance'
import { Response } from 'common/types/Response'
import { TaskPriorities, TaskStatuses } from 'common/enums/enums'

export const tasksApi = {
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

export type Task = {
  todoListId: string
  id: string
  title: string
  status: TaskStatuses
  addedDate: Date | null
  deadline: null
  description: null | string
  order: number
  priority: TaskPriorities
  startDate: Date | null
}
export type UpdateTaskModel = {
  title: string
  description: string | null
  status: TaskStatuses
  priority: TaskPriorities
  startDate: Date | null
  deadline: Date | null
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
type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: Task[]
}
