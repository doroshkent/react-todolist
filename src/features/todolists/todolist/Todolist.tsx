import React, { memo } from "react";
import { AddItemForm } from "components/addItemForm/AddItemForm";
import { EditItemField } from "components/editItemField/EditItemField";
import { Button, ButtonGroup, Card, Grid, IconButton, Tooltip, Typography, } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Tasks } from "features/todolists/todolist/tasks/Tasks";
import { useTodolist } from "features/todolists/todolist/useTodolist";
import { FilterValuesType } from "state/todolistsReducer";
import { RequestStatusType } from "state/appReducer";

type TodolistPropsType = {
  id: string
  title: string
  filter: FilterValuesType
  entityStatus: RequestStatusType
};

export const Todolist = memo( ({ id, title, filter, entityStatus }: TodolistPropsType) => {
  const {
    titleEditMode,
    onTodoListRenamed,
    toggleTitleEditMode,
    onTodoListDeleted,
    addNewTask,
    onFilterButtonClicked
  } = useTodolist( id )

  return (
    <Card sx={ { padding: "15px", width: "300px" } }>
      <Grid container flexDirection={ "column" }>
        <Grid item container justifyContent={ "space-between" } alignItems={ "center" }>
          <Grid item>
            { titleEditMode ? (
              <EditItemField title={ title } renameItem={ onTodoListRenamed } toggleEditMode={ toggleTitleEditMode } />
            ) : (
              <Typography variant={ "h5" } onDoubleClick={ () => toggleTitleEditMode( true ) }>
                { title }
              </Typography>
            ) }
          </Grid>
          <Grid item>
            <Tooltip title={ "Remove" }>
              <IconButton disabled={ entityStatus === "loading" } onClick={ onTodoListDeleted }>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid item>
          <AddItemForm disabled={ entityStatus === "loading" } addItem={ addNewTask } item="task" />
        </Grid>
        <Grid item>
          <Tasks todolistId={ id } filter={ filter } />
        </Grid>
        <Grid item alignSelf={ "center" }>
          <ButtonGroup size={ "small" }>
            <Button
              variant={ filter === "all" ? "contained" : "outlined" }
              onClick={ () => onFilterButtonClicked( "all" ) }
            >
              All
            </Button>
            <Button
              variant={ filter === "active" ? "contained" : "outlined" }
              onClick={ () => onFilterButtonClicked( "active" ) }
            >
              Active
            </Button>
            <Button
              variant={ filter === "completed" ? "contained" : "outlined" }
              onClick={ () => onFilterButtonClicked( "completed" ) }
            >
              Completed
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Card>
  );
} )
