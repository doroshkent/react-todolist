import React, { memo } from 'react';
import { List } from "@mui/material";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TaskType } from "components/ToDoList";
import { Task } from './task/Task';

type TasksPropsType = {
  tasks: TaskType[]
  todolistId: string
  removeTask: (todolistId: string, taskId: string) => void
  renameTask: (todolistId: string, taskId: string, newTitle: string) => void
  changeTaskProgress: (todolistId: string, taskId: string, isDone: boolean) => void
}

export const Tasks: React.FC<TasksPropsType> = memo( ({
                                                        todolistId,
                                                        tasks,
                                                        removeTask,
                                                        changeTaskProgress,
                                                        renameTask
                                                      }) => {
  const [ listRef ] = useAutoAnimate<HTMLUListElement>();
  return (
    <>
      { tasks.length > 0
        ? <List ref={ listRef }>
          { tasks.map( (task) => (
            <Task
              key={ task.id }
              todolistId={ todolistId }
              removeTask={ removeTask }
              renameTask={ renameTask }
              changeTaskProgress={ changeTaskProgress }
              { ...task }
            />
          ) ) }
        </List>
        : <p style={ { fontStyle: "italic", opacity: "0.5", textAlign: "center" } }>You have no tasks yet</p> }
    </>
  );
} );
