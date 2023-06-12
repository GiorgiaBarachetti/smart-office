import React from 'react';
import { Box, Button, ButtonGroup, CardActionArea, CardContent, CardHeader, CardMedia, Stack, Switch, Typography } from '@mui/material'
import TableLights from '../../../components/Tables/TableLights'
import Card from '@mui/material/Card';
import { Lights } from '../../../utils/interfaces/Interfaces';
import { useState, useEffect } from 'react'
import { baseURL, urlShelly } from '../../../utils/fetch/api';
import { SHADOWSTYLE } from '../../../utils/const/Const';
import Chart from '../../../components/Chart/Chart';
import CircleIcon from '@mui/icons-material/Circle';
import Laboratory from '../../../img/laboratory.jpg'
import Andrea from '../../../img/andrea.jpg'
//import Flavio from '../../../img/flavio.jpg'
import Meeting from '../../../img/meeting.jpg'
import Kitchen from '../../../img/kitchen.jpg'
import Entrance from '../../../img/entrance.jpg'
import Breaktime from '../../../img/breaktime.jpg'
import OpenSpace from './Rooms/OpenSpace';
//import Openspace from '../../../img/openspace.jpg'

const ROOMPHOTOS = [
  {
    id: 0,
    src: Andrea
  },
  {
    id: 1,
    src: Meeting
  },
  /*
  {
    id: 2,
    src: Flavio
  },
  */
  {
    id: 3,
    src: Laboratory
  },
  {
    id: 4,
    src: Kitchen
  },
  {
    id: 6,
    src: Breaktime
  },
  {
    id: 5,
    src: Entrance
  },
  /*
  {
    id: 7,
    src: OpenSpace
  },
  */

]

const LightsPage = () => {

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


  useEffect(() => {
    fetchLights();
  }, []);


  //switch off all the lights
  const switchAllOffLightDatas = async () => {
    try {
      await fetch(`${baseURL}${urlShelly}/all/off`, { method: 'POST' });
      //switchAllOffLightDatas();
    } catch (error) {
      console.log('Error switching all the lights off:', error);
    }
  }

  const switchOnLightById = async (key: any) => {
    try {
      const light = lightsDatasArray.find((light) => light?.room === key);
      console.log(light?.room);
      if (light) {
        console.log(light)
        const id = light.state.id
        if (light.state.output === false) {
          console.log(light.state.output);
          await fetch(`${baseURL}${urlShelly}/${id}/on`, { method: 'POST' });
          //aggiorno lo stato delle luci settandolo nel setLlightsDatasArray
          setLightsDatasArray((prevState) =>
            prevState.map((light) =>
              //constrollo che la chiave 'room' sia uguale alla chiave key data in input e in tal caso aggiorno l'output ovvero lo stato (acceso/spento)
              light?.room === key ? { ...light, state: { ...light.state, output: true } } : light
            )
          );
        } else {
        }

      }
    } catch (error) {
      console.log(`Error switching the light of the room:`, error);
    }
  }
  const switchOffLightById = async (key: any) => {
    console.log(key)
    try {
      const light = lightsDatasArray.find((light) => light?.room === key);
      console.log(light?.room);
      if (light) {
        console.log(light)
        const id = light.state.id
        if (light.state.output === true) {
          console.log(light.state.output);
          await fetch(`${baseURL}${urlShelly}/${id}/off`, { method: 'POST' });
          setLightsDatasArray((prevState) =>
            prevState.map((light) =>
              light?.room === key ? { ...light, state: { ...light.state, output: false } } : light
            )
          );
        } else {
        }

      }
      //switchAllOffLightDatas();
    } catch (error) {
      console.log(`Error switching the light of the room:`, error);
    }

  }

  const sortedLightsDatasArray = lightsDatasArray.length ? lightsDatasArray.sort((a, b) => a.state.id - b.state.id) : [];

  const getRoomPhotoById = (id: number) => {
    const roomPhoto = ROOMPHOTOS.find((photo) => photo.id === id);
    if (roomPhoto) {
      return roomPhoto.src;
    }
    // Return a default image source if the id doesn't match any room photo
    return undefined;
  };


  return <>
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ p: '20px', borderRadius: '6px', bgcolor: 'lightgrey', mx: 'auto', my: '30px', width: '70%', ...SHADOWSTYLE }} >
      <Typography sx={{ variant: 'h1', textAlign: 'center' }}>ROOMS</Typography>

      <Button onClick={() => switchAllOffLightDatas()} sx={{ width: '300px', mx: 'auto' }}>SWITCH OFF ALL THE LIGHTS</Button>
      <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} justifyContent={'center'} sx={{ p: '19px', gap: '32px' }}>

        {sortedLightsDatasArray?.filter((light) =>
          light.room !== "----" &&
          light.room !== "Punto luce non attivo"
        ).map((light) => (
          <Card key={light.state.id} sx={{ display: 'flex', flexDirection: 'column', width: '201px' }}>
            <CardActionArea>
              {getRoomPhotoById(light.state.id) ? (
                <CardMedia
                  component="img"
                  height="140"
                  image={getRoomPhotoById(light.state.id)}
                  sx={{ padding: '0' }}
                />
              ) : null}
              <CircleIcon style={{ color: light.state.output ? 'green' : 'red', position: 'absolute', right: '7px', top: '7px', fontSize: '20px' }} />
              <CardContent sx={{ p: '20px', mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography sx={{ textAlign: 'center', pb: '10px' }}>{light.room}</Typography>
                <ButtonGroup sx={{ alignSelf: 'center' }}>
                  <Button onClick={() => switchOnLightById(light.room)} disabled={light.state.output == true} >ON</Button>
                  <Button onClick={() => switchOffLightById(light.room)} disabled={light.state.output == false}>OFF</Button>
                </ButtonGroup>
                <Typography sx={{ textAlign: 'center', pt: '10px', fontSize: '13px' }} variant="body2">{light.state.output === true ? `Power used: ${light.state.apower}Watt` : ''}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ padding: '10px', borderRadius: '6px', bgcolor: 'lightgrey', mx: 'auto', my: '30px', width: '70%' }} style={SHADOWSTYLE}>
      <Typography sx={{ mt: '10px', variant: 'h1', textAlign: 'center' }}>CONSUMES</Typography>
      <TableLights lightsDatasArray={lightsDatasArray} />
    </Box>

    <Box component='div' display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ padding: '10px', borderRadius: '6px', bgcolor: 'lightgrey', mx: 'auto', my: '30px', width: '70%' }} style={SHADOWSTYLE}>
      <Chart />
    </Box>
  </>
}

export default LightsPage
