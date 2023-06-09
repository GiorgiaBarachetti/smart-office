import React from 'react';
import { Button, Typography, Modal, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/routes/path';
import { MODALSTYLE } from '../../utils/const/Const';

interface Props {
  open: boolean;
  handleClose: () => void;
  idCoffee: number | undefined;
}

const ModalCoffee = ({ open, handleClose, idCoffee }: Props) => {
  const navigate = useNavigate();
  const gotoPage = () => {
    navigate(PATH.coffee);
  };

  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box component='div' sx={MODALSTYLE}>
        <Typography variant="h6" component="h1">Coffee machine, id {idCoffee}</Typography>
        <Box component='div'>
          <Button sx={{ cursor: 'pointer' }} onClick={() => gotoPage()}>COFFEE PAGE</Button>
          <Button sx={{ cursor: 'pointer', color: 'red' }} onClick={() => handleClose()}>CLOSE</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCoffee;
