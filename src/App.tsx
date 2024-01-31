import React from "react";
import "./App.css";
import { ToDoList } from "components/ToDoList";
import { Box, Container, Grid, } from "@mui/material";
import { Header } from "widgets/header/Header";
import {
  addTodolistAC,
  changeFilterAC,
  removeTodolistAC,
  renameTodolistAC,
  TodoListStateType
} from "state/todolistsReducer";
import { addTaskAC, changeTaskProgressAC, removeTaskAC, renameTaskAC, TasksStateType } from "state/tasksReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type ItemsType = "To-do list" | "task";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, TodoListStateType>( state => state.todolists )
  const tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks )

  const removeTodoList = (todoListId: string) => {
    dispatch( removeTodolistAC( todoListId ) );
  };

  const renameTodoList = (todoListId: string, newTitle: string) => {
    dispatch( renameTodolistAC( todoListId, newTitle ) );
  };

  const addTodoList = (title: string) => {
    dispatch( addTodolistAC( title ) );
  };

  const changeFilter = (todoListId: string, value: FilterValuesType) => {
    dispatch( changeFilterAC( todoListId, value ) );
  };

  const removeTask = (todoListId: string, taskId: string) => {
    dispatch( removeTaskAC( todoListId, taskId ) );
  };

  const addTask = (todoListId: string, title: string) => {
    dispatch( addTaskAC( todoListId, title ) );
  };

  const changeTaskProgress = (todoListId: string,
                              taskId: string,
                              isDone: boolean) => {
    dispatch( changeTaskProgressAC( todoListId, taskId, isDone ) );
  }

  const renameTask = (todoListId: string, taskId: string, newTitle: string) => {
    dispatch( renameTaskAC( todoListId, taskId, newTitle ) );
  };
  return (
    <Box width={ "100%" } minHeight="100vh" sx={ { backgroundColor: "#f5f5f5" } }>
      <Header addTodoList={ addTodoList } />
      <Container maxWidth={ "xl" } sx={ { marginTop: "15px" } }>
        { todolists.length > 0
          ? <Grid container spacing={ 2 }>
            { todolists.map( (tl) => {
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
