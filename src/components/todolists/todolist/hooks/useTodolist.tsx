import React, { useCallback, useState } from "react";
import { FilterValuesType } from "App";
import { useDispatch } from "react-redux";
import { addTaskAC } from "state/tasksReducer";
import { changeFilterAC, removeTodolistAC, renameTodolistAC } from "state/todolistsReducer";

export const useTodolist = (id: string) => {
  const [ titleEditMode, setTitleEditMode ] = useState( false );
  const toggleTitleEditMode = useCallback( (toggleValue: boolean) =>
    setTitleEditMode( toggleValue ), [] );

  const dispatch = useDispatch();

  const onTodoListDeleted = useCallback( () => {
    dispatch( removeTodolistAC( id ) )
  }, [ id ] );

  const onTodoListRenamed = useCallback( (newTitle: string) => {
    dispatch( renameTodolistAC( id, newTitle ) )
  }, [ id ] );

  const addNewTask = useCallback( (title: string) => {
    dispatch( addTaskAC( id, title ) );
  }, [ id ] );

  const onFilterButtonClicked = useCallback( (value: FilterValuesType) => {
    dispatch( changeFilterAC( id, value ) )
  }, [ id ] )

  return {
    titleEditMode,
    onTodoListRenamed,
    toggleTitleEditMode,
    onTodoListDeleted,
    addNewTask,
    onFilterButtonClicked
  }
}
