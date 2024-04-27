import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { TASK_STATUSES } from 'common/enums'
import { selectTodolistFetchStatus } from 'features/todolists'
import { useActions } from 'common/hooks'

export const useTask = (taskId: string, todolistId: string, status: TASK_STATUSES) => {
  const [editMode, setEditMode] = useState(false)
  const { removeTask, updateTask } = useActions()
  const todolistFetchStatus = useSelector(selectTodolistFetchStatus(todolistId))

  const toggleEditMode = (toggleValue: boolean) => {
    setEditMode(toggleValue)
  }

  const onTaskRemoved = useCallback(() => {
    removeTask({ todolistId, taskId })
  }, [todolistId, taskId])

  const onTaskChecked = useCallback(
    (status: TASK_STATUSES) => {
      const newStatusValue = status === TASK_STATUSES.New ? TASK_STATUSES.Completed : TASK_STATUSES.New
      updateTask({ todolistId, taskId, model: { status: newStatusValue } })
    },
    [todolistId, taskId, status]
  )

  const onTaskRenamed = useCallback(
    (newTitle: string) => {
      updateTask({ todolistId, taskId, model: { title: newTitle } })
    },
    [todolistId, taskId]
  )

  return {
    editMode,
    toggleEditMode,
    onTaskRenamed,
    onTaskChecked,
    onTaskRemoved,
    todolistFetchStatus,
  }
}
