import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { tasksThunks } from '../../tasks'
import { FilterValues, todolistsActions, todolistsThunks } from '../todolistsSlice'

export const useTodolist = (todolistId: string) => {
  const dispatch = useDispatch()

  const onTodoListDeleted = useCallback(() => {
    dispatch(todolistsThunks.removeTodolistTC(todolistId))
  }, [todolistId])

  const onTodoListRenamed = useCallback(
    (newTitle: string) => {
      dispatch(todolistsThunks.renameTodolistTC(todolistId, newTitle))
    },
    [todolistId]
  )

  const addNewTask = useCallback(
    (title: string) => {
      dispatch(tasksThunks.addTask({ todolistId, title }))
    },
    [todolistId]
  )

  const onFilterButtonClicked = useCallback(
    (value: FilterValues) => {
      dispatch(todolistsActions.changeFilter({ id: todolistId, filter: value }))
    },
    [todolistId]
  )

  return {
    onTodoListRenamed,
    onTodoListDeleted,
    addNewTask,
    onFilterButtonClicked,
  }
}
