import { v4 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";
import {
  addTodolistAC,
  changeFilterAC,
  removeTodolistAC,
  renameTodolistAC,
  todolistReducer,
} from "./todolistReducer";

const todolistId1 = v4();
const todolistId2 = v4();

const startState: TodoListType[] = [
  { id: todolistId1, title: "To Learn", filter: "all" },
  { id: todolistId2, title: "To Buy", filter: "all" },
];

const newTitle = "new title";

test("correct todolist is removed", () => {
  let todolistId1 = v4();
  let todolistId2 = v4();

  const startState: TodoListType[] = [
    { id: todolistId1, title: "To Learn", filter: "all" },
    { id: todolistId2, title: "To Buy", filter: "all" },
  ];

  const endState = todolistReducer(startState, removeTodolistAC(todolistId2));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId1);
});

test("correct todolist is renamed", () => {
  const endState = todolistReducer(
    startState,
    renameTodolistAC(todolistId2, newTitle)
  );

  expect(endState[0].title).toBe("To Learn");
  expect(endState[1].title).toBe(newTitle);
});

test("new correct todolist is added", () => {
  const endState = todolistReducer(startState, addTodolistAC(newTitle));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTitle);
  expect(endState[0].filter).toBe("all");
});

test("filter is changed in correct todolist", () => {
  const newFilter: FilterValuesType = "completed";

  const endState = todolistReducer(
    startState,
    changeFilterAC(todolistId2, newFilter)
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
