import { useCallback, useState } from 'react'
import { removeTaskTC, updateTaskTC } from 'features/todolists/todolist/tasks/tasks-slice'
import { TaskStatuses } from 'features/todolists/todolists-api'
import { useDispatch } from 'react-redux'

export const useTask = (id: string, todolistId: string, status: TaskStatuses) => {
  const [editMode, setEditMode] = useState(false)
  const dispatch = useDispatch()

  const toggleEditMode = (toggleValue: boolean) => {
    setEditMode(toggleValue)
  }

  const onTaskRemoved = useCallback(() => {
    dispatch(removeTaskTC(todolistId, id))
  }, [todolistId, id])

  const onTaskChecked = useCallback(
    (status: TaskStatuses) => {
      const newStatusValue = status === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New
      dispatch(updateTaskTC(todolistId, id, { status: newStatusValue }))
    },
    [todolistId, id, status]
  )

  const onTaskRenamed = useCallback(
    (newTitle: string) => {
      dispatch(updateTaskTC(todolistId, id, { title: newTitle }))
    },
    [todolistId, id]
  )

  return {
    editMode,
    toggleEditMode,
    onTaskRenamed,
    onTaskChecked,
    onTaskRemoved,
  }
}
