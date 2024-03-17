import { useCallback } from 'react'
import { useAppSelector } from 'app/store'
import { FilterValues } from 'features/todolists/todolists-reducer'
import { TaskStatuses } from 'api/todolists-api'
import { TaskDomain } from 'features/todolists/todolist/tasks/tasks-reducer'

export const useTasks = (todolistId: string, filter: FilterValues) => {
  const tasks = useAppSelector<TaskDomain[]>((state) => {
    return state.tasks[todolistId]
  })

  const filterTasks = useCallback(() => {
    switch (filter) {
      case 'active': {
        return tasks.filter((t) => t.status === TaskStatuses.New)
      }
      case 'completed': {
        return tasks.filter((t) => t.status === TaskStatuses.Completed)
      }
      default: {
        return tasks
      }
    }
  }, [tasks, filter])

  return {
    filteredTasks: filterTasks(),
  }
}
