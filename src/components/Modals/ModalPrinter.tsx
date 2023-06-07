import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/routes/path';
import { ButtonGroup } from '@mui/material';
import { Printer } from '../../utils/interfaces/Interfaces';

interface Props {
  open: boolean;
  handleClose: () => void;
  idPrinter: number | undefined;
}

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const ModalPrinter = ({ open, handleClose, idPrinter }: Props) => {
  const navigate = useNavigate();

  const gotoPage = () => {
    navigate(PATH.printer);
  };


  const [statoPresa, setStatoPresa] = useState<boolean>(false);

  const switchOnPrinter = async () => {
    try {
      await fetch('http://192.168.1.6:3000/api/tplink/on', { method: 'POST' });
      setStatoPresa(true);
    } catch (error) {
      console.log('Error switching on the printer:', error);
    }
  };

  const switchOffPrinter = async () => {
    try {
      await fetch('http://192.168.1.6:3000/api/tplink/off', { method: 'POST' });
      setStatoPresa(false);
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
        <Box sx={style}>
          <Typography variant="h6" component="h1">Printer, id {idPrinter !=undefined ? idPrinter : 'none'}</Typography>
          <ButtonGroup>
            <Button onClick={() => switchOnPrinter()} disabled={!statoPresa}>ON</Button>
            <Button onClick={() => switchOffPrinter()} disabled={statoPresa}>OFF</Button>
          </ButtonGroup>
          <Box>
            <Button onClick={gotoPage}>GO TO PRINTER PAGE</Button>
            <Button onClick={handleClose}>CLOSE</Button>
          </Box>

        </Box>
      </Modal>
    </Box>
  );
};

export default ModalPrinter;
