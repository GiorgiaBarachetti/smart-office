import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/routes/path';
import { ButtonGroup, Button, Box, Modal, Typography } from '@mui/material';
import { PrinterStatus } from '../../utils/interfaces/Interfaces';
import { baseURL, urlTplink } from '../../utils/fetch/api';
import { MODALSTYLE } from '../../utils/const/Const';
import SnackbarGeneral from '../Snackbar/SnackbarGeneral';

interface Props {
  open: boolean;
  idPrinter: number | undefined;
  printerStatus: PrinterStatus[]
  handleClose: () => void;
  fetchPrinter: () => void;
  fetchPrinterStatus: () => void
}

const ModalPrinter = ({ open, idPrinter, printerStatus, handleClose, fetchPrinterStatus }: Props) => {
  const [message, setMessage] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackBar = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    (false);
    setMessage('')
  };

  const navigate = useNavigate();
  const gotoPage = () => {
    navigate(PATH.printer);
  };

  const [refreshDatas, setRefreshDatas] = useState<boolean>(false);

  const switchOnPrinter = async () => {
    try {
      if (printerStatus) {
        const response = await fetch(`${baseURL}${urlTplink}/on`, { method: 'POST' });
        setRefreshDatas((prevState) => !prevState);
        if(response.ok){
          throw new Error
      }
      }
    } catch (error) {
      setOpenSnackbar(true)
      setMessage(`Error switching on the printer`);
    }
  };

  const switchOffPrinter = async () => {
    try {
      if (printerStatus) {
        const response = await fetch(`${baseURL}${urlTplink}/off`, { method: 'POST' });
        setRefreshDatas((prevState) => !prevState);
        if(response.ok){
          throw new Error
      }
      }
    } catch (error) {
      setOpenSnackbar(true)
      setMessage(`Error switching off the printer`);
    }
  };

  useEffect(() => {
    const timeoutStatus = setTimeout(() => fetchPrinterStatus(), 1000)
    return () => {
      clearTimeout(timeoutStatus)
    }
  }, [refreshDatas]);

  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box component='div' sx={MODALSTYLE}>
        <Typography variant="h6" component="h1">Printer, id {idPrinter != undefined ? idPrinter : ''}</Typography>
        <ButtonGroup>
          <Button sx={{ cursor: 'pointer' }} onClick={() => switchOnPrinter()} disabled={printerStatus != undefined && printerStatus[0]?.stato_presa === true}>ON</Button>
          <Button sx={{ cursor: 'pointer' }} onClick={() => switchOffPrinter()} disabled={printerStatus != undefined && printerStatus[0]?.stato_presa === false}>OFF</Button>
        </ButtonGroup>
        <Box component='div'>
          <Button sx={{ cursor: 'pointer' }} onClick={() => gotoPage()}>PRINTER PAGE</Button>
          <Button sx={{ cursor: 'pointer', color: 'red' }} onClick={() => handleClose()}>CLOSE</Button>
        </Box>
      {message != '' ? <SnackbarGeneral openSnackbar={openSnackbar} handleClose={() => handleCloseSnackBar()} message={message} /> : null}
      </Box>
    </Modal>
  );
};

export default ModalPrinter;
