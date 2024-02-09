import React, { memo } from 'react';
import { Container, Grid } from "@mui/material";
import { ToDoList } from "components/todolists/todolist/ToDoList";
import { FilterValuesType } from "App";
import { useSelector } from "react-redux";
import { AppRootStateType } from "state/store";
import { TodoListStateType } from "state/todolistsReducer";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export const Todolists = memo( () => {
  const todolists = useSelector<AppRootStateType, TodoListStateType>( state => state.todolists );

  return (
    <Container maxWidth={ "xl" } sx={ { marginTop: "15px" } }>
      { todolists.length > 0
        ? <Grid container gap={ "10px" }>
          { todolists.map( (tl) => {
            return (
              <Grid item key={ tl.id }>
                <ToDoList { ...tl } />
              </Grid>
            );
          } ) }
        </Grid>
        : <p style={ { fontStyle: "italic", opacity: "0.5", textAlign: "center" } }>You have no todolists yet</p> }
    </Container>
  );
} );
