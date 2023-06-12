import React from 'react';
import { Box, Button, ButtonGroup, CardContent, CardHeader, CardMedia, Stack, Switch, Typography } from '@mui/material'
import TableLights from '../../../components/Tables/TableLights'
import Card from '@mui/material/Card';
import { Lights } from '../../../utils/interfaces/Interfaces';
import { useState, useEffect } from 'react'
import { baseURL, urlShelly } from '../../../utils/fetch/api';
import { SHADOWSTYLE } from '../../../utils/const/Const';
import Chart from '../../../components/Chart/Chart';
import CircleIcon from '@mui/icons-material/Circle';
import Laboratory from '../../../img/laboratory.jpg'
//import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';


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
  const mediaStyles = useCoverCardMediaStyles({ bgPosition: 'top' });
  const sortedLightsDatasArray = lightsDatasArray != undefined ? lightsDatasArray.sort((a, b) => a.state.id - b.state.id) : [];

  return <>
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ p: '20px', borderRadius: '6px', bgcolor: 'lightgrey', mx: 'auto', my: '30px', width: '70%', ...SHADOWSTYLE }} >
      <Typography sx={{ variant: 'h1', textAlign: 'center' }}>ROOMS</Typography>

      <Button onClick={() => switchAllOffLightDatas()} sx={{ width: '300px', mx: 'auto' }}>SWITCH OFF ALL THE LIGHTS</Button>
      <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} justifyContent={'center'} sx={{ p: '19px', gap: '32px' }}>
        {/*
        {lightsDatasArray?.filter((light) =>
        */}
        
        {sortedLightsDatasArray?.filter((light) =>
          light.room !== "----" &&
          light.room !== "Punto luce non attivo"
        ).map((light) => (
          <Card key={light.state.id}  sx={{ backgroundImage:`url${Laboratory}`, position:'relative', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '201px', padding: '20px' }}>
            <CardMedia
          component="img"
          height="140"
          image={Laboratory}
          
        />
            <CircleIcon  style={{color: light.state.output ? 'green' : 'red', position:'absolute', right: '7px', top: '7px', fontSize:'20px'}} />
            {/* <CardMedia
                                component="img"
                                height="194"
                                image="/static/images/cards/paella.jpg"
                                alt="Paella dish"
                              />*/}
            <CardContent sx={{ mx: 'auto', display:'flex', flexDirection: 'column', justifyContent:'center' }}>
              <Typography sx={{ textAlign: 'center', pb: '10px' }}>{light.room}</Typography>
              <ButtonGroup>
                <Button onClick={() => switchOnLightById(light.room)} disabled={light.state.output == true} >ON</Button>
                <Button onClick={() => switchOffLightById(light.room)} disabled={light.state.output == false}>OFF</Button>
              </ButtonGroup>
              <Typography sx={{ textAlign: 'center', pt: '10px', fontSize:'13px' }} variant="body2">{light.state.output === true ? `Power used: ${light.state.apower}Watt`: ''}</Typography>
            </CardContent>
          </Card>
        ))}
        <Card key={12}  sx={{ backgroundImage:`url${Laboratory}`, position:'relative', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '201px', padding: '20px' }}>
            <CardMedia
          component="img"
          height="140"
          image={Laboratory}
          //classes={mediaStyles}
          
        />
            <CircleIcon  style={{color: 'green' , position:'absolute', right: '7px', top: '7px', fontSize:'20px'}} />
            {/* <CardMedia
                                component="img"
                                height="194"
                                image="/static/images/cards/paella.jpg"
                                alt="Paella dish"
                              />*/}
            <CardContent sx={{ mx: 'auto', display:'flex', flexDirection: 'column', justifyContent:'center' }}>
              <Typography sx={{ textAlign: 'center', pb: '10px' }}>camera</Typography>
              <ButtonGroup>
                <Button >ON</Button>
                <Button >OFF</Button>
              </ButtonGroup>
              <Typography sx={{ textAlign: 'center', pt: '10px', fontSize:'13px' }} variant="body2">power used: 12wat</Typography>
            </CardContent>
          </Card>
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
