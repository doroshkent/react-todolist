import React, { ChangeEvent } from "react";
import { CardWrapper } from "styles/cards/CardWrapper";
import { TasksWrapper } from "styles/cards/TasksWrapper";
import { TaskWrapper } from "styles/cards/TaskWrapper";
import { FilterButton } from "styles/common/FilterButton";
import { FilterValuesType } from "../App";
import { AddItemForm } from "./AddItemForm";

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
  removeTodoList,
}: PropsType) {
  const onDeleteTodoListHandler = () => removeTodoList(id);
  const addNewTask = (title: string) => {
    addTask(title, id);
  };

  const onAllClickHandler = () => {
    filterTasks("all", id);
  };
  const onActiveClickHandler = () => filterTasks("active", id);
  const onCompletedClickHandler = () => filterTasks("completed", id);

  return (
    <CardWrapper>
      <h2>
        {title} <button onClick={onDeleteTodoListHandler}>x</button>
      </h2>
      <AddItemForm addItem={addNewTask} />
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
