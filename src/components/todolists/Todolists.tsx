import React, { memo } from 'react';
import { Grid } from "@mui/material";
import { ToDoList } from "components/todolist/ToDoList";
import { FilterValuesType } from "App";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TodolistsPropsType = {
  todolists: TodoListType[]
}

export const Todolists = memo( ({ todolists }: TodolistsPropsType) => {
  return (
    <Grid container gap={ "10px" }>
      { todolists.map( (tl) => {
        return (
          <Grid item key={ tl.id }>
            <ToDoList { ...tl } />
          </Grid>
        );
      } ) }
    </Grid>
  );
} );
