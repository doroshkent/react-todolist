import { instance } from 'common/api/instance'
import { Response } from 'common/types/Response'

export const todolistsApi = {
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
}

// types
export type Todolist = {
  id: string
  addedDate: Date
  order: number
  title: string
}
