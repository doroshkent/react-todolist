import { v4 } from "uuid";
import {
  addTaskAC,
  changeTaskProgressAC,
  removeTaskAC,
  renameTaskAC,
  tasksReducer,
  TasksStateType,
} from "./tasksReducer";
import { addTodolistAC, removeTodolistAC } from "./todolistsReducer";
import { TaskPriorities, TaskStatuses } from "api/todolists-api";

const todolistId1 = v4();
const todolistId2 = v4();

const startState: TasksStateType = {
  [todolistId1]: [
    { id: "1", title: "HTML&CSS", status: TaskStatuses.Completed, addedDate: "",
      order: 0, deadline: null, description: "", priority: TaskPriorities.Low,
      startDate: null, todoListId: todolistId1},
    { id: "2", title: "JS", status: TaskStatuses.Completed, addedDate: "",
      order: 0, deadline: null, description: "", priority: TaskPriorities.Low,
      startDate: null, todoListId: todolistId1 },
    { id: "3", title: "React", status: TaskStatuses.New, addedDate: "",
      order: 0, deadline: null, description: "", priority: TaskPriorities.Low,
      startDate: null, todoListId: todolistId1 },
  ],
  [todolistId2]: [
    { id: "1", title: "milk", status: TaskStatuses.Completed, addedDate: "",
      order: 0, deadline: null, description: "", priority: TaskPriorities.Low,
      startDate: null, todoListId: todolistId2},
    { id: "2", title: "book", status: TaskStatuses.Completed, addedDate: "",
      order: 0, deadline: null, description: "", priority: TaskPriorities.Low,
      startDate: null, todoListId: todolistId2 },
    { id: "3", title: "tea", status: TaskStatuses.New, addedDate: "",
      order: 0, deadline: null, description: "", priority: TaskPriorities.Low,
      startDate: null, todoListId: todolistId2 },
  ],
};

const newTitle = "new task";

test( "correct task from correct todolist is removed", () => {
  const endState = tasksReducer( startState, removeTaskAC( todolistId2, "2" ) );

  expect( endState ).toEqual( {
    [todolistId1]: [
      { id: "1", title: "HTML&CSS", status: TaskStatuses.Completed, addedDate: "",
        order: 0, deadline: null, description: "", priority: TaskPriorities.Low,
        startDate: null, todoListId: todolistId1 },
      { id: "2", title: "JS", status: TaskStatuses.Completed, addedDate: "",
        order: 0, deadline: null, description: "", priority: TaskPriorities.Low,
        startDate: null, todoListId: todolistId1 },
      { id: "3", title: "React", status: TaskStatuses.New, addedDate: "",
        order: 0, deadline: null, description: "", priority: TaskPriorities.Low,
        startDate: null, todoListId: todolistId1 }
    ],
    [todolistId2]: [
      { id: "1", title: "milk", status: TaskStatuses.Completed, addedDate: "",
        order: 0, deadline: null, description: "", priority: TaskPriorities.Low,
        startDate: null, todoListId: todolistId2 },
      { id: "3", title: "tea", status: TaskStatuses.New, addedDate: "",
        order: 0, deadline: null, description: "", priority: TaskPriorities.Low,
        startDate: null, todoListId: todolistId2 }
    ]
  } )
} );

test( "correct task is renamed", () => {
  const endState = tasksReducer(
    startState,
    renameTaskAC( todolistId2, "2", newTitle )
  );

  expect( endState[todolistId1][1].title ).toBe( "JS" );
  expect( endState[todolistId2][1].title ).toBe( newTitle );
} );

test( "new correct task is added to correct todolist", () => {
  const endState = tasksReducer( startState, addTaskAC( todolistId2, newTitle ) );

  expect( endState[todolistId1].length ).toBe( 3 );
  expect( endState[todolistId2].length ).toBe( 4 );
  expect( endState[todolistId2][0].id ).toBeDefined();
  expect( endState[todolistId2][0].title ).toBe( newTitle );
  expect( endState[todolistId2][0].status ).toBe(TaskStatuses.New);
} );

test( "progress is changed in correct task", () => {
  const endState = tasksReducer(
    startState,
    changeTaskProgressAC( todolistId2, "2", TaskStatuses.New )
  );

  expect( endState[todolistId1][1].status ).toBe(TaskStatuses.Completed);
  expect( endState[todolistId2][1].status ).toBe(TaskStatuses.New);
} );

test( "new property with new array should be added when new todolist is added", () => {
  const endState = tasksReducer( startState, addTodolistAC( "new todolist" ) );

  const keys = Object.keys( endState );
  const newKey = keys.find( (k) => k !== todolistId1 && k !== todolistId2 );
  if (!newKey) {
    throw new Error( "new key should be added" );
  }

  expect( keys.length ).toBe( 3 );
  expect( endState[newKey] ).toEqual( [] );
} );

test( "property with todolistId should be deleted", () => {
  const endState = tasksReducer( startState, removeTodolistAC( todolistId2 ) );

  const keys = Object.keys( endState );

  expect( keys.length ).toBe( 1 );
  expect( endState[todolistId2] ).toBeUndefined();
} );
