import React from "react";
import "./App.css";
import { ToDoList } from "components/ToDoList";
import { Box, Container, Grid, } from "@mui/material";
import { Header } from "widgets/header/Header";
import { addTodolistAC, TodoListStateType } from "state/todolistsReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type ItemsType = "To-do list" | "task";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, TodoListStateType>( state => state.todolists );
  const addTodoList = (title: string) => {
    dispatch( addTodolistAC( title ) );
  };

  return (
    <Box width={ "100%" } minHeight="100vh" sx={ { backgroundColor: "#f5f5f5" } }>
      <Header addTodoList={ addTodoList } />
      <Container maxWidth={ "xl" } sx={ { marginTop: "15px" } }>
        { todolists.length > 0
          ? <Grid container spacing={ 2 }>
            { todolists.map( (tl) => {
              return (
                <Grid item xs={ 3 } key={ tl.id }>
                  <ToDoList id={ tl.id } title={ tl.title } filter={ tl.filter } />
                </Grid>
              );
            } ) }
          </Grid>
          : <p style={ { fontStyle: "italic", opacity: "0.5", textAlign: "center" } }>You have no todolists yet</p> }
      </Container>
    </Box>
  );
}

export default App;
