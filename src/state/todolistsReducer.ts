import { v4 } from "uuid";
import { TodolistType } from "api/todolists-api";

//types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}
export type TodoListStateType = TodolistDomainType[]

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

type RenameTodolistActionType = ReturnType<typeof renameTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

type ChangeFilterActionType = ReturnType<typeof changeFilterAC>

type ActionsType =
  | RemoveTodolistActionType
  | RenameTodolistActionType
  | AddTodolistActionType
  | ChangeFilterActionType

//reducer
const initialState: TodoListStateType = []

export function todolistsReducer(state: TodoListStateType = initialState,
                                 action: ActionsType): TodoListStateType {
  switch (action.type) {
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

export const removeTodolistAC = (id: string) => {
  return { type: "REMOVE-TODOLIST", id } as const;
};
export const renameTodolistAC = (id: string, title: string) => {
  return { type: "RENAME-TODOLIST", id, title } as const;
};
export const addTodolistAC = (title: string) => {
  return { type: "ADD-TODOLIST", todolistId: v4(), title } as const;
};
export const changeFilterAC = (id: string, filter: FilterValuesType) => {
  return { type: "CHANGE-FILTER", id, filter } as const;
};
