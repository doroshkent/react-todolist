import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { tasksThunks } from '../tasks-slice'
import { TaskStatuses } from 'common/enums'

export const useTask = (taskId: string, todolistId: string, status: TaskStatuses) => {
  const [editMode, setEditMode] = useState(false)
  const dispatch = useDispatch()

  const toggleEditMode = (toggleValue: boolean) => {
    setEditMode(toggleValue)
  }

  const onTaskRemoved = useCallback(() => {
    dispatch(tasksThunks.removeTask({ todolistId, taskId }))
  }, [todolistId, taskId])

  const onTaskChecked = useCallback(
    (status: TaskStatuses) => {
      const newStatusValue = status === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New
      dispatch(
        tasksThunks.updateTask({
          todolistId,
          taskId,
          model: {
            status: newStatusValue,
          },
        })
      )
    },
    [todolistId, taskId, status]
  )

  const onTaskRenamed = useCallback(
    (newTitle: string) => {
      dispatch(
        tasksThunks.updateTask({
          todolistId,
          taskId,
          model: {
            title: newTitle,
          },
        })
      )
    },
    [todolistId, taskId]
  )

  return {
    editMode,
    toggleEditMode,
    onTaskRenamed,
    onTaskChecked,
    onTaskRemoved,
  }
}
