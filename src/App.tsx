import React, { useReducer } from "react";
import "./App.css";
import { TaskType, ToDoList } from "components/ToDoList";
import { v4 } from "uuid";
import { Box, Container, Grid, } from "@mui/material";
import { Header } from "widgets/header/Header";
import {
  addTodolistAC,
  changeFilterAC,
  removeTodolistAC,
  renameTodolistAC,
  todolistsReducer
} from "state/todolistsReducer";
import { addTaskAC, changeTaskProgressAC, removeTaskAC, renameTaskAC, tasksReducer } from "state/tasksReducer";

export type FilterValuesType = "all" | "active" | "completed";
export type ItemsType = "To-do list" | "task";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export interface TasksStateType {
  [key: string]: TaskType[];
}

function App() {
  let todoListId1 = v4();
  let todoListId2 = v4();

  const [ todoLists, dispatchToTodolists ] = useReducer( todolistsReducer, [
    { id: todoListId1, title: "To learn", filter: "all" },
    { id: todoListId2, title: "To buy", filter: "all" },
  ] );
  const [ tasks, dispatchToTasks ] = useReducer( tasksReducer, {
    [todoListId1]: [
      { id: v4(), title: "HTML&CSS", isDone: true },
      { id: v4(), title: "JS", isDone: true },
      { id: v4(), title: "React", isDone: false },
      { id: v4(), title: "Redux", isDone: false },
    ],
    [todoListId2]: [
      { id: v4(), title: "milk", isDone: true },
      { id: v4(), title: "book", isDone: true },
      { id: v4(), title: "freedom", isDone: false },
    ],
  } );

  const removeTodoList = (todoListId: string) => {
    dispatchToTodolists( removeTodolistAC( todoListId ) );
    dispatchToTasks( removeTodolistAC( todoListId ) );
  };

  const renameTodoList = (todoListId: string, newTitle: string) => {
    dispatchToTodolists( renameTodolistAC( todoListId, newTitle ) );
  };

  const addTodoList = (title: string) => {
    dispatchToTasks( addTodolistAC( title ) );
    dispatchToTodolists( addTodolistAC( title ) );
  };

  const changeFilter = (todoListId: string, value: FilterValuesType) => {
    dispatchToTodolists( changeFilterAC( todoListId, value ) );
  };

  const removeTask = (todoListId: string, taskId: string) => {
    dispatchToTasks( removeTaskAC( todoListId, taskId ) );
  };

  const addTask = (todoListId: string, title: string) => {
    dispatchToTasks( addTaskAC( todoListId, title ) );
  };

  const changeTaskProgress = (todoListId: string,
                              taskId: string,
                              isDone: boolean) => {
    dispatchToTasks( changeTaskProgressAC( todoListId, taskId, isDone ) );
  }

  const renameTask = (todoListId: string, taskId: string, newTitle: string) => {
    dispatchToTasks( renameTaskAC( todoListId, taskId, newTitle ) );
  };

  return (
    <Box width={ "100%" } minHeight="100vh" sx={ { backgroundColor: "#f5f5f5" } }>
      <Header addTodoList={ addTodoList } />
      <Container maxWidth={ "xl" } sx={ { marginTop: "15px" } }>
        { todoLists.length > 0
          ? <Grid container spacing={ 2 }>
            { todoLists.map( (tl) => {
              return (
                <Grid item xs={ 3 } key={ tl.id }>
                  <ToDoList
                    id={ tl.id }
                    title={ tl.title }
                    tasks={ tasks[tl.id] }
                    removeTask={ removeTask }
                    filterTasks={ changeFilter }
                    addTask={ addTask }
                    changeTaskProgress={ changeTaskProgress }
                    renameTask={ renameTask }
                    filter={ tl.filter }
                    removeTodoList={ removeTodoList }
                    renameTodoList={ renameTodoList }
                  />
                </Grid>
              );
            } ) }
          </Grid>
          : <p style={ { fontStyle: "italic", opacity: "0.5", textAlign: "center" } }>You have no todolists yet</p> }
      </Container>
    </Box>
  );
}

export default App;
