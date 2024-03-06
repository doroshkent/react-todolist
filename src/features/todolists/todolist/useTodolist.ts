import { useCallback, useState } from "react";
import { addTaskTC } from "state/tasks-reducer";
import { changeFilterAC, FilterValuesType, removeTodolistTC, renameTodolistTC } from "state/todolists-reducer";
import { useAppDispatch } from "state/store";

export const useTodolist = (id: string) => {
  const [ titleEditMode, setTitleEditMode ] = useState( false );
  const toggleTitleEditMode = useCallback( (toggleValue: boolean) =>
    setTitleEditMode( toggleValue ), [] );

  const dispatch = useAppDispatch();

  const onTodoListDeleted = useCallback( () => {
    dispatch( removeTodolistTC( id ) )
  }, [ id ] );

  const onTodoListRenamed = useCallback( (newTitle: string) => {
    dispatch( renameTodolistTC( id, newTitle ) )
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
