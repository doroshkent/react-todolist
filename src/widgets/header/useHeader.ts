import { useCallback } from "react";
import { addTodolistTC } from "state/todolists-reducer";
import { useAppDispatch, useAppSelector } from "state/store";
import { RequestStatusType } from "state/app-reducer";

export const useHeader = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector<RequestStatusType>( state => state.app.status )

  const onTodolistAdded = useCallback( (title: string) => {
    dispatch( addTodolistTC( title ) );
  }, [] );

  return { onTodolistAdded, status }
}
