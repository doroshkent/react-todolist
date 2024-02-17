import { addTodolistAC, TodolistDomainType, todolistsReducer } from "./todolistsReducer";
import { tasksReducer, TasksStateType } from "./tasksReducer";
import { TaskPriorities, TaskStatuses } from "api/todolists-api";

test('new array should be added when new todolist is added', () => {
  const startState: TasksStateType = {
    'todolistId1': [
      {id: '1', title: 'CSS', status: TaskStatuses.New, addedDate: "",
        order: 0, deadline: null, description: "", priority: TaskPriorities.Low,
        startDate: null, todoListId: "todolistId1"},
      {id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate: "",
        order: 0, deadline: null, description: "", priority: TaskPriorities.Low,
        startDate: null, todoListId: "todolistId1"},
      {id: '3', title: 'React', status: TaskStatuses.New, addedDate: "",
        order: 0, deadline: null, description: "", priority: TaskPriorities.Low,
        startDate: null, todoListId: "todolistId1"}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', status: TaskStatuses.New, addedDate: "",
        order: 0, deadline: null, description: "", priority: TaskPriorities.Low,
        startDate: null, todoListId: "todolistId2"},
      {id: '2', title: 'milk', status: TaskStatuses.Completed, addedDate: "",
        order: 0, deadline: null, description: "", priority: TaskPriorities.Low,
        startDate: null, todoListId: "todolistId2"},
      {id: '3', title: 'tea', status: TaskStatuses.New, addedDate: "",
        order: 0, deadline: null, description: "", priority: TaskPriorities.Low,
        startDate: null, todoListId: "todolistId2"}
    ]
  }

  const action = addTodolistAC('new todolist')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("ids should be equal", () => {
  const tasksStartState: TasksStateType = {};
  const todolistsStartState: TodolistDomainType[] = [];

  const action = addTodolistAC("new tl");

  const tasksEndState = tasksReducer(tasksStartState, action);
  const todolistsEndState = todolistsReducer(todolistsStartState, action);

  const keys = Object.keys(tasksEndState);
  const idFromTasks = keys[0];
  const idFromTodolists = todolistsEndState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});
