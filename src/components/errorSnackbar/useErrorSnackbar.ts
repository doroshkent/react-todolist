import { useAppDispatch, useAppSelector } from "state/store";
import * as React from "react";
import { setAppRequestErrorAC } from "state/app-reducer";

export const useErrorSnackbar = () => {
  const error = useAppSelector<string | null>( state => state.app.error )
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch( setAppRequestErrorAC( null ) )
  };
  return {
    error, handleClose
  }
}
