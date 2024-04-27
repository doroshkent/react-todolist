import { instance } from 'common/api'
import { ServerResponse } from 'common/types'
import { TASK_PRIORITIES, TASK_STATUSES } from 'common/enums'

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
  status: TASK_STATUSES
  addedDate: Date | null
  deadline: Date | null
  description: null | string
  order: number
  priority: TASK_PRIORITIES
  startDate: Date | null
}
export type UpdateApiTaskModel = Omit<ApiTask, 'todoListId' | 'id' | 'addedDate' | 'order'>
export type CreateTaskArg = {
  todolistId: string
  title: string
}
export type UpdateTaskArg<T> = RemoveTaskArg & {
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
