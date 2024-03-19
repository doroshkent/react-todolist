import { useCallback } from 'react'
import { addTaskTC } from 'features/todolists/todolist/tasks/tasksSlice'
import { FilterValues, removeTodolistTC, renameTodolistTC, todolistsActions } from 'features/todolists/todolistsSlice'
import { useAppDispatch } from 'app/store'

export const useTodolist = (id: string) => {
  const dispatch = useAppDispatch()

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
