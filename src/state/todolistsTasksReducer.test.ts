import { TodoListType } from "App";
import { addTodolistAC, todolistsReducer } from "./todolistsReducer";
import { tasksReducer, TasksStateType } from "./tasksReducer";

test('new array should be added when new todolist is added', () => {
  const startState: TasksStateType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
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
