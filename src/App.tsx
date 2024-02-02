import React from "react";
import "./App.css";
import { Box, Container, } from "@mui/material";
import { Header } from "widgets/header/Header";
import { Todolists } from "components/todolists/Todolists";
import { useSelector } from "react-redux";
import { AppRootStateType } from "state/store";
import { TodoListStateType } from "state/todolistsReducer";

export type FilterValuesType = "all" | "active" | "completed";
export type ItemsType = "To-do list" | "task";

function App() {
  const todolists = useSelector<AppRootStateType, TodoListStateType>( state => state.todolists );
  return (
    <Box width={ "100%" } minHeight="100vh" sx={ { backgroundColor: "#f5f5f5" } }>
      <Header />
      <Container maxWidth={ "xl" } sx={ { marginTop: "15px" } }>
        { todolists.length > 0
          ? <Todolists todolists={todolists} />
          : <p style={ { fontStyle: "italic", opacity: "0.5", textAlign: "center" } }>You have no todolists yet</p> }
      </Container>
    </Box>
  );
}

export default App;
