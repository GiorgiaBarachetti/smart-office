import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/routes/path';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import LightsPage from '../../pages/Layout/Lights/LightsPage';

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