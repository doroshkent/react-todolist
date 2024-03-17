import { useCallback } from 'react'
import { FilterValues } from 'features/todolists/todolists-reducer'
import { TaskStatuses } from 'api/todolists-api'
import { selectTasks } from 'features/todolists/todolist/tasks/tasks-selectors'
import { useSelector } from 'react-redux'

export const useTasks = (todolistId: string, filter: FilterValues) => {
  const tasks = useSelector(selectTasks(todolistId))

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
