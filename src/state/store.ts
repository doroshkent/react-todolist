import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { todolistsReducer } from "state/todolistsReducer";
import { tasksReducer } from "state/tasksReducer";
import { thunk, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


const rootReducer = combineReducers( {
  todolists: todolistsReducer,
  tasks: tasksReducer
} )

export const store = legacy_createStore( rootReducer, applyMiddleware( thunk ) )

export type AppRootStateType = ReturnType<typeof rootReducer>

type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = useDispatch<AppDispatchType>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
