import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { EditItemField } from "components/editItemField/EditItemField";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import React, { memo } from "react";
import { useTask } from "components/tasks/task/hooks/useTask";

export type TaskPropsType = {
  id: string;
  todolistId: string;
  isDone: boolean;
  title: string;
}

export const Task = memo(({ id, todolistId, isDone, title }: TaskPropsType) => {
  const {
    editMode,
    toggleEditMode,
    onTaskRenamed,
    onTaskChecked,
    onTaskRemoved
  } = useTask(id, todolistId, isDone)

  return (
    <ListItem disablePadding>
      { editMode ? (
        <EditItemField title={ title } renameItem={ onTaskRenamed } toggleEditMode={ toggleEditMode } />
      ) : (
        <ListItemButton onClick={ onTaskChecked } dense>
          <ListItemIcon>
            <Checkbox edge="start" checked={ isDone } tabIndex={ -1 } disableRipple />
          </ListItemIcon>
          <ListItemText>
            <Typography variant={ "body1" } sx={ { opacity: `${ isDone ? "0.5" : "1" }` } }>
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
})
