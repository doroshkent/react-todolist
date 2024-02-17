import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { changeTaskProgressAC, removeTaskAC, renameTaskAC } from "state/tasksReducer";
import { TaskStatuses } from "api/todolists-api";

export const useTask = (id: string, todolistId: string, status: TaskStatuses) => {
  const [ editMode, setEditMode ] = useState( false );
  const dispatch = useDispatch();

  const toggleEditMode = (toggleValue: boolean) => {
    setEditMode( toggleValue )
  };

  const onTaskRemoved = useCallback(() => {
    dispatch( removeTaskAC( todolistId, id ) )}, [ todolistId, id ]
  );

  const onTaskChecked = useCallback((status: TaskStatuses) => {
    const newStatusValue = status === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch( changeTaskProgressAC( todolistId, id, newStatusValue ) );
  }, [todolistId, id, status]);

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
