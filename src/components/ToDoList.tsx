import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { CardWrapper } from "styles/cards/CardWrapper";
import { TasksWrapper } from "styles/cards/TasksWrapper";
import { TaskWrapper } from "styles/cards/TaskWrapper";
import { FilterValuesType } from "../App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  filterTasks: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskProgress: (id: string, isDone: boolean) => void;
};

export function ToDoList({
  title,
  tasks,
  removeTask,
  filterTasks,
  addTask,
  changeTaskProgress,
}: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const onSetNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskTitle(e.currentTarget.value);
  const onAddTaskHandler = () => {
    addTask(newTaskTitle);
    setNewTaskTitle("");
  };
  const onEnterPressHandler = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      onAddTaskHandler();
    }
  };
  const onAllClickHandler = () => filterTasks("all");
  const onActiveClickHandler = () => filterTasks("active");
  const onCompletedClickHandler = () => filterTasks("completed");
  return (
    <CardWrapper>
      <h2>{title}</h2>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={onSetNewTaskTitle}
          onKeyDown={onEnterPressHandler}
        />
        <button onClick={onAddTaskHandler}>+</button>
      </div>
      <TasksWrapper>
        {tasks.map((task) => {
          const onRemoveHandler = () => removeTask(task.id);
          const onCheckHandler = (e: ChangeEvent<HTMLInputElement>) =>
            changeTaskProgress(task.id, e.currentTarget.checked);
          return (
            <TaskWrapper key={task.id}>
              <input
                type="checkbox"
                onChange={onCheckHandler}
                checked={task.isDone}
              />
              <span>{task.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </TaskWrapper>
          );
        })}
      </TasksWrapper>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </CardWrapper>
  );
}
