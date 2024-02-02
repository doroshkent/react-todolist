import React from "react";
import "./App.css";
import { Box, } from "@mui/material";
import { Header } from "widgets/header/Header";
import { Todolists } from "components/todolists/Todolists";

export type FilterValuesType = "all" | "active" | "completed";
export type ItemsType = "To-do list" | "task";

function App() {
  return (
    <Box width={ "100%" } minHeight="100vh" sx={ { backgroundColor: "#f5f5f5" } }>
      <Header />
      <Todolists />
    </Box>
  );
}

export default App;
