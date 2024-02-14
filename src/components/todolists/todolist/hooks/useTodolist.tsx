import React, { useCallback, useState } from "react";
import { FilterValuesType } from "App";
import { useDispatch } from "react-redux";
import { addTaskAC } from "state/tasksReducer";
import { addTodolistAC, changeFilterAC, removeTodolistAC, renameTodolistAC } from "state/todolistsReducer";

export const useTodolist = (id?: string) => {
  const [ titleEditMode, setTitleEditMode ] = useState( false );
  const toggleTitleEditMode = useCallback( (toggleValue: boolean) =>
    setTitleEditMode( toggleValue ), [] );

  const dispatch = useDispatch();

  const onTodoListDeleted = useCallback( () => {
    id && dispatch( removeTodolistAC( id ) )
  }, [ id ] );

  const onTodoListRenamed = useCallback( (newTitle: string) => {
    id && dispatch( renameTodolistAC( id, newTitle ) )
  }, [ id ] );

  const addNewTask = useCallback( (title: string) => {
    id && dispatch( addTaskAC( id, title ) );
  }, [ id ] );

  const onFilterButtonClicked = useCallback( (value: FilterValuesType) => {
    id && dispatch( changeFilterAC( id, value ) )
  }, [ id ] );

  const onTodolistAdded = useCallback((title: string) => {
    dispatch( addTodolistAC( title ) );
  }, []);

  return {
    titleEditMode,
    onTodoListRenamed,
    toggleTitleEditMode,
    onTodoListDeleted,
    addNewTask,
    onFilterButtonClicked,
    onTodolistAdded
  }
}
