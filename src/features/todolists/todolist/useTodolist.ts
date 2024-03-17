import { useCallback } from 'react'
import { addTaskTC } from 'features/todolists/todolist/tasks/tasks-reducer'
import { changeFilterAC, FilterValues, removeTodolistTC, renameTodolistTC } from 'features/todolists/todolists-reducer'
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
      dispatch(changeFilterAC(id, value))
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
