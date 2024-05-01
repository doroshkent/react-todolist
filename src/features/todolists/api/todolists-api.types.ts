export type TodolistApi = {
  id: string
  addedDate: Date
  order: number
  title: string
}
export type RemoveTodolistArg = Pick<TodolistApi, 'id'>
export type RenameTodolistArg = Pick<TodolistApi, 'id' | 'title'>
