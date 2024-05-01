import React, { useState } from 'react'
import { DeleteButton, EditButton } from 'common/components'
import ListItem from '@mui/material/ListItem'
import { DomainTask } from 'features/tasks/model/tasks-slice'
import { useSelector } from 'react-redux'
import { selectTodolistFetchStatus } from 'features/todolists'
import { useActions } from 'common/hooks'
import { TaskTitle } from './taskTitle/TaskTitle'

type Props = {
  task: DomainTask
}

export const Task = ({ task }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const { removeTask } = useActions()
  const todolistFetchStatus = useSelector(selectTodolistFetchStatus(task.todoListId))

  const toggleEditMode = (toggleValue: boolean) => {
    setEditMode(toggleValue)
  }
  const onRemoveTask = () => {
    removeTask({ todolistId: task.todoListId, taskId: task.id })
  }

  const buttonDisabled = task.fetchStatus === 'loading' || todolistFetchStatus === 'loading'

  return (
    <ListItem disablePadding>
      <TaskTitle task={task} editMode={editMode} toggleEditMode={toggleEditMode} buttonDisabled={buttonDisabled} />
      <EditButton disabled={buttonDisabled} onClick={() => toggleEditMode(true)} />
      <DeleteButton disabled={buttonDisabled} onClick={onRemoveTask} />
    </ListItem>
  )
}
