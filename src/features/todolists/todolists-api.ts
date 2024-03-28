import { instance } from 'common/api'
import { Response } from 'common/types'

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistApi[]>('todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<Response<{ item: TodolistApi }>>('todo-lists', { title })
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<Response>(`todo-lists/${todolistId}`)
  },
  updateTodolistTitle(todolistId: string, title: string) {
    return instance.put<Response>(`todo-lists/${todolistId}`, { title })
  },
}

// types
export type TodolistApi = {
  id: string
  addedDate: Date
  order: number
  title: string
}
