import { instance } from 'common/api'
import { Response } from 'common/types'

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistApi[]>('todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<Response<{ item: TodolistApi }>>('todo-lists', { title })
  },
  deleteTodolist(arg: RemoveTodolistArg) {
    return instance.delete<Response>(`todo-lists/${arg.id}`)
  },
  renameTodolist(arg: RenameTodolistArg) {
    return instance.put<Response>(`todo-lists/${arg.id}`, { title: arg.title })
  },
}

// types
export type TodolistApi = {
  id: string
  addedDate: Date
  order: number
  title: string
}
export type RemoveTodolistArg = {
  id: string
}
export type RenameTodolistArg = {
  id: string
  title: string
}
