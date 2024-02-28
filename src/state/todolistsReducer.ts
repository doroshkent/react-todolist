import { todolistsApi, TodolistType } from "api/todolists-api";
import { AppActionsType, AppThunkType } from "state/store";

const initialState: TodoListStateType = []

export function todolistsReducer(state = initialState,
                                 action: AppActionsType): TodoListStateType {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.map( tl => {
        return { ...tl, filter: "all" }
      } )
    case "REMOVE-TODOLIST":
      return state.filter( (tl) => tl.id !== action.id );
    case "RENAME-TODOLIST":
      return state.map( (tl) => tl.id === action.id ? { ...tl, title: action.title } : tl );
    case "ADD-TODOLIST":
      const newTodolist: TodolistDomainType = {
        ...action.todolist,
        filter: "all"
      }
      return [ newTodolist, ...state ]
    case "CHANGE-FILTER":
      return state.map( (tl) => tl.id === action.id ? { ...tl, filter: action.filter } : tl );
    default:
      return state;
  }
}

// actions
export const removeTodolistAC = (id: string) => ({ type: "REMOVE-TODOLIST", id } as const)
export const renameTodolistAC = (id: string, title: string) => ({ type: "RENAME-TODOLIST", id, title } as const)
export const addTodolistAC = (todolist: TodolistType) => ({ type: "ADD-TODOLIST", todolist } as const)
export const changeFilterAC = (id: string, filter: FilterValuesType) => ({ type: "CHANGE-FILTER", id, filter } as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({ type: "SET-TODOLISTS", todolists } as const)

// thunks
export const getTodolists = (): AppThunkType => async dispatch => {
  const res = await todolistsApi.getTodolists();
  dispatch( setTodolistsAC( res.data ) );
}
export const addTodolistTC = (title: string): AppThunkType => async dispatch => {
  const res = await todolistsApi.createTodolist( title );
  dispatch( addTodolistAC( res.data.data.item ) );
}
export const removeTodolistTC = (todolistId: string): AppThunkType => async dispatch => {
  await todolistsApi.deleteTodolist( todolistId );
  dispatch( removeTodolistAC( todolistId ) );
}
export const renameTodolistTC = (todolistsId: string, newTitle: string): AppThunkType => async dispatch => {
  await todolistsApi.updateTodolistTitle( todolistsId, newTitle );
  dispatch( renameTodolistAC( todolistsId, newTitle ) );
}

//types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}
export type TodoListStateType = TodolistDomainType[]
export type TodolistsActionsType =
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof renameTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof setTodolistsAC>
