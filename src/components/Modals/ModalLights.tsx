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
import { MODALSTYLE } from '../../utils/const/Const';

interface Props {
  open: boolean;
  handleClose: () => void;
  lights: Lights[];
  idRoomModal: number | undefined;
}

const ModalLights = ({ open, handleClose, lights, idRoomModal }: Props) => {
  
  const navigate = useNavigate();

  const gotoPage = () => {
    navigate(PATH.lightsPage);
  };

  const getRoomName = (roomId: number | undefined) => {
    const roomName = lights != undefined ? (lights.find((light) => light.state.id === roomId)):('');
    return roomName ? roomName.room : '';
  };

  
  const [lightsDatasArray, setLightsDatasArray] = useState<Lights[]>([]);
  const fetchLights = async () => {
    try {
      const response = await fetch(`${baseURL}${urlShelly}/all/status`);
      const data = await response?.json();
      console.log(response, data)
      setLightsDatasArray(data.data);
      console.log(data);
    } catch (error) {
      console.log('error fetching lights', error);
    }
  };

  const [lightDatas, setLightDatas] = useState<boolean>(false);
  
  const switchOnLightById = async (key: any) => {
    try {
      console.log('orfdscxedsewdsp')
      const light = lightsDatasArray!= undefined ? (lightsDatasArray.find((light) => light.state.id === idRoomModal)):'';
      console.log(light)
      console.log(idRoomModal)

      if (light) {
        console.log('oedsp')
        const id = light.state.id;
        if (light.state.output === false) {
          await fetch(`${baseURL}${urlShelly}/${id}/on`, { method: 'POST' });
          console.log(`${baseURL}${urlShelly}/${id}/on`)
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
      console.log('oedsp')
      const light = lightsDatasArray != undefined ? (lightsDatasArray.find((light) => light.state.id === key)):'';
        console.log('oedsp')

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

useEffect(()=>{
  fetchLights()
},[])


useEffect(() => {
  const light = lightsDatasArray != undefined ? (lightsDatasArray.find((light) => light?.room === idRoomModal)):'';
  if (light) {
    setLightDatas(light.state.output ?? false);
  } else {
    setLightDatas(false);
  }
}, [lightsDatasArray, idRoomModal]);

useEffect(() => {
  if (Array.isArray(lights) && lights.length > 0) {
    const light = lights != undefined ? (lights.find((light) => light?.state.id === idRoomModal)):'';
    if (light) {
      setLightDatas(light.state.output ?? false);
    } else {
      setLightDatas(false);
    }
  }
}, [lights, idRoomModal]);

  return (
    <Box
    onClick={() => {
      // chiude modalquando clicchi di fuori
      handleClose();}}>

    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box component='div' sx={MODALSTYLE}>
        {idRoomModal !== undefined && (
          <Typography variant="h6" component="h1">
            Lights of {getRoomName(idRoomModal)}, id: {idRoomModal}
          </Typography>
        )}
        <Box component='div' sx={{textAlign: 'center'}}>
          <Box component='div'>
          <ButtonGroup>
              <Button sx={{cursor:'pointer'}} onClick={() => switchOnLightById(idRoomModal)} disabled={lightDatas}>
                ON
              </Button>
              <Button sx={{cursor:'pointer'}} onClick={() => switchOffLightById(idRoomModal)} disabled={!lightDatas}>
                OFF
              </Button>
            </ButtonGroup>

          </Box>
          <Box component='div' sx={{display:'flex', }}>
            <Button sx={{cursor:'pointer'}} onClick={gotoPage}>GO TO LIGHTS PAGE</Button>
            <Button sx={{cursor:'pointer'}} onClick={handleClose}>CLOSE</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
        </Box>
  );
};

export default ModalLights;
