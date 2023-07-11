import React from 'react';
import Snackbar from '@mui/material/Snackbar';
interface Props {
  message: string,
  openSnackbar: boolean
  handleClose: () => void;
}

export default function SnackbarGeneral({ message, handleClose , openSnackbar }: Props) {

  return (
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        color="secondary"
      />
  );
}