import React from 'react'
import { Provider } from 'react-redux';
import { combineReducers, legacy_createStore } from "redux";
import { v1 } from "uuid";
import { tasksReducer } from "state/tasksReducer";
import { todolistsReducer } from "state/todolistsReducer";
import { AppRootStateType } from "state/store";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
})

const initialGlobalState: AppRootStateType = {
  todolists: [
    {id: "todolistId1", title: "What to learn", filter: "all", addedDate: new Date(), order: 0},
    {id: "todolistId2", title: "What to buy", filter: "all", addedDate: new Date(), order: 0}
  ] ,
  tasks: {
    ["todolistId1"]: [
      {id: "task1_1", title: "HTML&CSS", isDone: false},
      {id: "task1_2", title: "JS", isDone: true}
    ],
    ["todolistId2"]: [
      {id: v1(), title: "Milk", isDone: false},
      {id: v1(), title: "React Book", isDone: true}
    ]
  }
};


// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
