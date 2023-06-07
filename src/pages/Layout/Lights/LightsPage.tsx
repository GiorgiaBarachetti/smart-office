import React from 'react';
import { Box, Button, ButtonGroup, CardContent, CardHeader, Stack, Switch, Typography } from '@mui/material'
import TableLights from '../../../components/Tables/TableLights'
import Card from '@mui/material/Card';
import { Lights } from '../../../utils/interfaces/Interfaces';
import { useState, useEffect } from 'react'
import SwitchComponent from '../../../components/Switch/Switch';
//import dotenv from 'dotenv'
//dotenv.config();

const LightsPage = () => {
 // const apiUrl = process.env.LIGHTS_FETCH;

  const [lightsStatusArray, setLightsStatusArray] = useState<Lights[]>([]);

  const fetchLights = async () => {
    try {
      //trasforma in file .env chiave-valore
      const response = await fetch(`http://192.168.1.6:3000/api/shelly/relays/all/status`);
      const data = await response?.json();
      setLightsStatusArray(data);
      //console.log(data);
    } catch (error) {
      console.log('nooo');
    }
  };

  useEffect(() => {
    fetchLights();
  }, []);


  //switch off all the lights
  const switchAllOffLightStatus = async () => {
    try {
      await fetch(`http://192.168.1.6:3000/api/shelly/relays/all/off`, { method: 'POST' });
      //switchAllOffLightStatus();
    } catch (error) {
      console.log('Error switching all the lights off:', error);
    }
  }

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
  const switchOffLightById = async (key: any) => {
    console.log(key)
    try {
      const light = lightsStatusArray.find((light) => light?.room === key);
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

  const sortedLightsStatusArray = lightsStatusArray.length ? lightsStatusArray.sort((a, b) => a.state.id - b.state.id) : [];

  return <>
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ p: '20px', borderRadius: '6px', bgcolor: 'lightgrey', mx: 'auto', my: '30px', width: '80%' }}>
      <Typography sx={{ variant: 'h1', textAlign: 'center' }}>ROOMS</Typography>
      <Button onClick={() => switchAllOffLightStatus()} sx={{ width: '300px', mx: 'auto' }}>SWITCH OFF ALL THE LIGHTS</Button>
      <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} justifyContent={'center'} sx={{ p: '19px', gap: '32px' }}>
        {sortedLightsStatusArray?.filter((light) =>
          light.room !== "----" &&
          light.room !== "Punto luce non attivo"
        ).map((light) => (
          <Card key={light.room} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '201px', padding: '20px' }}>
            {/* <CardMedia
                                component="img"
                                height="194"
                                image="/static/images/cards/paella.jpg"
                                alt="Paella dish"
                              />*/}
            <CardContent sx={{ mx: 'auto' }}>
              <Typography sx={{ textAlign: 'center' }}>{light?.room}</Typography>
              <ButtonGroup>
                <Button onClick={() => switchOnLightById(light.room)} disabled={light.state.output == true} >ON</Button>
                <Button onClick={() => switchOffLightById(light.room)} disabled={light.state.output == false}>OFF</Button>
              </ButtonGroup>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ padding: '10px', borderRadius: '6px', bgcolor: 'lightgrey', mx: 'auto', my: '30px', width: '80%' }}>
      <Typography sx={{ mt: '10px', variant: 'h1', textAlign: 'center' }}>CONSUMES</Typography>
      <TableLights lightsStatusArray={lightsStatusArray} />
    </Box>


  </>
}

export default LightsPage
