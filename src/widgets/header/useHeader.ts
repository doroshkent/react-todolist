import { useCallback } from "react";
import { addTodolistTC } from "state/todolistsReducer";
import { useAppDispatch } from "state/store";

export const useHeader = () => {
  const dispatch = useAppDispatch()
  const onTodolistAdded = useCallback( (title: string) => {
    dispatch( addTodolistTC( title ) );
  }, [] );

  return { onTodolistAdded }
}