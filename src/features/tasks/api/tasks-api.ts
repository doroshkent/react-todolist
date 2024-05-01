import { instance } from 'common/api'
import { ServerResponse } from 'common/types'
import {
  ApiTask,
  CreateTaskArg,
  GetTasksResponse,
  RemoveTaskArg,
  UpdateApiTaskModel,
  UpdateTaskArg,
} from 'features/tasks/api/tasks-api.types'

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
