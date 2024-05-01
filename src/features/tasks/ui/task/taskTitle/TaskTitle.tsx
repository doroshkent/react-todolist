import React from 'react'
import { EditItemField } from 'common/components'
import ListItemButton from '@mui/material/ListItemButton'
import Checkbox from '@mui/material/Checkbox'
import { TASK_STATUSES } from 'common/enums'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { useActions } from 'common/hooks'
import { DomainTask } from 'features/tasks/model/tasks-slice'

type Props = {
  task: DomainTask
  editMode: boolean
  toggleEditMode: (toggleValue: boolean) => void
  buttonDisabled: boolean
}

export const TaskTitle = ({ task, editMode, toggleEditMode, buttonDisabled }: Props) => {
  const { id, todoListId, title, status } = task
  const { updateTask } = useActions()

  const onRenameTask = (title: string) => {
    updateTask({ todolistId: todoListId, taskId: id, model: { title } })
  }

  const onCheckTask = () => {
    const newStatusValue = status === TASK_STATUSES.New ? TASK_STATUSES.Completed : TASK_STATUSES.New
    updateTask({ todolistId: todoListId, taskId: id, model: { status: newStatusValue } })
  }

  return (
    <>
      {editMode ? (
        <EditItemField title={title} renameItem={onRenameTask} toggleEditMode={toggleEditMode} />
      ) : (
        <ListItemButton disabled={buttonDisabled} onClick={onCheckTask} dense>
          <Checkbox edge="start" checked={status === TASK_STATUSES.Completed} tabIndex={-1} disableRipple />
          <ListItemText>
            <Typography
              variant={'body1'}
              sx={{
                opacity: `${status === TASK_STATUSES.Completed ? '0.5' : '1'}`,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>
              {title}
            </Typography>
          </ListItemText>
        </ListItemButton>
      )}
    </>
  )
}
