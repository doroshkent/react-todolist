import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { CardWrapper } from "styles/cards/CardWrapper";
import { TasksWrapper } from "styles/cards/TasksWrapper";
import { TaskWrapper } from "styles/cards/TaskWrapper";
import { FilterButton } from "styles/common/FilterButton";
import { Input } from "styles/common/Input";
import { FilterValuesType } from "../App";
import { ErrorMessage } from "../styles/common/ErrorMessage";

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
  filter: FilterValuesType;
};

export function ToDoList({
  title,
  tasks,
  removeTask,
  filterTasks,
  addTask,
  changeTaskProgress,
  filter,
}: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onSetNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskTitle(e.currentTarget.value);
  const onAddTaskHandler = () => {
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim());
      setNewTaskTitle("");
    } else {
      setError("Input is required");
    }
  };
  const onEnterPressHandler = (e: KeyboardEvent) => {
    setError(null);
    if (e.key === "Enter") {
      onAddTaskHandler();
    }
  };
  const onAllClickHandler = () => {
    filterTasks("all");
  };
  const onActiveClickHandler = () => filterTasks("active");
  const onCompletedClickHandler = () => filterTasks("completed");

  return (
    <CardWrapper>
      <h2>{title}</h2>
      <div>
        <Input
          type="text"
          value={newTaskTitle}
          onChange={onSetNewTaskTitle}
          onKeyDown={onEnterPressHandler}
          $error={error}
        />
        <button onClick={onAddTaskHandler}>+</button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
      <TasksWrapper>
        {tasks.map((task) => {
          const onRemoveHandler = () => removeTask(task.id);
          const onCheckHandler = (e: ChangeEvent<HTMLInputElement>) =>
            changeTaskProgress(task.id, e.currentTarget.checked);
          return (
            <TaskWrapper key={task.id} $isDone={task.isDone}>
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
        <FilterButton onClick={onAllClickHandler}
                      $active={filter === "all"}>
          All
        </FilterButton>
        <FilterButton
          onClick={onActiveClickHandler}
          $active={filter === "active"}
        >
          Active
        </FilterButton>
        <FilterButton
          onClick={onCompletedClickHandler}
          $active={filter === "completed"}
        >
          Completed
        </FilterButton>
      </div>
    </CardWrapper>
  );
}
