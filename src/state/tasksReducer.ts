import {FilterValuesType, TasksStateType, TodoListType} from "../App";
import {v4} from "uuid";
import {TaskType} from "../components/ToDoList";

type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  taskId: string;
  todolistId: string;
};

type RenameTaskActionType = {
  type: "RENAME-TASK";
  taskId: string;
  todolistId: string;
  title: string;
};

type AddTaskActionType = {
  type: "ADD-TASK";
  todolistId: string;
  title: string;
};

type ChangeTaskProgressActionType = {
  type: "CHANGE-TASK-PROGRESS";
  taskId: string;
  todolistId: string;
  isDone: boolean;
};

type ActionsType =
  | RemoveTaskActionType
  | RenameTaskActionType
  | AddTaskActionType
  | ChangeTaskProgressActionType;

export function tasksReducer(
  state: TasksStateType,
  action: ActionsType
): TasksStateType {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todolistId]: [
          ...state[action.todolistId].filter(task => task.id !== action.taskId)
        ]
      }
    }
    case "RENAME-TASK": {
      const updatedTodoList = state[action.todolistId].map(task =>
        task.id === action.taskId ? { ...task, title: action.title } : task
      );
      return {
        ...state,
        [action.todolistId]: updatedTodoList,
      };
    }
    case "ADD-TASK": {
      const newTask: TaskType = {
        id: v4(),
        title: action.title,
        isDone: false,
      };
      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]]
      };
    }
    case "CHANGE-TASK-PROGRESS": {
      const updatedTodoList = state[action.todolistId].map(task =>
        task.id === action.taskId ? { ...task, isDone: action.isDone } : task
      );
      return {
        ...state,
        [action.todolistId]: updatedTodoList,
      };
    }
    default:
      return state;
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {type: "REMOVE-TASK", taskId, todolistId};
};
export const renameTaskAC = (
  taskId: string,
  todolistId: string,
  title: string
): RenameTaskActionType => {
  return {type: "RENAME-TASK", taskId, todolistId, title};
};
export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
  return { type: "ADD-TASK", todolistId, title };
};
export const changeTaskProgressAC = (
  taskId: string,
  todolistId: string,
  isDone: boolean
): ChangeTaskProgressActionType => {
  return { type: "CHANGE-TASK-PROGRESS", taskId, todolistId, isDone };
};
