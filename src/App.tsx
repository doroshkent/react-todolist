import React, { useState } from "react";
import { AppWrapper } from "styles/global/AppWrapper";
import "./App.css";
import { TaskType, ToDoList } from "./components/ToDoList";
import { v4 } from "uuid";
import { AddItemForm } from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

interface TasksStateType {
  [key: string]: TaskType[]
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

  const addTodoList = (title: string) => {
    const todoList: TodoListType = {
      id: v4(),
      title: title,
      filter: "all",
    }
    setTodoLists([todoList, ...todoLists]);
    setTasks({
      ...tasksObj,
      [todoList.id]: [],
    })
  }

  const removeTask = (taskId: string, todoListId: string) => {
    const tasks = tasksObj[todoListId];
    const filteredTasks = tasks.filter((t) => t.id !== taskId);
    tasksObj[todoListId] = filteredTasks;
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

  return (
    <AppWrapper>
      <AddItemForm addItem={addTodoList} />
      {todoLists.map((tl) => {
        let tasksForTodoList = tasksObj[tl.id];
        if (tl.filter === "active") {
          tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone);
        }
        if (tl.filter === "completed") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone);
        }
        return (
          <ToDoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            filterTasks={changeFilter}
            addTask={addTask}
            changeTaskProgress={changeTaskProgress}
            filter={tl.filter}
            removeTodoList={removeTodoList}
          />
        );
      })}
    </AppWrapper>
  );
}

export default App;
