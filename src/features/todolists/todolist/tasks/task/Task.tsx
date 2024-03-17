import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { EditItemField } from 'components/editItemField/EditItemField'
import React, { memo } from 'react'
import { useTask } from 'features/todolists/todolist/tasks/task/useTask'
import { TaskStatuses } from 'api/todolists-api'
import { RequestStatus } from 'app/app-reducer'
import { DeleteButton } from 'components/buttons/DeleteButton'
import { EditButton } from 'components/buttons/EditButton'

export type TaskProps = {
  id: string
  todolistId: string
  status: TaskStatuses
  title: string
  entityStatus: RequestStatus
}

export const Task = memo(({ id, todolistId, status, title, entityStatus }: TaskProps) => {
  const { editMode, toggleEditMode, onTaskRenamed, onTaskChecked, onTaskRemoved } = useTask(id, todolistId, status)

  return (
    <ListItem disablePadding>
      {editMode ? (
        <EditItemField title={title} renameItem={onTaskRenamed} toggleEditMode={toggleEditMode} />
      ) : (
        <ListItemButton disabled={entityStatus === 'loading'} onClick={() => onTaskChecked(status)} dense>
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
      <EditButton disabled={entityStatus === 'loading'} onClick={() => toggleEditMode(true)} />
      <DeleteButton disabled={entityStatus === 'loading'} onClick={onTaskRemoved} />
    </ListItem>
  )
})
