import { v4 } from "uuid";
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

export function todolistsReducer(state: TodoListStateType = initialState,
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
      const newTodoList: TodolistDomainType = {
        id: action.todolistId,
        title: action.title,
        filter: "all",
        order: 0,
        addedDate: new Date()
      };
      return [ newTodoList, ...state ];
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
export const addTodolistAC = (title: string) => (
  { type: "ADD-TODOLIST", todolistId: v4(), title } as const
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
