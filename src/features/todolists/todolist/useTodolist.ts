import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { tasksThunks } from '../../tasks'
import { FilterValues, todolistsActions, todolistsThunks } from 'features/todolists/todolists-slice'

export const useTodolist = (id: string) => {
  const dispatch = useDispatch()

  const onTodoListDeleted = useCallback(() => {
    dispatch(todolistsThunks.removeTodolist({ id }))
  }, [id])

  const onTodoListRenamed = useCallback(
    (title: string) => {
      dispatch(todolistsThunks.renameTodolist({ id, title }))
    },
    [id]
  )

  const addNewTask = useCallback(
    (title: string) => {
      dispatch(tasksThunks.addTask({ todolistId: id, title }))
    },
    [id]
  )

  const onFilterButtonClicked = useCallback(
    (value: FilterValues) => {
      dispatch(todolistsActions.changeFilter({ id, filter: value }))
    },
    [id]
  )

  return {
    onTodoListRenamed,
    onTodoListDeleted,
    addNewTask,
    onFilterButtonClicked,
  }
}
