import axios from "axios";

//types
type TodolistType = {
  id: string
  addedDate: Date
  order: number
  title: string
}

export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}

//api
const instance = axios.create( {
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true
} )

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>( 'todo-lists' )
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{item: TodolistType}>>( 'todo-lists', { title } )
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>( `todo-lists/${ todolistId }` )
  },
  updateTodolistTitle(todolistId: string, title: string) {
    return instance.put<ResponseType>( `todo-lists/${ todolistId }`, {title} )
  }
}
