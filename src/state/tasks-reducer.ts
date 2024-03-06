import {
  RESULT_CODE,
  ServerError,
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsApi,
  UpdateTaskModelType
} from "api/todolists-api";
import { ActionsType, AppRootStateType, AppThunkType } from "state/store";
import { setAppRequestStatusAC } from "state/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { AxiosError } from "axios";
import { setTodolistEntityStatusAC } from "state/todolists-reducer";

const initialState: TasksStateType = {}

export function tasksReducer(state: TasksStateType = initialState,
                             action: ActionsType): TasksStateType {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.reduce( (acc, tl) => {
        acc[tl.id] = [];
        return acc;
      }, { ...state } );
    case "SET-TASKS":
      return { ...state, [action.todolistId]: action.tasks };
    case "REMOVE-TASK":
      return {
        ...state, [action.todolistId]: state[action.todolistId].filter( t => t.id !== action.taskId ),
      };
    case "ADD-TASK":
      return { ...state, [action.todolistId]: [ action.task, ...state[action.todolistId] ] }
    case "UPDATE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map( t => t.id === action.task.id ? action.task : t )
      }
    case "ADD-TODOLIST":
      return { ...state, [action.todolist.id]: [] };
    case "REMOVE-TODOLIST":
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    default:
      return state;
  }
}

// actions
export const removeTaskAC = (todolistId: string, taskId: string,) =>
  ({ type: "REMOVE-TASK", todolistId, taskId } as const)
export const addTaskAC = (todolistId: string, task: TaskType) =>
  ({ type: "ADD-TASK", todolistId, task } as const);
export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
  ({ type: "SET-TASKS", todolistId, tasks } as const)
export const updateTaskAC = (todolistId: string, task: TaskType) =>
  ({ type: "UPDATE-TASK", todolistId, task } as const);

// thunks
export const getTasksTC = (todolistId: string): AppThunkType => async dispatch => {
  try {
    dispatch( setAppRequestStatusAC( "loading" ) );
    const res = await todolistsApi.getTasks( todolistId );
    dispatch( setTasksAC( todolistId, res.data.items ) );
    dispatch( setAppRequestStatusAC( "succeeded" ) );
  } catch (e) {
    handleServerNetworkError( (e as AxiosError<ServerError> | Error), dispatch )
  }
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunkType => async dispatch => {
  try {
    const res = await todolistsApi.deleteTask( todolistId, taskId );
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      dispatch( removeTaskAC( todolistId, taskId ) );
    } else {
      handleServerAppError( res.data, dispatch )
    }
  } catch (e) {
    handleServerNetworkError( (e as AxiosError<ServerError> | Error), dispatch )
  }
}
export const addTaskTC = (todolistId: string, title: string): AppThunkType => async dispatch => {
  dispatch(setTodolistEntityStatusAC(todolistId, "loading"));
  try {
    const res = await todolistsApi.createTask( todolistId, title );
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      dispatch( addTaskAC( todolistId, res.data.data.item ) );
      dispatch( setAppRequestStatusAC( "succeeded" ) )
      dispatch(setTodolistEntityStatusAC(todolistId, "succeeded"));
    } else {
      handleServerAppError( res.data, dispatch )
      dispatch(setTodolistEntityStatusAC(todolistId, "failed"));
    }
  } catch (e) {
    handleServerNetworkError( (e as AxiosError<ServerError> | Error), dispatch )
    dispatch(setTodolistEntityStatusAC(todolistId, "failed"));
  }
}
export const updateTaskTC = (todolistId: string, taskId: string, payload: UpdateTaskDomainModelType): AppThunkType =>
  async (dispatch, getState: () => AppRootStateType) => {
    try {
      const task = getState().tasks[todolistId].find( t => t.id === taskId );
      if (!task) {
        return
      }
      const model: UpdateTaskModelType = {
        title: task.title,
        status: task.status,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...payload
      }

      const res = await todolistsApi.updateTask( todolistId, taskId, model );
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch( updateTaskAC( todolistId, res.data.data.item ) );
        dispatch( setAppRequestStatusAC( "succeeded" ) )
      } else {
        handleServerAppError( res.data, dispatch )
      }
    } catch (e) {
      handleServerNetworkError( (e as AxiosError<ServerError> | Error), dispatch )
    }
  }

// types
export type TasksStateType = {
  [key: string]: TaskType[];
}
export type TasksActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof setTasksAC>
type UpdateTaskDomainModelType = {
  title?: string
  status?: TaskStatuses
  description?: string
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
