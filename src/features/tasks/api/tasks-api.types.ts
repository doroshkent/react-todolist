import { TASK_PRIORITIES, TASK_STATUSES } from 'common/enums'

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
export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: ApiTask[]
}
