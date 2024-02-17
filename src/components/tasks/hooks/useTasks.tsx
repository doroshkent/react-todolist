import React, { useCallback } from 'react';
import { useSelector } from "react-redux";
import { AppRootStateType } from "state/store";
import { FilterValuesType } from "state/todolistsReducer";
import { TaskStatuses, TaskType } from "api/todolists-api";

export const useTasks = (todolistId: string, filter: FilterValuesType) => {
  const tasks = useSelector<AppRootStateType, TaskType[]>( state => {
    return state.tasks[todolistId]
  } )

  const filterTasks = useCallback( () => {
    switch (filter) {
      case "active": {
        return tasks.filter( (t) => t.status === TaskStatuses.New );
      }
      case "completed": {
        return tasks.filter( (t) => t.status === TaskStatuses.Completed );
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
