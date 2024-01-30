import { FilterValuesType, TodoListType } from "App";
import { v4 } from "uuid";

type TodoListStateType = TodoListType[]

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

type RenameTodolistActionType = ReturnType<typeof renameTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

type ChangeFilterActionType = ReturnType<typeof changeFilterAC>

type ActionsType =
  | RemoveTodolistActionType
  | RenameTodolistActionType
  | AddTodolistActionType
  | ChangeFilterActionType

export function todolistsReducer(
  state: TodoListStateType,
  action: ActionsType
): TodoListStateType {
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
      const todoList: TodoListType = {
        id: action.todolistId,
        title: action.title,
        filter: "all",
      };
      return [ todoList, ...state ];
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
