import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/routes/path';
import { MODALSTYLE } from '../../utils/const/Const';

interface Props {
  open: boolean;
  handleClose: () => void;
  idEnergy: number | undefined;
}

const ModalEnergy = ({ open, handleClose, idEnergy }: Props) => {
  const navigate = useNavigate();

  const gotoPage = () => {
    navigate(PATH.energy);
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
        <Box sx={MODALSTYLE}>
          <Typography variant="h6" component="h1">Bolt, id {idEnergy}</Typography>

          <Box>
            <Button sx={{cursor:'pointer'}} onClick={gotoPage}>GO TO ENERGY PAGE</Button>
            <Button sx={{cursor:'pointer'}} onClick={handleClose}>CLOSE</Button>
          </Box>

        </Box>
      </Modal>
    </Box>
  );
};

export default ModalEnergy;
