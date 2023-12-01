import { FilterValuesType, TodoListType } from "../App";
import { v4 } from "uuid";

type TodoListStateType = TodoListType[];

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

type RenameTodolistActionType = {
  type: "RENAME-TODOLIST";
  id: string;
  title: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
};

type ChangeFilterActionType = {
  type: "CHANGE-FILTER";
  id: string;
  filter: FilterValuesType;
};

type ActionsType =
  | RemoveTodolistActionType
  | RenameTodolistActionType
  | AddTodolistActionType
  | ChangeFilterActionType;

export function todolistsReducer(
  state: TodoListStateType,
  action: ActionsType
): TodoListStateType {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "RENAME-TODOLIST": {
      return state.map((todolist) =>
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
      return [todoList, ...state];
    }
    case "CHANGE-FILTER": {
      return state.map((todolist) =>
        todolist.id === action.id
          ? { ...todolist, filter: action.filter }
          : todolist
      );
    }
    default:
      return state;
  }
}

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id };
};
export const renameTodolistAC = (
  id: string,
  title: string
): RenameTodolistActionType => {
  return { type: "RENAME-TODOLIST", id, title };
};
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title, todolistId: v4() };
};
export const changeFilterAC = (
  id: string,
  filter: FilterValuesType
): ChangeFilterActionType => {
  return { type: "CHANGE-FILTER", id, filter };
};
