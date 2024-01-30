import { v4 } from "uuid";
import { TasksStateType } from "App";
import {
  addTaskAC,
  changeTaskProgressAC,
  removeTaskAC,
  renameTaskAC,
  tasksReducer,
} from "./tasksReducer";
import { addTodolistAC, removeTodolistAC } from "./todolistsReducer";

const todolistId1 = v4();
const todolistId2 = v4();

const startState: TasksStateType = {
  [todolistId1]: [
    { id: "1", title: "HTML&CSS", isDone: true },
    { id: "2", title: "JS", isDone: true },
    { id: "3", title: "React", isDone: false },
  ],
  [todolistId2]: [
    { id: "1", title: "milk", isDone: true },
    { id: "2", title: "book", isDone: true },
    { id: "3", title: "tea", isDone: false },
  ],
};

const newTitle = "new task";

test("correct task from correct todolist is removed", () => {
  const endState = tasksReducer(startState, removeTaskAC("2", todolistId2));

  expect(endState).toEqual({
    [todolistId1]: [
      {id: "1", title: "HTML&CSS", isDone: true},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    [todolistId2]: [
      {id: "1", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  })
});

test("correct task is renamed", () => {
  const endState = tasksReducer(
    startState,
    renameTaskAC("2", todolistId2, newTitle)
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
    changeTaskProgressAC("2", todolistId2, false)
  );

  expect(endState[todolistId1][1].isDone).toBeTruthy();
  expect(endState[todolistId2][1].isDone).toBeFalsy();
});

test("new property with new array should be added when new todolist is added", () => {
  const endState = tasksReducer(startState, addTodolistAC("new todolist"));

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== todolistId1 && k !== todolistId2);
  if (!newKey) {
    throw new Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property whit todolistId should be deleted", () => {
  const endState = tasksReducer(startState, removeTodolistAC(todolistId2));

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[todolistId2]).toBeUndefined();
});
