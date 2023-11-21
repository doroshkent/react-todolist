import React, {useState} from 'react';
import {AppWrapper} from 'styles/global/AppWrapper';
import './App.css';
import {TaskType, ToDoList} from "./components/ToDoList";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false},
    {id: 4, title: "Redux", isDone: false},
  ]);
  const [filter, setFilter] = useState<FilterValuesType>("all")

  const removeTask = (id: number) => setTasks(tasks.filter(t => t.id !== id));

  const changeFilter = (value: FilterValuesType) => setFilter(value);

  let tasksForTodoList = tasks;
  if (filter === "active") {
    tasksForTodoList = tasks.filter( t => !t.isDone)
  }
  if (filter === "completed") {
    tasksForTodoList = tasks.filter( t => t.isDone)
  }

  return (
    <AppWrapper>
      <ToDoList title="To Learn" tasks={tasksForTodoList} removeTask={removeTask} filterTasks={changeFilter}/>
    </AppWrapper>
  );
}

export default App;
