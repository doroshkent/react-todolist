import React from "react";
import {CardWrapper} from "styles/cards/CardWrapper";
import {TasksWrapper} from "styles/cards/TasksWrapper";
import {TaskWrapper} from "styles/cards/TaskWrapper";
import {FilterValuesType} from "../App";

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: number) => void
  filterTasks: (value: FilterValuesType) => void
}

export function ToDoList({title, tasks, removeTask, filterTasks}: PropsType) {
  return <CardWrapper>
    <h2>{title}</h2>
    <div>
      <input type="text"/>
      <button>+</button>
    </div>
    <TasksWrapper>
      {tasks.map(task => <TaskWrapper>
        <input type="checkbox"
               checked={task.isDone}/>
        <span>{task.title}</span>
        <button onClick={ ()=> removeTask(task.id) }>X</button>
      </TaskWrapper>)}
    </TasksWrapper>
    <div>
      <button onClick={ () => filterTasks("all") }>All</button>
      <button onClick={ () => filterTasks("active") }>Active</button>
      <button onClick={ () => filterTasks("completed") }>Completed</button>
    </div>
  </CardWrapper>
}
