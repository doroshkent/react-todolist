import { useCallback, useState } from "react";
import { addTaskTC } from "state/tasksReducer";
import { changeFilterAC, FilterValuesType, removeTodolistAC, renameTodolistAC } from "state/todolistsReducer";
import { useAppDispatch } from "state/store";

export const useTodolist = (id: string) => {
  const [ titleEditMode, setTitleEditMode ] = useState( false );
  const toggleTitleEditMode = useCallback( (toggleValue: boolean) =>
    setTitleEditMode( toggleValue ), [] );

  const dispatch = useAppDispatch();

  const onTodoListDeleted = useCallback( () => {
    dispatch( removeTodolistAC( id ) )
  }, [ id ] );

  const onTodoListRenamed = useCallback( (newTitle: string) => {
    dispatch( renameTodolistAC( id, newTitle ) )
  }, [ id ] );

  const addNewTask = useCallback( (title: string) => {
    dispatch( addTaskTC( id, title ) );
  }, [ id ] );

  const onFilterButtonClicked = useCallback( (value: FilterValuesType) => {
    dispatch( changeFilterAC( id, value ) )
  }, [ id ] );

  return {
    titleEditMode,
    onTodoListRenamed,
    toggleTitleEditMode,
    onTodoListDeleted,
    addNewTask,
    onFilterButtonClicked,
  }
}
