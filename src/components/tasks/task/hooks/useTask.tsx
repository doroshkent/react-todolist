import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { changeTaskProgressAC, removeTaskAC, renameTaskAC } from "state/tasksReducer";

export const useTask = (id: string, todolistId: string, isDone: boolean) => {
  const [ editMode, setEditMode ] = useState( false );
  const dispatch = useDispatch();

  const toggleEditMode = (toggleValue: boolean) => {
    setEditMode( toggleValue )
  };

  const onTaskRemoved = useCallback(() => {
    dispatch( removeTaskAC( todolistId, id ) )}, [ todolistId, id ]
  );

  const onTaskChecked = useCallback(() => {
    dispatch( changeTaskProgressAC( todolistId, id, !isDone ) );
  }, [todolistId, id, isDone]);

  const onTaskRenamed = useCallback((newTitle: string) => {
    dispatch( renameTaskAC( todolistId, id, newTitle ) );
  }, [todolistId, id]);

  return {
    editMode,
    toggleEditMode,
    onTaskRenamed,
    onTaskChecked,
    onTaskRemoved
  }
}
