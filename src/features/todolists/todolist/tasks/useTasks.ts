import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "state/store";
import { FilterValuesType } from "state/todolists-reducer";
import { TaskStatuses } from "api/todolists-api";
import { getTasksTC, TaskDomain } from 'state/tasks-reducer';

export const useTasks = (todolistId: string, filter: FilterValuesType) => {
  const tasks = useAppSelector<TaskDomain[]>( state => {
    return state.tasks[todolistId]
  } )
  const dispatch = useAppDispatch()

  useEffect( () => {
    dispatch( getTasksTC( todolistId ) )
  }, [] );

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
