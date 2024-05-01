import { instance } from 'common/api'
import { ServerResponse } from 'common/types'
import { RemoveTodolistArg, RenameTodolistArg, TodolistApi } from 'features/todolists/api/todolists-api.types'

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistApi[]>('todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<ServerResponse<{ item: TodolistApi }>>('todo-lists', { title })
  },
  deleteTodolist(arg: RemoveTodolistArg) {
    return instance.delete<ServerResponse>(`todo-lists/${arg.id}`)
  },
  renameTodolist(arg: RenameTodolistArg) {
    return instance.put<ServerResponse>(`todo-lists/${arg.id}`, { title: arg.title })
  },
}
