import React, { memo, useCallback } from 'react';
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { AddItemForm } from "components/AddItemForm";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch } from "react-redux";
import { addTodolistAC } from "state/todolistsReducer";

export const Header = memo(() => {
  const dispatch = useDispatch();
  const addTodoList = useCallback((title: string) => {
    dispatch( addTodolistAC( title ) );
  }, []);
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent={ "space-between" } alignItems={ "center" }>
          <Grid>
            <AddItemForm addItem={ addTodoList } item="To-do list" />
          </Grid>
          <Grid>
            <Typography variant="h4" component="div" marginRight="150px">
              Tasks Board
            </Typography>
          </Grid>
          <Grid>
            <IconButton color="inherit" sx={ { marginLeft: "auto" } }>
              <LoginIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
})
