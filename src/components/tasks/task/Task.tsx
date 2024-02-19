import { Checkbox, IconButton, ListItem, ListItemButton, ListItemText, Tooltip, Typography, } from "@mui/material";
import { EditItemField } from "components/editItemField/EditItemField";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import React, { memo } from "react";
import { useTask } from "components/tasks/task/hooks/useTask";
import { TaskStatuses } from "api/todolists-api";

export type TaskPropsType = {
  id: string;
  todolistId: string;
  status: TaskStatuses;
  title: string;
}

export const Task = memo( ({ id, todolistId, status, title }: TaskPropsType) => {
  const {
    editMode,
    toggleEditMode,
    onTaskRenamed,
    onTaskChecked,
    onTaskRemoved
  } = useTask( id, todolistId, status )

  return (
    <ListItem disablePadding>
      { editMode ? (
        <EditItemField title={ title } renameItem={ onTaskRenamed } toggleEditMode={ toggleEditMode } />
      ) : (
        <ListItemButton onClick={ () => onTaskChecked( status ) } dense>
          <Checkbox edge="start" checked={ status === TaskStatuses.Completed } tabIndex={ -1 } disableRipple />
          <ListItemText>
            <Typography variant={ "body1" }
                        sx={ {
                          opacity: `${ status === TaskStatuses.Completed ? "0.5" : "1" }`,
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word"
                        } }>
              { title }
            </Typography>
          </ListItemText>
        </ListItemButton>
      ) }
      <Tooltip title={ "Edit" } arrow>
        <IconButton onClick={ () => toggleEditMode( true ) }>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={ "Remove" } arrow>
        <IconButton onClick={ onTaskRemoved }>
          <ClearIcon />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
} )
