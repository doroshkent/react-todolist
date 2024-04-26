import React, { memo } from 'react'
import { useTask } from './useTask'
import { DeleteButton, EditButton, EditItemField } from 'common/components'
import { TaskStatuses } from 'common/enums'
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { DomainTask } from 'features/tasks/tasks-slice'

export type TaskProps = {
  todolistId: string
  task: DomainTask
}

export const Task = memo(({ todolistId, task }: TaskProps) => {
  const { id, status, fetchStatus, title } = task
  const { editMode, toggleEditMode, onTaskRenamed, onTaskChecked, onTaskRemoved, todolistFetchStatus } = useTask(
    id,
    todolistId,
    status
  )

  const buttonDisabled = fetchStatus === 'loading' || todolistFetchStatus === 'loading'

  return (
    <ListItem disablePadding>
      {editMode ? (
        <EditItemField title={title} renameItem={onTaskRenamed} toggleEditMode={toggleEditMode} />
      ) : (
        <ListItemButton disabled={buttonDisabled} onClick={() => onTaskChecked(status)} dense>
          <Checkbox edge="start" checked={status === TaskStatuses.Completed} tabIndex={-1} disableRipple />
          <ListItemText>
            <Typography
              variant={'body1'}
              sx={{
                opacity: `${status === TaskStatuses.Completed ? '0.5' : '1'}`,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>
              {title}
            </Typography>
          </ListItemText>
        </ListItemButton>
      )}
      <EditButton disabled={buttonDisabled} onClick={() => toggleEditMode(true)} />
      <DeleteButton disabled={buttonDisabled} onClick={onTaskRemoved} />
    </ListItem>
  )
})
