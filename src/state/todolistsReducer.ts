import { todolistsApi, TodolistType } from "api/todolists-api";
import { Dispatch } from "redux";

//types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}
export type TodoListStateType = TodolistDomainType[]

// action types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type RenameTodolistActionType = ReturnType<typeof renameTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeFilterActionType = ReturnType<typeof changeFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
  | RemoveTodolistActionType
  | RenameTodolistActionType
  | AddTodolistActionType
  | ChangeFilterActionType
  | SetTodolistsActionType

//reducer
const initialState: TodoListStateType = []

export function todolistsReducer(state = initialState,
                                 action: ActionsType): TodoListStateType {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map( tl => {
        return { ...tl, filter: "all" }
      } )
    }
    case "REMOVE-TODOLIST": {
      return state.filter( (tl) => tl.id !== action.id );
    }
    case "RENAME-TODOLIST": {
      return state.map( (todolist) =>
        todolist.id === action.id
          ? { ...todolist, title: action.title }
          : todolist
      );
    }
    case "ADD-TODOLIST": {
      const newTodolist: TodolistDomainType = {
        ...action.todolist,
        filter: "all"
      }
      return [
        newTodolist,
        ...state
      ]
    }
    case "CHANGE-FILTER": {
      return state.map( (todolist) =>
        todolist.id === action.id
          ? { ...todolist, filter: action.filter }
          : todolist
      );
    }
    default:
      return state;
  }
}

// action creators
export const removeTodolistAC = (id: string) => (
  { type: "REMOVE-TODOLIST", id } as const
);
export const renameTodolistAC = (id: string, title: string) => (
  { type: "RENAME-TODOLIST", id, title } as const
);
export const addTodolistAC = (todolist: TodolistType) => (
  { type: "ADD-TODOLIST", todolist } as const
);
export const changeFilterAC = (id: string, filter: FilterValuesType) => (
  { type: "CHANGE-FILTER", id, filter } as const
);
export const setTodolistsAC = (todolists: TodolistType[]) => (
  { type: "SET-TODOLISTS", todolists } as const
);

//thunk creators
export const getTodolists = () => (dispatch: Dispatch) => {
  todolistsApi.getTodolists()
    .then( res => {
      dispatch( setTodolistsAC( res.data ) )
    } );
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  todolistsApi.createTodolist( title )
    .then( res => {
      dispatch( addTodolistAC( res.data.data.item ) )
    } );
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
  todolistsApi.deleteTodolist( todolistId )
    .then( res => {
      dispatch( removeTodolistAC( todolistId ) )
    } );
}
export const renameTodolistTC = (todolistsId: string, newTitle: string) => (dispatch: Dispatch) => {
  todolistsApi.updateTodolistTitle( todolistsId, newTitle )
    .then( res => {
      dispatch( renameTodolistAC( todolistsId, newTitle ) )
    } );
}
