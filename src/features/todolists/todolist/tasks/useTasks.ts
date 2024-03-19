import { selectFilteredTasks } from 'features/todolists/todolist/tasks/tasks-selectors'
import { useSelector } from 'react-redux'

export const useTasks = (todolistId: string) => {
  const tasks = useSelector(selectFilteredTasks(todolistId))

  return {
    tasks,
  }
}
