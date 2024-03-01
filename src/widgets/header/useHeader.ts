import { useCallback } from "react";
import { addTodolistTC } from "state/todolistsReducer";
import { useAppDispatch, useAppSelector } from "state/store";
import { RequestStatusType } from "state/appReducer";

export const useHeader = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector<RequestStatusType>( state => state.app.status )

  const onTodolistAdded = useCallback( (title: string) => {
    dispatch( addTodolistTC( title ) );
  }, [] );

  return { onTodolistAdded, status }
}
