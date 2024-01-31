import React from 'react';
import { List } from "@mui/material";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TaskType } from "components/ToDoList";
import { Task } from './task/Task';
import { useSelector } from "react-redux";
import { AppRootStateType } from "state/store";
import { FilterValuesType } from "App";

type TasksPropsType = {
  todolistId: string
  filter: FilterValuesType
}

export const Tasks = ({ todolistId, filter }: TasksPropsType) => {
  const [ listRef ] = useAutoAnimate<HTMLUListElement>();
  let tasks = useSelector<AppRootStateType, TaskType[]>( state => state.tasks[todolistId] )
  const filterTasks = (tasks: TaskType[]) => {
    switch (filter) {
      case "active": {
        return tasks.filter( (t) => !t.isDone );
      }
      case "completed": {
        return tasks.filter( (t) => t.isDone );
      }
      default: {
        return tasks
      }
    }
  }
  tasks = filterTasks(tasks);
  return (
    <>
      { tasks.length > 0
        ? <List ref={ listRef }>
          { tasks.map( (task) => (
            <Task
              key={ task.id }
              todolistId={ todolistId }
              { ...task }
            />
          ) ) }
        </List>
        : <p style={ { fontStyle: "italic", opacity: "0.5", textAlign: "center" } }>You have no tasks yet</p> }
    </>
  );
};
