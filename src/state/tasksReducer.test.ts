import { v4 } from "uuid";
import {FilterValuesType, TasksStateType, TodoListType} from "../App";
import {
  addTodolistAC,
  changeFilterAC,
  removeTodolistAC,
  renameTodolistAC,
  todolistReducer,
} from "./todolistReducer";
import {addTaskAC, changeTaskProgressAC, removeTaskAC, renameTaskAC, tasksReducer} from "./tasksReducer";

const todolistId1 = v4();
const todolistId2 = v4();

const startState: TasksStateType = {
  [todolistId1]: [
    { id: '1', title: "HTML&CSS", isDone: true },
    { id: '2', title: "JS", isDone: true },
    { id: '3', title: "React", isDone: false },
  ],
  [todolistId2]: [
    { id: '1', title: "milk", isDone: true },
    { id: '2', title: "book", isDone: true },
    { id: '3', title: "freedom", isDone: false },
  ],
};

const newTitle = "new task";

test("correct task from correct todolist is removed", () => {
  const endState = tasksReducer(startState, removeTaskAC('2', todolistId2));

  expect(endState[todolistId1].length).toBe(3);
  expect(endState[todolistId2].length).toBe(2);
  expect(endState[todolistId2].every(task => task.id !== '2')).toBeTruthy();
  expect(endState[todolistId1].every(task => task.id !== '2')).toBeFalsy();
});

test("correct task is renamed", () => {
  const endState = tasksReducer(
    startState,
    renameTaskAC('2', todolistId2, newTitle)
  );

  expect(endState[todolistId1][1].title).toBe("JS");
  expect(endState[todolistId2][1].title).toBe(newTitle);
});

test("new correct task is added to correct todolist", () => {
  const endState = tasksReducer(startState, addTaskAC(todolistId2, newTitle));

  expect(endState[todolistId1].length).toBe(3);
  expect(endState[todolistId2].length).toBe(4);
  expect(endState[todolistId2][0].id).toBeDefined();
  expect(endState[todolistId2][0].title).toBe(newTitle);
  expect(endState[todolistId2][0].isDone).toBeFalsy();
});

test("progress is changed in correct task", () => {
  const endState = tasksReducer(
    startState,
    changeTaskProgressAC('2', todolistId2, false)
  );

  expect(endState[todolistId1][1].isDone).toBeTruthy()
  expect(endState[todolistId2][1].isDone).toBeFalsy()
});
