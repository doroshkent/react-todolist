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
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todoListId: string) => void;
  filterTasks: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeTaskProgress: (id: string, isDone: boolean, todoListId: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todoListId: string) => void;
};

export function ToDoList({
  id,
  title,
  tasks,
  removeTask,
  filterTasks,
  addTask,
  changeTaskProgress,
  filter,
  removeTodoList
}: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onDeleteTodoListHandler = () => removeTodoList(id);

  const onSetNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);

  const onAddTaskHandler = () => {
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim(), id);
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
    filterTasks("all", id);
  };
  const onActiveClickHandler = () => filterTasks("active", id);
  const onCompletedClickHandler = () => filterTasks("completed", id);

  return (
    <CardWrapper>
      <h2>{title} <button onClick={onDeleteTodoListHandler}>x</button></h2>
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
          const onRemoveHandler = () => removeTask(task.id, id);
          const onCheckHandler = (e: ChangeEvent<HTMLInputElement>) =>
            changeTaskProgress(task.id, e.currentTarget.checked, id);
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
        <FilterButton onClick={onAllClickHandler} $active={filter === "all"}>
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
