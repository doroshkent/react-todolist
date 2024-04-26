import { useSelector } from 'react-redux'
import { selectFilteredTasks } from './tasks-selectors'
import { useEffect } from 'react'
import { useActions } from 'common/hooks'

export const useTasks = (todolistId: string) => {
  const { fetchTasks } = useActions()
  const tasks = useSelector(selectFilteredTasks(todolistId))

  useEffect(() => {
    fetchTasks(todolistId)
  }, [])

  return {
    tasks,
  }
}
