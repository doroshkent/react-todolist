import React, { useCallback } from 'react';
import { TaskType } from "components/todolists/todolist/Todolist";
import { useSelector } from "react-redux";
import { AppRootStateType } from "state/store";
import { FilterValuesType } from "state/todolistsReducer";

export const useTasks = (todolistId: string, filter: FilterValuesType) => {
  const tasks = useSelector<AppRootStateType, TaskType[]>( state => {
    return state.tasks[todolistId]
  } )

  const filterTasks = useCallback( () => {
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
  }, [ tasks, filter ] )

  return {
    filteredTasks: filterTasks()
  }
}
