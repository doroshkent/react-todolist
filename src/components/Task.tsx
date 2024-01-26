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
import { EditItem } from "./EditItem";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import React, { memo, useState } from "react";

interface TaskPropsType {
  id: string;
  todoListId: string;
  isDone: boolean;
  title: string;
  removeTask: (taskId: string, todoListId: string) => void;
  changeTaskProgress: (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => void;
  renameTask: (taskId: string, newTitle: string, todoListId: string) => void;
}

export const Task = memo( ({
                             id,
                             todoListId,
                             isDone,
                             title,
                             renameTask,
                             removeTask,
                             changeTaskProgress,
                           }: TaskPropsType) => {
  const [ editMode, setEditMode ] = useState( false );

  const toggleEditMode = (toggleValue: boolean) => setEditMode( toggleValue );
  const onRemoveHandler = () => removeTask( id, todoListId );
  const onCheckHandler = () => {
    changeTaskProgress( id, !isDone, todoListId );
  };
  const onRenameHandler = (newTitle: string) => {
    renameTask( id, newTitle, todoListId );
  };
  return (
    <ListItem disablePadding>
      { editMode ? (
        <EditItem
          title={ title }
          renameItem={ onRenameHandler }
          toggleEditMode={ toggleEditMode }
        />
      ) : (
        <ListItemButton onClick={ onCheckHandler } dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={ isDone }
              tabIndex={ -1 }
              disableRipple
            />
          </ListItemIcon>
          <ListItemText>
            <Typography
              variant={ "body1" }
              sx={ { opacity: `${ isDone ? "0.5" : "1" }` } }
            >
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
        <IconButton onClick={ onRemoveHandler }>
          <ClearIcon />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
} )
