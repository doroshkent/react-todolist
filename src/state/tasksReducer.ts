import { TasksStateType } from "App";
import { v4 } from "uuid";
import { TaskType } from "components/ToDoList";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from "./todolistsReducer";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

type RenameTaskActionType = ReturnType<typeof renameTaskAC>

type AddTaskActionType = ReturnType<typeof addTaskAC>

type ChangeTaskProgressActionType = ReturnType<typeof changeTaskProgressAC>

type ActionsType =
  | RemoveTaskActionType
  | RenameTaskActionType
  | AddTaskActionType
  | ChangeTaskProgressActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

export function tasksReducer(state: TasksStateType,
                             action: ActionsType): TasksStateType {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todolistId]:
          state[action.todolistId].filter(
            (task) => task.id !== action.taskId
          ),
      };
    }
    case "RENAME-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map( (task) =>
          task.id === action.taskId ? { ...task, title: action.title } : task
        ),
      };
    }
    case "ADD-TASK": {
      const newTask: TaskType = {
        id: v4(),
        title: action.title,
        isDone: false,
      };
      if (!!state[action.todolistId]?.length) {
        return {
          ...state,
          [action.todolistId]: [ newTask, ...state[action.todolistId] ]
        }
      }

      return {
        ...state,
        [action.todolistId]: [ newTask ],
      };
    }
    case "CHANGE-TASK-PROGRESS": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map( (task) =>
          task.id === action.taskId ? { ...task, isDone: action.isDone } : task
        ),
      };
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todolistId]: [],
      };
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }
    default:
      return state;
  }
}

export const removeTaskAC = (todolistId: string, taskId: string,) => {
  return { type: "REMOVE-TASK", todolistId, taskId } as const;
};
export const renameTaskAC = (todolistId: string, taskId: string, title: string) => {
  return { type: "RENAME-TASK", todolistId, taskId, title } as const;
};
export const addTaskAC = (todolistId: string, title: string) => {
  return { type: "ADD-TASK", todolistId, title } as const;
};
export const changeTaskProgressAC = (todolistId: string,
                                     taskId: string,
                                     isDone: boolean) => {
  return { type: "CHANGE-TASK-PROGRESS", todolistId, taskId, isDone } as const;
};
