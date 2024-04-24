import { useSelector } from 'react-redux'
import { selectFilteredTasks } from './tasks-selectors'

export const useTasks = (todolistId: string) => {
  const tasks = useSelector(selectFilteredTasks(todolistId))

  return {
    tasks,
  }
}
