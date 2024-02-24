import { useCallback } from "react";
import { addTodolistAC } from "state/todolistsReducer";
import { useAppDispatch } from "state/store";

export const useHeader = () => {
  const dispatch = useAppDispatch()
  const onTodolistAdded = useCallback((title: string) => {
    dispatch( addTodolistAC( title ) );
  }, []);

  return { onTodolistAdded }
}
