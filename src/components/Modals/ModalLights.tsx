import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Lights } from '../../utils/interfaces/Interfaces';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/routes/path';
import { ButtonGroup } from '@mui/material';
import { baseURL, urlShelly } from '../../utils/fetch/api';

interface Props {
  open: boolean;
  handleClose: () => void;
  lights: Lights[];
  idRoomModal: number | undefined;
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
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const ModalLights = ({ open, handleClose, lights, idRoomModal }: Props) => {
  
  const navigate = useNavigate();

  const gotoPage = () => {
    navigate(PATH.lightsPage);
  };

  const getRoomName = (roomId: number | undefined) => {
    const roomName = lights.find((light) => light.state.id === roomId);
    return roomName ? roomName.room : '';
  };

  const [lightsDatasArray, setLightsDatasArray] = useState<Lights[]>([]);
  const [lightDatas, setLightDatas] = useState<boolean>(false);
  
  const switchOnLightById = async (key: any) => {
    try {
      const light = lightsDatasArray.find((light) => light.state.id === key);
      if (light) {
        const id = light.state.id;
        if (light.state.output === false) {
          await fetch(`${baseURL}${urlShelly}/${id}/on`, { method: 'POST' });
          setLightDatas(true);
          setLightsDatasArray((prevState) =>
            prevState.map((light) =>
              light.state.id === key ? { ...light, state: { ...light.state, output: true } } : light
            )
          );
        }
      }
    } catch (error) {
      console.log('Error switching the light of the room:', error);
    }
  };

  const switchOffLightById = async (key: any) => {
    try {
      const light = lightsDatasArray.find((light) => light.state.id === key);
      if (light) {
        const id = light.state.id;
        if (light.state.output === true) {
          await fetch(`${baseURL}${urlShelly}/${id}/off`, { method: 'POST' });
          setLightDatas(false);
          setLightsDatasArray((prevState) =>
            prevState.map((light) =>
              light.state.id === key ? { ...light, state: { ...light.state, output: false } } : light
            )
          );
        }
      }
    } catch (error) {
      console.log('Error switching the light of the room:', error);
    }
  };

 // ...

useEffect(() => {
  const light = lightsDatasArray.find((light) => light?.room === idRoomModal);
  if (light) {
    setLightDatas(light.state.output ?? false);
  } else {
    setLightDatas(false);
  }
}, [lightsDatasArray, idRoomModal]);
/*
useEffect(() => {
  setLightsDatasArray(lights);
  const light =  lights.find((light) => light.room === idRoomModal);
  if (light) {
    setLightDatas(light.state.output ?? false);
  } else {
    setLightDatas(false);
  }
}, [lights, idRoomModal]);

*/
useEffect(() => {
  const light = lightsDatasArray.find((light) => light?.state.id === idRoomModal);
  if (light) {
    setLightDatas(light.state.output ?? false);
  } else {
    setLightDatas(false);
  }
}, [lightsDatasArray, idRoomModal]);
/*
useEffect(() => {
  setLightsDatasArray(lights);
  const light = lights.find((light) => light.state.id === idRoomModal);
  if (light) {
    setLightDatas(light.state.output ?? false);
  } else {
    setLightDatas(false);
  }
}, [lights, idRoomModal]);
*/
  return (
    <Box
    onClick={() => {
      // chiude modalquando clicchi di fuori
      handleClose();}}>

    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        {idRoomModal !== undefined && (
          <Typography variant="h6" component="h1">
            Lights of {getRoomName(idRoomModal)}, id: {idRoomModal}
          </Typography>
        )}
        <Box sx={{textAlign: 'center'}}>
          <Box>
          <ButtonGroup>
              <Button onClick={() => switchOnLightById(idRoomModal)} disabled={lightDatas}>
                ON
              </Button>
              <Button onClick={() => switchOffLightById(idRoomModal)} disabled={!lightDatas}>
                OFF
              </Button>
            </ButtonGroup>

          </Box>
          <Box sx={{display:'flex', }}>
            <Button onClick={gotoPage}>GO TO LIGHTS PAGE</Button>
            <Button onClick={handleClose}>CLOSE</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
        </Box>
  );
};

export default ModalLights;
