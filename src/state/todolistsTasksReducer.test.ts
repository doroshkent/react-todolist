import { TasksStateType, TodoListType } from "../App";
import { addTodolistAC, todolistsReducer } from "./todolistsReducer";
import { tasksReducer } from "./tasksReducer";

test("ids should be equal", () => {
  const tasksStartState: TasksStateType = {};
  const todolistsStartState: TodoListType[] = [];

  const action = addTodolistAC("new tl");

  const tasksEndState = tasksReducer(tasksStartState, action);
  const todolistsEndState = todolistsReducer(todolistsStartState, action);

  const keys = Object.keys(tasksEndState);
  const idFromTasks = keys[0];
  const idFromTodolists = todolistsEndState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});
