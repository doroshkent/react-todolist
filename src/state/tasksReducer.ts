import { v4 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType, } from "./todolistsReducer";
import { TaskPriorities, TaskStatuses, TaskType, todolistsApi } from "api/todolists-api";
import { Dispatch } from "redux";

export type TasksStateType = {
  [key: string]: TaskType[];
}

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type RenameTaskActionType = ReturnType<typeof renameTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskProgressActionType = ReturnType<typeof changeTaskProgressAC>
type SetTasksActionType = ReturnType<typeof setTasksAC>

type ActionsType =
  | RemoveTaskActionType
  | RenameTaskActionType
  | AddTaskActionType
  | ChangeTaskProgressActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType

const initialState: TasksStateType = {}

export function tasksReducer(state: TasksStateType = initialState,
                             action: ActionsType): TasksStateType {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.reduce( (acc, tl) => {
        acc[tl.id] = [];
        return acc;
      }, { ...state } );
    }
    case "SET-TASKS": {
      return {
        ...state,
        [action.todolistId]: action.tasks
      };
    }
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
        status: TaskStatuses.New,
        todoListId: action.todolistId,
        addedDate: "",
        order: 0,
        deadline: null,
        description: "",
        priority: TaskPriorities.Low,
        startDate: null
      };
      return {
        ...state,
        [action.todolistId]: [ newTask, ...state[action.todolistId] ]
      }
    }
    case "CHANGE-TASK-PROGRESS": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map( (task) =>
          task.id === action.taskId ? { ...task, status: action.status } : task
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

//action creators
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
                                     status: TaskStatuses) => {
  return { type: "CHANGE-TASK-PROGRESS", todolistId, taskId, status } as const;
};
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
  type: "SET-TASKS",
  todolistId,
  tasks
} as const)

// thunk creators
export const getTasks = (todolistId: string) => (dispatch: Dispatch) => {
  todolistsApi.getTasks( todolistId )
    .then( res => {
      dispatch( setTasksAC( todolistId, res.data.items ) );
    } );
}
