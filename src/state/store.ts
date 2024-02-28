import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { TodolistsActionsType, todolistsReducer } from "state/todolistsReducer";
import { TasksActionsType, tasksReducer } from "state/tasksReducer";
import { thunk, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


const rootReducer = combineReducers( {
  todolists: todolistsReducer,
  tasks: tasksReducer
} )

export const store = legacy_createStore( rootReducer, applyMiddleware( thunk ) )
export const useAppDispatch = useDispatch<AppDispatchType>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// types

export type AppRootStateType = ReturnType<typeof rootReducer>
type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppActionsType = TodolistsActionsType | TasksActionsType
