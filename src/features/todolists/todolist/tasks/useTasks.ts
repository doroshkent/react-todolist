import { useSelector } from 'react-redux'
import { selectFilteredTasks } from 'features/todolists/todolist/tasks'

export const useTasks = (todolistId: string) => {
  const tasks = useSelector(selectFilteredTasks(todolistId))

  return {
    tasks,
  }
}
