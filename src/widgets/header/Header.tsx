import React from 'react';
import { AppBar, Grid, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material";
import { AddItemForm } from "components/addItemForm/AddItemForm";
import LoginIcon from "@mui/icons-material/Login";
import { useHeader } from "widgets/header/useHeader";

export const Header = () => {
  const { onTodolistAdded, status } = useHeader();

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
      { status === "loading" && <LinearProgress /> }
      {/*<LinearProgress />*/ }
    </AppBar>
  );
}
