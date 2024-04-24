import { instance } from 'common/api'
import { ServerResponse } from 'common/types'
import { TaskPriorities, TaskStatuses } from 'common/enums'

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(arg: CreateTaskArg) {
    return instance.post<ServerResponse<{ item: ApiTask }>>(`todo-lists/${arg.todolistId}/tasks`, { title: arg.title })
  },
  deleteTask(arg: RemoveTaskArg) {
    return instance.delete<ServerResponse>(`/todo-lists/${arg.todolistId}/tasks/${arg.taskId}`)
  },
  updateTask(arg: UpdateTaskArg<UpdateApiTaskModel>) {
    return instance.put<ServerResponse<{ item: ApiTask }>>(
      `todo-lists/${arg.todolistId}/tasks/${arg.taskId}`,
      arg.model
    )
  },
}

export type ApiTask = {
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
export type UpdateApiTaskModel = {
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
  items: ApiTask[]
}
