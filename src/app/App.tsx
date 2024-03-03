import React from "react";
import "app/App.css";
import { Box, } from "@mui/material";
import { Header } from "widgets/header/Header";
import { Todolists } from "features/todolists/Todolists";
import { ErrorSnackbar } from "components/errorSnackbar/ErrorSnackbar";

export type ItemsType = "todolist" | "task";

function App() {
  return (
    <Box width={ "100%" } minHeight="100vh" sx={ { backgroundColor: "#f5f5f5" } }>
      <Header />
      <Todolists />
      <ErrorSnackbar />
    </Box>
  );
}

export default App;
