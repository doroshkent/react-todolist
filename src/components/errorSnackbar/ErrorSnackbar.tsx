import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useErrorSnackbar } from "components/errorSnackbar/useErrorSnackbar";

export const ErrorSnackbar = () => {
  const { error, handleClose } = useErrorSnackbar()

  return (
    <div>
      <Snackbar open={ !!error } autoHideDuration={ 6000 } onClose={ handleClose }>
        <Alert
          onClose={ handleClose }
          severity="error"
          variant="filled"
          sx={ { width: '100%' } }
        >
          { error }
        </Alert>
      </Snackbar>
    </div>
  );
}
