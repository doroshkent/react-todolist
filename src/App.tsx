import React, { useState } from "react";
import "./App.css";
import { TaskType, ToDoList } from "components/ToDoList";
import { v4 } from "uuid";
import { Box, Container, Grid, } from "@mui/material";
import { Header } from "widgets/header/Header";

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

  const [ todoLists, setTodoLists ] = useState<TodoListType[]>( [
    { id: todoListId1, title: "To learn", filter: "all" },
    { id: todoListId2, title: "To buy", filter: "all" },
  ] );
  const [ tasksObj, setTasks ] = useState<TasksStateType>( {
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
    const filteredTodoLists = todoLists.filter( (tl) => tl.id !== todoListId );
    setTodoLists( [ ...filteredTodoLists ] );
    delete tasksObj[todoListId];
    setTasks( { ...tasksObj } );
  };

  const renameTodoList = (todoListId: string, newTitle: string) => {
    const todolist = todoLists.find( (tl) => tl.id === todoListId );
    if (todolist) {
      todolist.title = newTitle;
      setTodoLists( [ ...todoLists ] );
    }
  };

  const addTodoList = (title: string) => {
    const todoList: TodoListType = {
      id: v4(),
      title: title,
      filter: "all",
    };
    setTodoLists( [ todoList, ...todoLists ] );
    setTasks( {
      ...tasksObj,
      [todoList.id]: [],
    } );
  };

  const changeFilter = (todoListId: string, value: FilterValuesType) => {
    const todoList = todoLists.find( (tl) => tl.id === todoListId );
    if (todoList) {
      todoList.filter = value;
      setTodoLists( [ ...todoLists ] );
    }
  };

  const removeTask = (todoListId: string, taskId: string) => {
    const tasks = tasksObj[todoListId];
    tasksObj[todoListId] = tasks.filter( (t) => t.id !== taskId );
    setTasks( { ...tasksObj } );
  };

  const addTask = (todoListId: string, title: string) => {
    const tasks = tasksObj[todoListId];
    const newTask: TaskType = {
      id: v4(),
      title: title,
      isDone: false,
    };
    tasksObj[todoListId] = [ newTask, ...tasks ];
    setTasks( { ...tasksObj } );
  };

  const changeTaskProgress = (
    todoListId: string,
    taskId: string,
    isDone: boolean
  ) => {
    const tasks = tasksObj[todoListId];
    const task = tasks.find( (t) => t.id === taskId );
    if (task) {
      task.isDone = isDone;
      setTasks( { ...tasksObj } );
    }
  };
  const renameTask = (todoListId: string, taskId: string, newTitle: string) => {
    const tasks = tasksObj[todoListId];
    const task = tasks.find( (t) => t.id === taskId );
    if (task) {
      task.title = newTitle;
      setTasks( { ...tasksObj } );
    }
  };

  return (
    <Box width={ "100%" } minHeight="100vh" sx={ { backgroundColor: "#f5f5f5" } }>
      <Header addTodoList={ addTodoList } />
      <Container maxWidth={ "xl" } sx={ { marginTop: "15px" } }>
        { todoLists.length > 0
          ? <Grid container spacing={ 2 }>
            { todoLists.map( (tl) => {
              const filteredTasks = () => {
                const tasksForTodoList: TaskType[] = tasksObj[tl.id];
                switch (tl.filter) {
                  case "active":
                    return tasksForTodoList.filter( (t) => !t.isDone );
                  case "completed":
                    return tasksForTodoList.filter( (t) => t.isDone );
                  default:
                    return tasksForTodoList
                }
              }
              return (
                <Grid item xs={ 3 }>
                  <ToDoList
                    key={ tl.id }
                    id={ tl.id }
                    title={ tl.title }
                    tasks={ filteredTasks() }
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
