import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/routes/path';
import { ButtonGroup } from '@mui/material';
import { PrinterStatus } from '../../utils/interfaces/Interfaces';
import { baseURL, urlTplink } from '../../utils/fetch/api';
import { MODALSTYLE } from '../../utils/const/Const';

interface Props {
  open: boolean;
  idPrinter: number | undefined;
  printerStatus: PrinterStatus[]
  handleClose: () => void;
  fetchPrinterStatus: () => void
}

const ModalPrinter = ({ open, idPrinter, printerStatus, handleClose, fetchPrinterStatus}: Props) => {
  const navigate = useNavigate();

  const gotoPage = () => {
    navigate(PATH.printer);
  };

  const [printerStatu, setPrinterStatu] = useState<boolean>(false);
  

  useEffect(() => {
    setTimeout(() => {()=> fetchPrinterStatus()}, 1000)
  }, [printerStatu]);


  const switchOnPrinter = async () => {
    try {
      await fetch(`${baseURL}${urlTplink}/on`, { method: 'POST' });
      setPrinterStatu((prevState)=>!prevState);
    } catch (error) {
      console.log('Error switching on the printer:', error);
    }
  };

  const switchOffPrinter = async () => {
    try {
      await fetch(`${baseURL}${urlTplink}/off`, { method: 'POST' });
      setPrinterStatu((prevState)=>!prevState);

    } catch (error) {
      console.log('Error switching off the printer:', error);
    }
  };

  return (
    <Box
      onClick={() => {
        // chiude modalquando clicchi di fuori
        handleClose();
      }}>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component='div' sx={MODALSTYLE}>
          <Typography variant="h6" component="h1">Printer, id {idPrinter !=undefined ? idPrinter : ''}</Typography>
          <ButtonGroup>
            <Button sx={{cursor:'pointer'}} onClick={() => switchOnPrinter()} disabled={idPrinter !== undefined && printerStatus[idPrinter]?.stato_presa === true}>ON</Button>
            <Button sx={{cursor:'pointer'}} onClick={() => switchOffPrinter()} disabled={idPrinter !== undefined && printerStatus[idPrinter]?.stato_presa === false}>OFF</Button>
          </ButtonGroup>
          <Box component='div'>
            <Button sx={{cursor:'pointer'}} onClick={()=>gotoPage()}>GO TO PRINTER PAGE</Button>
            <Button sx={{cursor:'pointer'}} onClick={()=>handleClose()}>CLOSE</Button>
          </Box>

        </Box>
      </Modal>
    </Box>
  );
};

export default ModalPrinter;