import { todolistsApi, TodolistType } from "api/todolists-api";
import { ActionsType, AppThunkType } from "state/store";
import { RequestStatusType, setRequestStatusAC } from "state/appReducer";

const initialState: TodoListStateType = []

export function todolistsReducer(state = initialState,
                                 action: ActionsType): TodoListStateType {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.map( tl => {
        return { ...tl, filter: "all", entityStatus: "idle" }
      } )
    case "REMOVE-TODOLIST":
      return state.filter( (tl) => tl.id !== action.id );
    case "RENAME-TODOLIST":
      return state.map( (tl) => tl.id === action.id ? { ...tl, title: action.title } : tl );
    case "ADD-TODOLIST":
      const newTodolist: TodolistDomainType = {
        ...action.todolist,
        filter: "all",
        entityStatus: "idle"
      }
      return [ newTodolist, ...state ]
    case "CHANGE-FILTER":
      return state.map( (tl) => tl.id === action.id ? { ...tl, filter: action.filter } : tl );
    case "CHANGE-ENTITY-STATUS":
      return state.map( tl => tl.id === action.id ? { ...tl, entityStatus: action.status } : tl );
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
export const changeEntityStatusAC = (id: string, status: RequestStatusType) =>
  ({ type: "CHANGE-ENTITY-STATUS", id, status } as const)

// thunks
export const getTodolists = (): AppThunkType => async dispatch => {
  const res = await todolistsApi.getTodolists();
  dispatch( setTodolistsAC( res.data ) );
  dispatch( setRequestStatusAC( "succeeded" ) )
}
export const addTodolistTC = (title: string): AppThunkType => async dispatch => {
  dispatch(setRequestStatusAC("loading"))
  const res = await todolistsApi.createTodolist( title );
  dispatch( addTodolistAC( res.data.data.item ) );
  dispatch(setRequestStatusAC("succeeded"))
}
export const removeTodolistTC = (todolistId: string): AppThunkType => async dispatch => {
  dispatch(changeEntityStatusAC(todolistId, "loading"));
  await todolistsApi.deleteTodolist( todolistId );
  dispatch( removeTodolistAC( todolistId ) );
  dispatch(changeEntityStatusAC(todolistId, "succeeded"));
}
export const renameTodolistTC = (todolistsId: string, newTitle: string): AppThunkType => async dispatch => {
  await todolistsApi.updateTodolistTitle( todolistsId, newTitle );
  dispatch( renameTodolistAC( todolistsId, newTitle ) );
}

//types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
export type TodoListStateType = TodolistDomainType[]
export type TodolistsActionsType =
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof renameTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof changeEntityStatusAC>
