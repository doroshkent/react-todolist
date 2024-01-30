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
import { EditItem } from "components/EditItem";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import React, { memo, useState } from "react";

interface TaskPropsType {
  id: string;
  todolistId: string;
  isDone: boolean;
  title: string;
  removeTask: (todoListId: string, taskId: string) => void;
  changeTaskProgress: (
    todoListId: string,
    taskId: string,
    isDone: boolean,
  ) => void;
  renameTask: (todoListId: string, taskId: string, newTitle: string) => void;
}

export const Task = memo( ({
                             id,
                             todolistId,
                             isDone,
                             title,
                             renameTask,
                             removeTask,
                             changeTaskProgress,
                           }: TaskPropsType) => {

  console.log( "task render" )
  const [ editMode, setEditMode ] = useState( false );

  const toggleEditMode = (toggleValue: boolean) => setEditMode( toggleValue );
  const onRemoveHandler = () => removeTask( todolistId, id );
  const onCheckHandler = () => {
    changeTaskProgress( todolistId, id, !isDone, );
  };
  const onRenameHandler = (newTitle: string) => {
    renameTask( todolistId, id, newTitle );
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
