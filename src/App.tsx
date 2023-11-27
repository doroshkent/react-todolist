import React, { useState } from "react";
import "./App.css";
import { TaskType, ToDoList } from "./components/ToDoList";
import { v4 } from "uuid";
import { AddItemForm } from "./components/AddItemForm";
import LoginIcon from "@mui/icons-material/Login";
import {
  AppBar,
  Box,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

export type FilterValuesType = "all" | "active" | "completed";
export type ItemsType = "To-do list" | "task";

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

interface TasksStateType {
  [key: string]: TaskType[];
}

function App() {
  let todoListId1 = v4();
  let todoListId2 = v4();

  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    { id: todoListId1, title: "To learn", filter: "all" },
    { id: todoListId2, title: "To buy", filter: "all" },
  ]);
  const [tasksObj, setTasks] = useState<TasksStateType>({
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
  });

  const removeTodoList = (todoListId: string) => {
    const filteredTodoLists = todoLists.filter((tl) => tl.id !== todoListId);
    setTodoLists([...filteredTodoLists]);
    delete tasksObj[todoListId];
    setTasks({ ...tasksObj });
  };
  const renameTodoList = (todoListId: string, newTitle: string) => {
    const todolist = todoLists.find((tl) => tl.id === todoListId);
    if (todolist) {
      todolist.title = newTitle;
      setTodoLists([...todoLists]);
    }
  };

  const addTodoList = (title: string) => {
    const todoList: TodoListType = {
      id: v4(),
      title: title,
      filter: "all",
    };
    setTodoLists([todoList, ...todoLists]);
    setTasks({
      ...tasksObj,
      [todoList.id]: [],
    });
  };

  const removeTask = (taskId: string, todoListId: string) => {
    const tasks = tasksObj[todoListId];
    tasksObj[todoListId] = tasks.filter((t) => t.id !== taskId);
    setTasks({ ...tasksObj });
  };

  const changeFilter = (value: FilterValuesType, todoListId: string) => {
    const todoList = todoLists.find((tl) => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  };

  const addTask = (title: string, todoListId: string) => {
    const tasks = tasksObj[todoListId];
    const newTask: TaskType = {
      id: v4(),
      title: title,
      isDone: false,
    };
    tasksObj[todoListId] = [newTask, ...tasks];
    setTasks({ ...tasksObj });
  };

  const changeTaskProgress = (
    id: string,
    isDone: boolean,
    todoListId: string
  ) => {
    const tasks = tasksObj[todoListId];
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  };
  const renameTask = (id: string, newTitle: string, todoListId: string) => {
    const tasks = tasksObj[todoListId];
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasksObj });
    }
  };

  return (
    <Box width={"100%"} minHeight="100vh" sx={{ backgroundColor: "#f5f5f5" }}>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid>
              <AddItemForm addItem={addTodoList} item="To-do list" />
            </Grid>
            <Grid>
              <Typography variant="h4" component="div" marginLeft={"auto"}>
                Tasks Board
              </Typography>
            </Grid>
            <Grid>
              <IconButton color="inherit" sx={{ marginLeft: "auto" }}>
                <LoginIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container maxWidth={"xl"} sx={{ marginTop: "15px" }}>
        <Grid container spacing={2}>
          {todoLists.map((tl) => {
            let tasksForTodoList = tasksObj[tl.id];
            if (tl.filter === "active") {
              tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone);
            }
            if (tl.filter === "completed") {
              tasksForTodoList = tasksForTodoList.filter((t) => t.isDone);
            }
            return (
              <Grid item xs={3}>
                <ToDoList
                  key={tl.id}
                  id={tl.id}
                  title={tl.title}
                  tasks={tasksForTodoList}
                  removeTask={removeTask}
                  filterTasks={changeFilter}
                  addTask={addTask}
                  changeTaskProgress={changeTaskProgress}
                  renameTask={renameTask}
                  filter={tl.filter}
                  removeTodoList={removeTodoList}
                  renameTodoList={renameTodoList}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
