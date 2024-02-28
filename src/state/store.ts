import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { TodolistsActionsType, todolistsReducer } from "state/todolistsReducer";
import { TasksActionsType, tasksReducer } from "state/tasksReducer";
import { thunk, ThunkAction } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers( {
  todolists: todolistsReducer,
  tasks: tasksReducer
} )

export const store = legacy_createStore( rootReducer, undefined, applyMiddleware( thunk ) )
export const useAppDispatch = useDispatch<AppDispatchType>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// types
export type AppRootStateType = ReturnType<typeof rootReducer>
type AppDispatchType = typeof store.dispatch
export type AppActionsType = TodolistsActionsType | TasksActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
