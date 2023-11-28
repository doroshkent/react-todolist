import {FilterValuesType, TodoListType} from "../App";
import {v4} from "uuid";

type TodoListStateType = TodoListType[];

type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string
}

type RenameTodolistActionType = {
  type: "RENAME-TODOLIST";
  id: string;
  title: string
}

type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
}

type ChangeFilterActionType = {
  type: "CHANGE-FILTER";
  id: string;
  filter: FilterValuesType;
}

type ActionsType = RemoveTodolistActionType | RenameTodolistActionType | AddTodolistActionType | ChangeFilterActionType

export function todolistReducer(state: TodoListStateType, action: ActionsType): TodoListStateType {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter(tl => tl.id !== action.id)
    }
    case "RENAME-TODOLIST": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state]
    }
    case "ADD-TODOLIST": {
      const todoList: TodoListType = {
        id: v4(),
        title: action.title,
        filter: "all",
      }
      return [...state, todoList]
    }
    case "CHANGE-FILTER": {
      const todoList = state.find((tl) => tl.id === action.id);
      if (todoList) {
        todoList.filter = action.filter;
      }
      return [...state]
    }
    default:
      throw new Error("no idea what you want from me");
  }
}

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: id}
}
export const renameTodolistAC = (id: string, title: string): RenameTodolistActionType => {
  return { type: "RENAME-TODOLIST", id: id, title: title }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {type: "ADD-TODOLIST", title: title}
}
export const changeFilterAC = (id: string, filter: FilterValuesType): ChangeFilterActionType => {
  return {type: "CHANGE-FILTER", id: id, filter: filter}
}
