import { useState } from 'react'
import { useSelector } from 'react-redux'
import { TASK_STATUSES } from 'common/enums'
import { selectTodolistFetchStatus } from 'features/todolists'
import { useActions } from 'common/hooks'

export const useTask = (taskId: string, todolistId: string) => {
  const [editMode, setEditMode] = useState(false)
  const { removeTask, updateTask } = useActions()
  const todolistFetchStatus = useSelector(selectTodolistFetchStatus(todolistId))

  const toggleEditMode = (toggleValue: boolean) => {
    setEditMode(toggleValue)
  }

  const onRemoveTask = () => {
    removeTask({ todolistId, taskId })
  }

  const onCheckTask = (status: TASK_STATUSES) => {
    const newStatusValue = status === TASK_STATUSES.New ? TASK_STATUSES.Completed : TASK_STATUSES.New
    updateTask({ todolistId, taskId, model: { status: newStatusValue } })
  }

  const onRenameTask = (newTitle: string) => {
    updateTask({ todolistId, taskId, model: { title: newTitle } })
  }

  return {
    editMode,
    toggleEditMode,
    onRenameTask,
    onCheckTask,
    onRemoveTask,
    todolistFetchStatus,
  }
}
