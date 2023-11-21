import React, { useState } from "react";
import { AppWrapper } from "styles/global/AppWrapper";
import "./App.css";
import { TaskType, ToDoList } from "./components/ToDoList";
import { v4 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v4(), title: "HTML&CSS", isDone: true },
    { id: v4(), title: "JS", isDone: true },
    { id: v4(), title: "React", isDone: false },
    { id: v4(), title: "Redux", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>("all");

  const removeTask = (id: string) => setTasks(tasks.filter((t) => t.id !== id));

  const changeFilter = (value: FilterValuesType) => setFilter(value);

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v4(),
      title: title,
      isDone: false,
    };
    setTasks([newTask, ...tasks]);
  };

  let tasksForTodoList = tasks;
  if (filter === "active") {
    tasksForTodoList = tasks.filter((t) => !t.isDone);
  }
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((t) => t.isDone);
  }

  return (
    <AppWrapper>
      <ToDoList
        title="To Learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        filterTasks={changeFilter}
        addTask={addTask}
      />
    </AppWrapper>
  );
}

export default App;
