import React, { useState } from "react";
import { FilterValuesType } from "App";
import { AddItemForm } from "./AddItemForm";
import { EditItem } from "./EditItem";
import { Button, ButtonGroup, Card, Grid, IconButton, List, Tooltip, Typography, } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Task } from "./Task";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: TaskType[];
  removeTask: (taskId: string, todoListId: string) => void;
  filterTasks: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeTaskProgress: (id: string, isDone: boolean, todoListId: string) => void;
  renameTask: (taskId: string, newTitle: string, id: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todoListId: string) => void;
  renameTodoList: (todoListId: string, newTitle: string) => void;
};

export const ToDoList: React.FC<PropsType> = ({
  id,
  title,
  tasks,
  removeTask,
  filterTasks,
  addTask,
  changeTaskProgress,
  renameTask,
  filter,
  removeTodoList,
  renameTodoList,
}) => {
  const [listRef] = useAutoAnimate<HTMLUListElement>();
  const [titleEditMode, setTitleEditMode] = useState(false);

  const toggleTitleEditMode = (toggleValue: boolean) =>
    setTitleEditMode(toggleValue);
  const onDeleteTodoListHandler = () => removeTodoList(id);
  const onRenameTodoListHandler = (newTitle: string) =>
    renameTodoList(id, newTitle);
  const addNewTask = (title: string) => {
    addTask(title, id);
  };

  const onAllClickHandler = () => {
    filterTasks("all", id);
  };
  const onActiveClickHandler = () => filterTasks("active", id);
  const onCompletedClickHandler = () => filterTasks("completed", id);

  return (
    <Card sx={{ padding: "15px", width: "300px" }}>
      <Grid container flexDirection={"column"}>
        <Grid
          item
          container
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item>
            {titleEditMode ? (
              <EditItem
                title={title}
                renameItem={onRenameTodoListHandler}
                toggleEditMode={toggleTitleEditMode}
              />
            ) : (
              <Typography
                variant={"h5"}
                onDoubleClick={() => toggleTitleEditMode(true)}
              >
                {title}
              </Typography>
            )}
          </Grid>
          <Grid item>
            <Tooltip title={"Remove"}>
              <IconButton onClick={onDeleteTodoListHandler}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid item>
          <AddItemForm addItem={addNewTask} item="task" />
        </Grid>
        <Grid item>
          {tasks.length > 0
          ? <List ref={listRef}>
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  title={task.title}
                  taskId={task.id}
                  todoListId={id}
                  removeTask={removeTask}
                  renameTask={renameTask}
                  changeTaskProgress={changeTaskProgress}
                  isDone={task.isDone}
                />
              ))}
            </List>
          : <p style={{fontStyle: "italic", opacity: "0.5", textAlign: "center"}}>You have no tasks yet</p>}
        </Grid>
        <Grid item alignSelf={"center"}>
          <ButtonGroup size={"small"}>
            <Button
              variant={filter === "all" ? "contained" : "outlined"}
              onClick={onAllClickHandler}
            >
              All
            </Button>
            <Button
              variant={filter === "active" ? "contained" : "outlined"}
              onClick={onActiveClickHandler}
            >
              Active
            </Button>
            <Button
              variant={filter === "completed" ? "contained" : "outlined"}
              onClick={onCompletedClickHandler}
            >
              Completed
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Card>
  );
}
