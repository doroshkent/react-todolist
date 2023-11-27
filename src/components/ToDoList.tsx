import React, { ChangeEvent } from "react";
import { FilterValuesType } from "../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Paper } from "@mui/material";

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

export function ToDoList({
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
}: PropsType) {
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
    <Paper>
      <h2>
        <EditableSpan title={title} renameItem={onRenameTodoListHandler} />{" "}
        <button onClick={onDeleteTodoListHandler}>x</button>
      </h2>
      <AddItemForm addItem={addNewTask} item="task" />
      {tasks.map((task) => {
        const onRemoveHandler = () => removeTask(task.id, id);
        const onCheckHandler = (e: ChangeEvent<HTMLInputElement>) =>
          changeTaskProgress(task.id, e.currentTarget.checked, id);
        const onRenameHandler = (newTitle: string) => {
          renameTask(task.id, newTitle, id);
        };
        return (
          <li key={task.id}>
            <input
              type="checkbox"
              onChange={onCheckHandler}
              checked={task.isDone}
            />
            <EditableSpan title={task.title} renameItem={onRenameHandler} />
            <button onClick={onRemoveHandler}>X</button>
          </li>
        );
      })}
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </Paper>
  );
}
