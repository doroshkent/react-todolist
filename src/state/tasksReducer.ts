import { TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskModelType } from "api/todolists-api";
import { AppActionsType, AppRootStateType, AppThunkType } from "state/store";

const initialState: TasksStateType = {}

export function tasksReducer(state: TasksStateType = initialState,
                             action: AppActionsType): TasksStateType {
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
  const res = await todolistsApi.getTasks( todolistId );
  dispatch( setTasksAC( todolistId, res.data.items ) );
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunkType => async dispatch => {
  await todolistsApi.deleteTask( todolistId, taskId );
  dispatch( removeTaskAC( todolistId, taskId ) );
}
export const addTaskTC = (todolistId: string, title: string): AppThunkType => async dispatch => {
  const res = await todolistsApi.createTask( todolistId, title );
  dispatch( addTaskAC( todolistId, res.data.data.item ) );
}
export const updateTaskTC = (todolistId: string, taskId: string, payload: UpdateTaskDomainModelType): AppThunkType =>
  async (dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find( t => t.id === taskId );
    if (task) {
      const model: UpdateTaskModelType = {
        ...task,
        ...payload
      }
      const res = await todolistsApi.updateTask( todolistId, taskId, model );
      dispatch( updateTaskAC( todolistId, res.data.data.item ) );
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
