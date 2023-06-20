import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH, PATHDROPDOWNROOMS } from '../../utils/routes/path';
import { Box, Button, ButtonGroup, Typography, Modal, ClickAwayListener } from '@mui/material';
import { baseURL, urlShelly } from '../../utils/fetch/api';
import { MODALSTYLE } from '../../utils/const/Const';
import { Lights } from '../../utils/interfaces/Interfaces';

interface Props {
  open: boolean;
  handleClose: () => void;
  lights: Lights[];
  idRoomModal: number | undefined;
  fetchLights: () => void;
}

const ModalLights = ({ open, handleClose, lights, idRoomModal, fetchLights }: Props) => {

  const navigate = useNavigate();
  const gotoPage = () => {
    navigate(PATHDROPDOWNROOMS.meetingRoom);
  };

  const getRoomName = (roomId: number | undefined) => {
    const roomName = lights != undefined ? (lights.find((light) => light.state.id === roomId)) : ('');
    return roomName ? roomName.room : '';
  };


  return (
    <ClickAwayListener mouseEvent="onMouseDown"
      touchEvent="onTouchStart" onClickAway={handleClose}>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box component='div' sx={MODALSTYLE}>
          {idRoomModal !== undefined && (
            <Typography variant="h6" component="h1">
              {getRoomName(idRoomModal)}, id {idRoomModal}
            </Typography>
          )}
          <Box component='div' sx={{ textAlign: 'center' }}>
            <Box component='div'>
              
            </Box>
            <Box component='div' sx={{ display: 'flex', }}>
              <Button sx={{ cursor: 'pointer' }} onClick={() => gotoPage()}>GO TO {getRoomName(idRoomModal)}</Button>
              <Button sx={{ cursor: 'pointer' }} onClick={() => handleClose()}>CLOSE</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </ClickAwayListener>
  );
};

export default ModalLights;
