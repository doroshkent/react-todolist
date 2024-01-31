import { combineReducers, legacy_createStore } from "redux";
import { todolistsReducer } from "state/todolistsReducer";
import { tasksReducer } from "state/tasksReducer";

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer)
