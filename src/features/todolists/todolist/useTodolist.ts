import { useCallback } from 'react'
import { addTaskTC } from 'features/todolists/todolist/tasks/tasks-slice'
import { FilterValues, removeTodolistTC, renameTodolistTC, todolistsActions } from 'features/todolists/todolistsSlice'
import { useDispatch } from 'react-redux'

export const useTodolist = (id: string) => {
  const dispatch = useDispatch()

  const onTodoListDeleted = useCallback(() => {
    dispatch(removeTodolistTC(id))
  }, [id])

  const onTodoListRenamed = useCallback(
    (newTitle: string) => {
      dispatch(renameTodolistTC(id, newTitle))
    },
    [id]
  )

  const addNewTask = useCallback(
    (title: string) => {
      dispatch(addTaskTC(id, title))
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
