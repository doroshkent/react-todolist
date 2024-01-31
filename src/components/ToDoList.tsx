import React, { useState } from "react";
import { FilterValuesType } from "App";
import { AddItemForm } from "./AddItemForm";
import { EditItem } from "./EditItem";
import { Button, ButtonGroup, Card, Grid, IconButton, Tooltip, Typography, } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Tasks } from "components/tasks/Tasks";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistPropsType = {
  id: string;
  title: string;
  tasks: TaskType[];
  removeTask: (todolistId: string, taskId: string) => void;
  filterTasks: (todolistId: string, value: FilterValuesType) => void;
  addTask: (todolistId: string, title: string) => void;
  changeTaskProgress: (todolistId: string, taskId: string, isDone: boolean) => void;
  renameTask: (todolistId: string, taskId: string, newTitle: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todolistId: string) => void;
  renameTodoList: (todolistId: string, newTitle: string) => void;
};

export const ToDoList = ({
                           id,
                           title,
                           tasks,
                           removeTask,
                           filterTasks,
                           addTask,
                           changeTaskProgress,
                           renameTask,
                           filter,
                           removeTodoList,
                           renameTodoList,
                         }: TodolistPropsType) => {
  const [ titleEditMode, setTitleEditMode ] = useState( false );

  const toggleTitleEditMode = (toggleValue: boolean) =>
    setTitleEditMode( toggleValue );

  const onDeleteTodoListHandler = () => removeTodoList( id );

  const onRenameTodoListHandler = (newTitle: string) =>
    renameTodoList( id, newTitle );

  const addNewTask = (title: string) => {
    addTask( id, title );
  };

  const tasksFilter = (tasks: TaskType[]) => {
    switch (filter) {
      case "active": {
        return tasks.filter( (t) => !t.isDone );
      }
      case "completed": {
        return tasks.filter( (t) => t.isDone );
      }
      default: {
        return tasks
      }
    }
  }

  const onAllClickHandler = () => filterTasks( id, "all" );
  const onActiveClickHandler = () => filterTasks( id, "active" );
  const onCompletedClickHandler = () => filterTasks( id, "completed" );

  return (
    <Card sx={ { padding: "15px", width: "300px" } }>
      <Grid container flexDirection={ "column" }>
        <Grid
          item
          container
          justifyContent={ "space-between" }
          alignItems={ "center" }
        >
          <Grid item>
            { titleEditMode ? (
              <EditItem
                title={ title }
                renameItem={ onRenameTodoListHandler }
                toggleEditMode={ toggleTitleEditMode }
              />
            ) : (
              <Typography
                variant={ "h5" }
                onDoubleClick={ () => toggleTitleEditMode( true ) }
              >
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
          <Tasks todolistId={ id } tasks={ tasksFilter(tasks) } renameTask={ renameTask } removeTask={ removeTask }
                 changeTaskProgress={ changeTaskProgress } />
        </Grid>
        <Grid item alignSelf={ "center" }>
          <ButtonGroup size={ "small" }>
            <Button
              variant={ filter === "all" ? "contained" : "outlined" }
              onClick={ onAllClickHandler }
            >
              All
            </Button>
            <Button
              variant={ filter === "active" ? "contained" : "outlined" }
              onClick={ onActiveClickHandler }
            >
              Active
            </Button>
            <Button
              variant={ filter === "completed" ? "contained" : "outlined" }
              onClick={ onCompletedClickHandler }
            >
              Completed
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Card>
  );
}
