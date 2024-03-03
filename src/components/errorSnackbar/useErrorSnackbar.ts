import { useAppDispatch, useAppSelector } from "state/store";
import * as React from "react";
import { setRequestErrorAC } from "state/appReducer";

export const useErrorSnackbar = () => {
  const error = useAppSelector<string | null>( state => state.app.error )
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch( setRequestErrorAC( null ) )
  };
  return {
    error, handleClose
  }
}
