import React from 'react';
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
  idCoffee: number | undefined;
}

const ModalCoffee = ({ open, handleClose, idCoffee }: Props) => {
  const navigate = useNavigate();

  const gotoPage = () => {
    navigate(PATH.coffee);
  };

  return (<Box
            // chiude modalquando clicchi di fuori
            onClick={() => { handleClose() }}>

            <Modal
              open={open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box component='div' sx={MODALSTYLE}>
                <Typography variant="h6" component="h1">Coffee, id {idCoffee}</Typography>
                <Box component='div'>
                  <Button sx={{cursor:'pointer'}}  onClick={gotoPage}>GO TO COFFEE PAGE</Button>
                  <Button sx={{cursor:'pointer'}} onClick={handleClose}>CLOSE</Button>
                </Box>
              </Box>
            </Modal>
          </Box>
  );
};

export default ModalCoffee;
