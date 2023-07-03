import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/routes/path';
import { ButtonGroup, Button, Box, Modal, Typography } from '@mui/material';
import { PrinterStatus } from '../../utils/interfaces/Interfaces';
import { baseURL, urlTplink } from '../../utils/fetch/api';
import { MODALSTYLE } from '../../utils/const/Const';

interface Props {
  open: boolean;
  idPrinter: number | undefined;
  printerStatus: PrinterStatus[]
  handleClose: () => void;
  fetchPrinter: () => void;
  fetchPrinterStatus: () => void
}

const ModalPrinter = ({ open, idPrinter, printerStatus, handleClose, fetchPrinter, fetchPrinterStatus }: Props) => {

  const navigate = useNavigate();
  const gotoPage = () => {
    navigate(PATH.printer);
  };

  const [refreshDatas, setRefreshDatas] = useState<boolean>(false);

  const switchOnPrinter = async () => {
    try {
      if (printerStatus) {
        await fetch(`${baseURL}${urlTplink}/on`, { method: 'POST' });
        setRefreshDatas((prevState) => !prevState);
      }
    } catch (error) {
      console.log('Error switching on the printer:', error);
    }
  };

  const switchOffPrinter = async () => {
    try {
      if (printerStatus) {
        await fetch(`${baseURL}${urlTplink}/off`, { method: 'POST' });
        setRefreshDatas((prevState) => !prevState);
      }
    } catch (error) {
      console.log('Error switching off the printer:', error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => fetchPrinter(), 1000)
    const timeoutStatus = setTimeout(() => fetchPrinterStatus(), 1000)
    return () => {
      clearTimeout(timeout)
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
      </Box>
    </Modal>
  );
};

export default ModalPrinter;
