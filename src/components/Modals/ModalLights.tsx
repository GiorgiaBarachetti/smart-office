import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Modal from '@mui/material/Modal';
import { Lights } from '../../utils/interfaces/Interfaces';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/routes/path';
import { ButtonGroup } from '@mui/material';

interface Props {
  open: boolean;
  handleClose: () => void;
  lights: Lights[];
  idRoomModal: number | undefined;
}

const style = {
  
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalLights = ({ open, handleClose, lights, idRoomModal}: Props) => {
  const navigate = useNavigate();

  const gotoPage = () => {
    navigate(PATH.lightsPage);
  };
  //permette di prendere il nome della stanza basandosi sull'id fornito dalla mainpage in fase di scelta della icon
  const getRoomName = (roomId: number | undefined) => {
    const roomName = lights.find((light) => light.state.id === roomId);
    return roomName ? roomName.room : '';
  };

  const [lightsStatusArray, setLightsStatusArray] = useState<Lights[]>([]);


  const switchOnLightById = async (key: any) => {
    try {
      const light = lightsStatusArray.find((light) => light?.room === key);
      console.log(light?.room);
      if (light) {
        console.log(light)
        const id = light.state.id
        if (light.state.output === false) {
          console.log(light.state.output);
          await fetch(`http://192.168.1.6:3000/api/shelly/relays/${id}/on`, { method: 'POST' });
          //aggiorno lo stato delle luci settandolo nel setLlightsStatusArray
          setLightsStatusArray((prevState) =>
          prevState.map((light) =>
          //constrollo che la chiave 'room' sia uguale alla chiave key data in input e in tal caso aggiorno l'output ovvero lo stato (acceso/spento)
            light?.room === key ? { ...light, state: { ...light.state, output: true } } : light
          )
        );
        } else {
          //await fetch(`http://192.168.1.6:3000/api/shelly/relays/${id}/off`, { method: 'POST' });
        }

      }
    } catch (error) {
      console.log(`Error switching the light of the room:`, error);
    }
  }
  /*
  const switchOffLightById = async (key: any) => {
    try {
      const light = lightsStatusArray.find((light) => light.idRoomModal === key);
      console.log(light?.room);
      if (light) {
        console.log(light)
        const id = light.state.id
        if (light.state.output === true) {
          console.log(light.state.output);
          await fetch(`http://192.168.1.6:3000/api/shelly/relays/${id}/off`, { method: 'POST' });
          setLightsStatusArray((prevState) =>
          prevState.map((light) =>
            light?.room === key ? { ...light, state: { ...light.state, output: false } } : light
          )
        );
        } else {
          //await fetch(`http://192.168.1.6:3000/api/shelly/relays/${id}/off`, { method: 'POST' });
        }

      }
      //switchAllOffLightStatus();
    } catch (error) {
      console.log(`Error switching the light of the room:`, error);
    }
  }
  <Button onClick={() => switchOffLightById(idRoomModal)} >OFF</Button>
  */

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {idRoomModal !== undefined && (
          <Typography variant="h6" component="h1">
            Lights of {getRoomName(idRoomModal)}, id: {idRoomModal}
          </Typography>
        )}
        <Box>
          <ButtonGroup>
                <Button onClick={() => switchOnLightById(idRoomModal)}  >ON</Button>
          </ButtonGroup>
          <Button onClick={gotoPage}>ALL THE LIGHTS</Button>
          <Button onClick={handleClose}>CLOSE</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalLights;
