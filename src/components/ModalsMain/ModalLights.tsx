import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH, SIDEBARROOMS } from '../../utils/routes/path';
import { Box, Button, ButtonGroup, Typography, Modal, LinearProgress } from '@mui/material';
import { baseURL, urlShelly } from '../../utils/fetch/api';
import { MODALSTYLE } from '../../utils/const/Const';
import { Lights } from '../../utils/interfaces/Interfaces';
import SnackbarGeneral from '../Snackbar/SnackbarGeneral';

interface Props {
  open: boolean;
  idRoomModal: number | undefined;
  lights: Lights[];
  handleClose: () => void;
  //fetchLights: () => void;
}

const ModalLights = ({ open, handleClose, lights, idRoomModal/*, fetchLights*/ }: Props) => {
  const [message, setMessage] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackBar = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    (false);
    setMessage('')
  };

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
    const roomName = lights != undefined ? (lights.find((light) => light.state?.id === roomId)) : ('');
    return roomName ? roomName.room : '';
  };

  const switchOnLightById = async (key: number | undefined) => {
    try {
      if (key != undefined) {
        const light = lights != undefined ? (lights.find((light) => light.state?.id === key)) : '';
        if (light && light.state?.output === false) {
          const response = await fetch(`${baseURL}${urlShelly}/${key}/on`, { method: 'POST' });
          if (!response.ok) {
            throw new Error()
          }
        }
      }
    } catch (error) {
      setOpenSnackbar(true)
      setMessage(`Error switching on the light of the room`);
    }
  };

  const switchOffLightById = async (key: number | undefined) => {
    try {
      if (key != undefined) {
        const light = lights != undefined ? (lights.find((light) => light.state?.id === key)) : '';
        if (light && light.state?.output === true) {
          const response = await fetch(`${baseURL}${urlShelly}/${key}/off`, { method: 'POST' });
          if (!response.ok) {
            throw new Error()
          }
        }
      }
    } catch (error) {
      setOpenSnackbar(true)
      setMessage(`Error switching off the light of the room`);
    }
  };

/*
  useEffect(() => {
    const timeout = setTimeout(() => fetchLights(), 1000);
    return () => {
      clearTimeout(timeout)
    }
  }, [refreshDatas]);
*/
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
            <ButtonGroup >
              <Button
                sx={{ cursor: 'pointer' }}
                onClick={() => switchOnLightById(idRoomModal)}
                disabled={idRoomModal !== undefined && lights?.[idRoomModal]?.state?.output === true}
              >ON</Button>

              <Button
                sx={{ cursor: 'pointer' }}
                onClick={() => switchOffLightById(idRoomModal)}
                disabled={idRoomModal !== undefined && lights?.[idRoomModal]?.state?.output === false}
              >OFF</Button>

            </ButtonGroup>
          </Box>
          <Box component='div' sx={{ display: 'flex', flexDirection: 'row', pt: '30px' }}>
            <Button sx={{ cursor: 'pointer' }} onClick={() => gotoPageById(idRoomModal)}>{idRoomModal !== undefined && (getRoomName(idRoomModal))}</Button>
            <Button sx={{ cursor: 'pointer' }} onClick={() => gotoPage()}>LIGHTS PAGE</Button>
            <Button sx={{ cursor: 'pointer', color: 'red' }} onClick={() => handleClose()}>CLOSE</Button>
          </Box>
        </Box>
      {message != '' ? <SnackbarGeneral openSnackbar={open} handleClose={() => handleClose()} message={message} /> : null}
      </Box>
    </Modal>

  );
};

export default ModalLights;
