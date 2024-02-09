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
import React, { memo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { changeTaskProgressAC, removeTaskAC, renameTaskAC } from "state/tasksReducer";

export type TaskPropsType = {
  id: string;
  todolistId: string;
  isDone: boolean;
  title: string;
}

export const Task = memo(({ id, todolistId, isDone, title }: TaskPropsType) => {
  const [ editMode, setEditMode ] = useState( false );
  const dispatch = useDispatch();

  const toggleEditMode = (toggleValue: boolean) => {
    setEditMode( toggleValue )
  };

  const onRemoveHandler = useCallback(() => {
    dispatch( removeTaskAC( todolistId, id ) )}, [ todolistId, id ]
  );

  const onCheckHandler = useCallback(() => {
    dispatch( changeTaskProgressAC( todolistId, id, !isDone ) );
  }, [todolistId, id, isDone]);

  const onRenameHandler = useCallback((newTitle: string) => {
    dispatch( renameTaskAC( todolistId, id, newTitle ) );
  }, [todolistId, id]);

  return (
    <ListItem disablePadding>
      { editMode ? (
        <EditItemField title={ title } renameItem={ onRenameHandler } toggleEditMode={ toggleEditMode } />
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
})
