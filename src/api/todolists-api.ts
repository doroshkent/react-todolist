import axios from "axios";

//types
export type TodolistType = {
  id: string
  addedDate: Date
  order: number
  title: string
}
export type TaskType = {
  todoListId: string
  id: string
  title: string
  status: number
  addedDate: Date
  deadline: null
  description: null
  order: number
  priority: number
  startDate: null
}
export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}
type GetTasksResponseType = {
  error: string | null
  totalCount: number
  items: TaskType[]
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
    return instance.post<ResponseType<{ item: TodolistType }>>( 'todo-lists', { title } )
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>( `todo-lists/${ todolistId }` )
  },
  updateTodolistTitle(todolistId: string, title: string) {
    return instance.put<ResponseType>( `todo-lists/${ todolistId }`, { title } )
  },

  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>( `todo-lists/${ todolistId }/tasks` )
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>( `todo-lists/${ todolistId }/tasks`, { title } )
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>( `/todo-lists/${ todolistId }/tasks/${ taskId }` )
  },
  updateTask(todolistId: string, taskId: string, title: string) {
    return instance.put<ResponseType<{ item: TaskType }>>( `/todo-lists/${ todolistId }/tasks/${ taskId }`, { title } )
  },
}
