import {v4} from "uuid";
import {FilterValuesType, TodoListType} from "../App";
import {addTodolistAC, changeFilterAC, removeTodolistAC, renameTodolistAC, todolistReducer} from "./todolistReducer";


test("correct todolist is removed", () => {
  let todolistId1 = v4();
  let todolistId2 = v4();

  const startState: TodoListType[] = [
    {id: todolistId1, title: "To Learn", filter: "all"},
    {id: todolistId2, title: "To Buy", filter: "all"},
  ]

  const endState = todolistReducer(startState, removeTodolistAC(todolistId2));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId1);
})

test("correct todolist is renamed", () => {
  let todolistId1 = v4();
  let todolistId2 = v4();

  const startState: TodoListType[] = [
    {id: todolistId1, title: "To Learn", filter: "all"},
    {id: todolistId2, title: "To Buy", filter: "all"},
  ]

  const newTitle = "new title"

  const endState = todolistReducer(startState, renameTodolistAC(todolistId2, newTitle));

  expect(endState[0].title).toBe(startState[0].title);
  expect(endState[1].title).toBe(newTitle);
})


test("new correct todolist is added", ()=> {
  const startState: TodoListType[] = [
    {id: v4(), title: "To Learn", filter: "all"},
    {id: v4(), title: "To Buy", filter: "all"},
  ]

  const newTitle: string = "new tl"

  const endState = todolistReducer(startState, addTodolistAC(newTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTitle);
  expect(endState[2].filter).toBe("all")
})

test("correct filter is changed", () => {
  let todolistId1 = v4();
  let todolistId2 = v4();

  const startState: TodoListType[] = [
    {id: todolistId1, title: "To Learn", filter: "all"},
    {id: todolistId2, title: "To Buy", filter: "all"},
  ]

  const newFilter: FilterValuesType = "completed";

  const endState = todolistReducer(startState, changeFilterAC(todolistId2, newFilter));

  expect(endState[0].filter).toBe(startState[0].filter);
  expect(endState[1].filter).toBe(newFilter);
})
