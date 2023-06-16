import React from 'react';
import { Box, Button, ButtonGroup, CardActionArea, CardContent, CardHeader, CardMedia, CircularProgress, LinearProgress, Stack, Switch, Typography } from '@mui/material'
import TableLights from '../../../components/Tables/TableLights'
import Card from '@mui/material/Card';
import { Lights } from '../../../utils/interfaces/Interfaces';
import { useState, useEffect } from 'react'
import { baseURL, urlShelly } from '../../../utils/fetch/api';
import { ROOMPHOTOS, SHADOWSTYLE } from '../../../utils/const/Const';
import CircleIcon from '@mui/icons-material/Circle';

const LightsPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const [refreshDatas, setRefreshDatas] = useState<boolean>(false);
  const [lightsDatasArray, setLightsDatasArray] = useState<Lights[]>([]);

  const fetchLights = async () => {
    try {
      setIsLoadingPage(true)
      const response = await fetch(`${baseURL}${urlShelly}/all/status`);
      console.log(response)
      const data = await response?.json();
      console.log(response, 'data',data)
      setLightsDatasArray(data.data);
      setIsLoadingPage(false)
    } catch (error) {
      console.log('error fetching lights', error);
    }
  };

  //switch off all the lights
  const switchAllOffLightDatas = async () => {
    try {
      await fetch(`${baseURL}${urlShelly}/all/off`, { method: 'POST' });
      setRefreshDatas((prevState) => !prevState);
    } catch (error) {
      console.log('Error switching all the lights off:', error);
    }
  }

  const switchOnLightById = async (key: number) => {
    try {
      setIsLoading(true)
      const light = lightsDatasArray.find((light) => light?.state.id === key);
      if (light) {
        if (light.state.output === false) {
          await fetch(`${baseURL}${urlShelly}/${light.state.id}/on`, { method: 'POST' });
          setRefreshDatas((prevState) => !prevState);
        }
      }
      setIsLoading(false)
    } catch (error) {
      console.log(`Error switching the light of the room:`, error);
    }
  }

  const switchOffLightById = async (key: number) => {
    try {
      setIsLoading(true)
      const light = lightsDatasArray.find((light) => light?.state.id === key);
      if (light) {
        if (light.state.output === true) {
          console.log(light.state.output);
          await fetch(`${baseURL}${urlShelly}/${light.state.id}/off`, { method: 'POST' });
          setRefreshDatas((prevState) => !prevState);
        } else {
        }
      }
      setIsLoading(false)
    } catch (error) {
      console.log(`Error switching the light of the room:`, error);
    }

  }


  useEffect(() => {
    setTimeout(() => fetchLights(), 1000);
  }, [refreshDatas]);


  const sortedLightsDatasArray = lightsDatasArray != undefined ? lightsDatasArray.sort((a, b) => a.state.id - b.state.id) : [];
console.log('gyufrhdcn', lightsDatasArray)
console.log('jhgfdfghjgfhjkjhdfghkgfhjkhgf',sortedLightsDatasArray)
  const getRoomPhotoById = (id: number) => {
    const roomPhoto = ROOMPHOTOS.find((photo) => photo.id === id);
    if (roomPhoto) {
      return roomPhoto.src;
    }
    // Return a default image source if the id doesn't match any room photo
    return undefined;
  };


  //{isLoading ? <LinearProgress /> : <></>}
  return <>
    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: '20px', borderRadius: '6px', bgcolor: '#d3d3d382', mx: 'auto', my: '30px', width: '90%', ...SHADOWSTYLE }} >
      <Typography variant='h6' sx={{ variant: 'h1', textAlign: 'center' }}>ROOMS</Typography>

      <Button onClick={() => switchAllOffLightDatas()} sx={{ cursor: 'pointer', width: '300px', mx: 'auto' }}>SWITCH OFF ALL THE LIGHTS</Button>
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}

      {isLoadingPage ? <LinearProgress /> : (
        <Box component='div' sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', p: '19px', gap: '32px' }}>

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
                    <Button sx={{ cursor: 'pointer' }} onClick={() => switchOnLightById(light.state.id)} disabled={light.state.output == true} >ON</Button>
                    {isLoading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                        }}
                      />
                    )}
                    <Button sx={{ cursor: 'pointer' }} onClick={() => switchOffLightById(light.state.id)} disabled={light.state.output == false}>OFF</Button>
                  </ButtonGroup>
                  <Typography sx={{ textAlign: 'center', pt: '10px', fontSize: '13px' }} variant="body2">{light.state.output === true ? `Power used: ${light.state.apower}Watt` : ''}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      )}
    </Box>

    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: '10px', bgcolor: '#d3d3d382', padding: '10px', borderRadius: '6px', mx: 'auto', my: '30px', width: '90%', ...SHADOWSTYLE }}>
      <Typography variant='h6' sx={{ mt: '10px', variant: 'h1', textAlign: 'center' }}>CONSUMES</Typography>
    </Box>
  </>
}

export default LightsPage
//<TableLights loading={isLoadingPage} lightsDatasArray={lightsDatasArray} />