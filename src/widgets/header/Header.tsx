import React from 'react';
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { AddItemForm } from "components/AddItemForm";
import LoginIcon from "@mui/icons-material/Login";

type HeaderPropsType = {
  addTodoList: (title: string) => void
}

export const Header: React.FC<HeaderPropsType> = ({ addTodoList }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          container
          justifyContent={ "space-between" }
          alignItems={ "center" }
        >
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
};
