import { useCallback } from 'react'
import { FilterValues, removeTodolistTC, renameTodolistTC, todolistsActions } from 'features/todolists/todolistsSlice'
import { useDispatch } from 'react-redux'
import { tasksThunks } from 'features/todolists/todolist/tasks/tasks-slice'

export const useTodolist = (todolistId: string) => {
  const dispatch = useDispatch()

  const onTodoListDeleted = useCallback(() => {
    dispatch(removeTodolistTC(todolistId))
  }, [todolistId])

  const onTodoListRenamed = useCallback(
    (newTitle: string) => {
      dispatch(renameTodolistTC(todolistId, newTitle))
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
