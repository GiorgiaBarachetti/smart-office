import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH, SIDEBARROOMS } from '../../utils/routes/path';
import { Box, Button, ButtonGroup, Typography, Modal } from '@mui/material';
import { baseURL, urlShelly } from '../../utils/fetch/api';
import { MODALSTYLE } from '../../utils/const/Const';
import { Lights } from '../../utils/interfaces/Interfaces';

interface Props {
  open: boolean;
  idRoomModal: number | undefined;
  lights: Lights[];
  handleClose: () => void;
  fetchLights: () => void;
}

const ModalLights = ({ open, handleClose, lights, idRoomModal, fetchLights }: Props) => {

  const navigate = useNavigate();
  const gotoPage = () => {
    navigate(PATH.lightsPage);
  };
  const gotoPageById = (key: number | undefined) => {
    if (key != undefined) {
      navigate(SIDEBARROOMS[key].href);
    } else { }
  }

  const getRoomName = (roomId: number | undefined) => {
    const roomName = lights != undefined ? (lights.find((light) => light.state.id === roomId)) : ('');
    return roomName ? roomName.room : '';
  };

  const [refreshDatas, setRefreshDatas] = useState<boolean>(false);

  const switchOnLightById = async (key: number | undefined) => {
    try {
      const light = lights != undefined ? (lights.find((light) => light.state.id === key)) : '';
      if (light && !light.state.output) {
        await fetch(`${baseURL}${urlShelly}/${key}/on`, { method: 'POST' });
        setRefreshDatas((prevState) => !prevState);
      }
    } catch (error) {
      console.log('Error switching the light of the room:', error);
    }
  };

  const switchOffLightById = async (key: number | undefined) => {
    try {
      const light = lights != undefined ? (lights.find((light) => light.state.id === key)) : '';
      if (light && light.state.output) {
        await fetch(`${baseURL}${urlShelly}/${key}/off`, { method: 'POST' });
        setRefreshDatas((prevState) => !prevState);
      }
    } catch (error) {
      console.log('Error switching the light of the room:', error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => { () => fetchLights() }, 1000);
    return () => {
      clearTimeout(timeout)
    }
  }, [refreshDatas])





  return (
    <Modal open={open} onClose={() => handleClose()} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box component='div' sx={MODALSTYLE}>
        {idRoomModal !== undefined && (
          <Typography variant="h6" component="h1">
            {getRoomName(idRoomModal)}, id {idRoomModal}
          </Typography>
        )}
        <Box component='div' sx={{ textAlign: 'center' }}>
          <Box component='div'>
            <ButtonGroup>
              <Button
                sx={{ cursor: 'pointer' }}
                onClick={() => switchOnLightById(idRoomModal)}
                disabled={idRoomModal != undefined && lights[idRoomModal].state.output == true}
              >ON</Button>
              <Button
                sx={{ cursor: 'pointer' }}
                onClick={() => switchOffLightById(idRoomModal)}
                disabled={idRoomModal != undefined && lights[idRoomModal].state.output == false}
              >OFF</Button>
            </ButtonGroup>
          </Box>
          <Box component='div' sx={{ display: 'flex', flexDirection:'column', pt:'20px' }}>
            <Box component='div' sx={{ display: 'flex', gap:'10px'}}>
            <Button sx={{ cursor: 'pointer' }} onClick={() => gotoPageById(idRoomModal)}>GO TO {idRoomModal !== undefined && (getRoomName(idRoomModal))}</Button>
            <Button sx={{ cursor: 'pointer' }} onClick={() => gotoPage()}>GO TO LIGHTS PAGE</Button>
            </Box>
              <Button sx={{ cursor: 'pointer', color: 'red' }} onClick={() => handleClose()}>CLOSE</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalLights;
