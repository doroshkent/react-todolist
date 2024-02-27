import React, { memo } from 'react';
import { List } from "@mui/material";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Task } from 'features/todolists/todolist/tasks/task/Task';
import { useTasks } from "features/todolists/todolist/tasks/useTasks";
import { FilterValuesType } from "state/todolistsReducer";

export type TasksPropsType = {
  todolistId: string
  filter: FilterValuesType
}

export const Tasks = memo( ({ todolistId, filter }: TasksPropsType) => {
  const [ listRef ] = useAutoAnimate<HTMLUListElement>();
  const { filteredTasks } = useTasks( todolistId, filter );

  return (
    <>
      { filteredTasks.length > 0
        ? <List ref={ listRef }>
          { filteredTasks.map( (task) => (
            <Task
              key={ task.id }
              todolistId={ todolistId }
              { ...task }
            />
          ) ) }
        </List>
        : <p style={ { fontStyle: "italic", opacity: "0.5",
          textAlign: "center", marginBottom: "10px" } }>You have no tasks yet</p> }
    </>
  );
} )
