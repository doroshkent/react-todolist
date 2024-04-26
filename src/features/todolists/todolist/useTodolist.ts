import { useCallback } from 'react'
import { FilterValues } from 'features/todolists/todolists-slice'
import { useActions } from 'common/hooks'

export const useTodolist = (id: string) => {
  const { removeTodolist, renameTodolist, addTask, changeFilter } = useActions()

  const onTodoListDeleted = useCallback(() => {
    removeTodolist({ id })
  }, [id])

  const onTodoListRenamed = useCallback(
    (title: string) => {
      renameTodolist({ id, title })
    },
    [id]
  )

  const addNewTask = useCallback(
    (title: string) => {
      addTask({ todolistId: id, title })
    },
    [id]
  )

  const onFilterButtonClicked = useCallback(
    (value: FilterValues) => {
      changeFilter({ id, filter: value })
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
