import React from 'react'
import { Typography, Modal, Box } from '@mui/material'
import { MODALSTYLE } from '../../../utils/const/Const';
interface Props {
  open: boolean;
  handleClose: () => void;
  message: string
}

const ModalCoffeMessage = ({ open, message, handleClose }: Props) => {


  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component='div' sx={MODALSTYLE}>
        <Typography sx={{ textAlign: 'center', color: 'black' }}>{message}</Typography>
      </Box>

    </Modal>
  )
}

export default ModalCoffeMessage
