import React from 'react';
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { AddItemForm } from "components/addItemForm/AddItemForm";
import LoginIcon from "@mui/icons-material/Login";
import { useTodolist } from "components/todolists/todolist/hooks/useTodolist";

export const Header = () => {
  const { onTodolistAdded } = useTodolist();

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent={ "space-between" } alignItems={ "center" }>
          <Grid>
            <AddItemForm addItem={ onTodolistAdded } item="todolist" />
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
}
