import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/routes/path';

interface Props {
  open: boolean;
  handleClose: () => void;
  idCoffee: number | undefined;
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

const ModalCoffee = ({ open, handleClose, idCoffee }: Props) => {
  const navigate = useNavigate();

  const gotoPage = () => {
    navigate(PATH.coffee);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <Typography variant="h6" component="h1">Coffee, id {idCoffee}</Typography>
        <Box>
          <Button onClick={gotoPage}>GO TO COFFEE PAGE</Button>
          <Button onClick={handleClose}>CLOSE</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCoffee;
