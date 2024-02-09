import React, { memo, useCallback, useState } from "react";
import { FilterValuesType } from "App";
import { AddItemForm } from "components/addItemForm/AddItemForm";
import { EditItemField } from "components/editItemField/EditItemField";
import { Button, ButtonGroup, Card, Grid, IconButton, Tooltip, Typography, } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Tasks } from "components/tasks/Tasks";
import { useDispatch } from "react-redux";
import { addTaskAC } from "state/tasksReducer";
import { changeFilterAC, removeTodolistAC, renameTodolistAC } from "state/todolistsReducer";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
};

type TodolistPropsType = {
  id: string
  title: string
  filter: FilterValuesType
};

export const ToDoList = memo( ({ id, title, filter }: TodolistPropsType) => {
  const [ titleEditMode, setTitleEditMode ] = useState( false );
  const toggleTitleEditMode = useCallback( (toggleValue: boolean) =>
    setTitleEditMode( toggleValue ), [] );

  const dispatch = useDispatch();

  const onDeleteTodoListHandler = useCallback( () => {
    dispatch( removeTodolistAC( id ) )
  }, [ id ] );

  const onRenameTodoListHandler = useCallback( (newTitle: string) => {
    dispatch( renameTodolistAC( id, newTitle ) )
  }, [ id ] );

  const addNewTask = useCallback( (title: string) => {
    dispatch( addTaskAC( id, title ) );
  }, [ id ] );

  const onFilterButtonClickHandler = useCallback( (value: FilterValuesType) => {
    dispatch( changeFilterAC( id, value ) )
  }, [ id ] )

  return (
    <Card sx={ { padding: "15px", width: "300px" } }>
      <Grid container flexDirection={ "column" }>
        <Grid item container justifyContent={ "space-between" } alignItems={ "center" }>
          <Grid item>
            { titleEditMode ? (
              <EditItemField title={ title } renameItem={ onRenameTodoListHandler } toggleEditMode={ toggleTitleEditMode } />
            ) : (
              <Typography variant={ "h5" } onDoubleClick={ () => toggleTitleEditMode( true ) }>
                { title }
              </Typography>
            ) }
          </Grid>
          <Grid item>
            <Tooltip title={ "Remove" }>
              <IconButton onClick={ onDeleteTodoListHandler }>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid item>
          <AddItemForm addItem={ addNewTask } item="task" />
        </Grid>
        <Grid item>
          <Tasks todolistId={ id } filter={ filter } />
        </Grid>
        <Grid item alignSelf={ "center" }>
          <ButtonGroup size={ "small" }>
            <Button
              variant={ filter === "all" ? "contained" : "outlined" }
              onClick={ () => onFilterButtonClickHandler( "all" ) }
            >
              All
            </Button>
            <Button
              variant={ filter === "active" ? "contained" : "outlined" }
              onClick={ () => onFilterButtonClickHandler( "active" ) }
            >
              Active
            </Button>
            <Button
              variant={ filter === "completed" ? "contained" : "outlined" }
              onClick={ () => onFilterButtonClickHandler( "completed" ) }
            >
              Completed
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Card>
  );
} )
