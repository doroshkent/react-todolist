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
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeTaskProgressAC, removeTaskAC, renameTaskAC } from "state/tasksReducer";

interface TaskPropsType {
  id: string;
  todolistId: string;
  isDone: boolean;
  title: string;
}

export const Task = ({ id, todolistId, isDone, title }: TaskPropsType) => {
  const [ editMode, setEditMode ] = useState( false );
  const dispatch = useDispatch();

  const toggleEditMode = (toggleValue: boolean) => setEditMode( toggleValue );

  const onRemoveHandler = () => dispatch( removeTaskAC( todolistId, id ) );
  const onCheckHandler = () => {
    dispatch( changeTaskProgressAC( todolistId, id, !isDone ) );
  };
  const onRenameHandler = (newTitle: string) => {
    dispatch( renameTaskAC( todolistId, id, newTitle ) );
  };
  return (
    <ListItem disablePadding>
      { editMode ? (
        <EditItem title={ title } renameItem={ onRenameHandler } toggleEditMode={ toggleEditMode } />
      ) : (
        <ListItemButton onClick={ onCheckHandler } dense>
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
        <IconButton onClick={ onRemoveHandler }>
          <ClearIcon />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
}
