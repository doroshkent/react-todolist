import { useCallback, useState } from 'react'
import { addTaskTC } from 'state/tasks-reducer'
import { changeFilterAC, FilterValuesType, removeTodolistTC, renameTodolistTC } from 'state/todolists-reducer'
import { useAppDispatch } from 'app/store'
import { RequestStatusType } from 'app/app-reducer'

export const useTodolist = (id: string, entityStatus: RequestStatusType) => {
  const [titleEditMode, setTitleEditMode] = useState(false)
  const toggleTitleEditMode = useCallback(
    (toggleValue: boolean) => {
      if (entityStatus === 'loading') return
      setTitleEditMode(toggleValue)
    },
    [entityStatus]
  )

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
    (value: FilterValuesType) => {
      dispatch(changeFilterAC(id, value))
    },
    [id]
  )

  return {
    titleEditMode,
    onTodoListRenamed,
    toggleTitleEditMode,
    onTodoListDeleted,
    addNewTask,
    onFilterButtonClicked,
  }
}
