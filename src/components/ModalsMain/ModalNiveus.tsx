import React from 'react';
import { Button, Typography, Modal, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/routes/path';
import { MODALSTYLE } from '../../utils/const/Const';

interface Props {
  open: boolean;
  handleClose: () => void;
  idNiveus: number | undefined;
}

const ModalNiveus = ({ open, handleClose, idNiveus }: Props) => {
  const navigate = useNavigate();

  const gotoPage = () => {
    navigate(PATH.niveus);
  };

  return (
    <Modal
      open={open}
      onClose={()=>handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component='div' sx={MODALSTYLE}>
        <Typography variant="h6" component="h1">Niveus, id {idNiveus}</Typography>
        <Box component='div'>
          <Button sx={{ cursor: 'pointer' }} onClick={() => gotoPage()}>NIVEUS PAGE</Button>
          <Button sx={{ cursor: 'pointer', color: 'red' }} onClick={() => handleClose()}>CLOSE</Button>
        </Box>
      </Box>
    </Modal>

  );
};

export default ModalNiveus;
