import React, { useState } from "react";
import { FilterValuesType } from "App";
import { AddItemForm } from "./AddItemForm";
import { EditItem } from "./EditItem";
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

export const ToDoList = ({ id, title, filter }: TodolistPropsType) => {
  const [ titleEditMode, setTitleEditMode ] = useState( false );
  const toggleTitleEditMode = (toggleValue: boolean) =>
    setTitleEditMode( toggleValue );

  const dispatch = useDispatch();

  const onDeleteTodoListHandler = () => dispatch( removeTodolistAC( id ) );

  const onRenameTodoListHandler = (newTitle: string) =>
    dispatch( renameTodolistAC( id, newTitle ) );

  const addNewTask = (title: string) => {
    dispatch( addTaskAC( id, title ) );
  };

  const onFilterButtonClickHandler = (value: FilterValuesType) => {
    dispatch( changeFilterAC( id, value ) )
  }

  return (
    <Card sx={ { padding: "15px", width: "300px" } }>
      <Grid container flexDirection={ "column" }>
        <Grid item container justifyContent={ "space-between" } alignItems={ "center" }>
          <Grid item>
            { titleEditMode ? (
              <EditItem title={ title } renameItem={ onRenameTodoListHandler } toggleEditMode={ toggleTitleEditMode } />
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
}
