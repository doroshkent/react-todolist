import { useDispatch, useSelector } from 'react-redux'
import { selectFilteredTasks } from './tasks-selectors'
import { useEffect } from 'react'
import { tasksThunks } from 'features/tasks/tasks-slice'

export const useTasks = (todolistId: string) => {
  const dispatch = useDispatch()
  const tasks = useSelector(selectFilteredTasks(todolistId))

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(todolistId))
  }, [])

  return {
    tasks,
  }
}
