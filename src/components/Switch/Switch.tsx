import React, { useState, useEffect } from 'react'
import { Lights } from '../../utils/interfaces/Interfaces';
import { baseURL, urlShelly } from '../../utils/fetch/api';
import { Box, Button, ButtonGroup, CardActionArea, CardContent, CardMedia, CircularProgress, LinearProgress, Stack, Switch, Typography } from '@mui/material'
import Card from '@mui/material/Card';

interface Props {
  id: number
}

const SwitchComponent = ({ id }: Props) => {
  const [isLoadingComponent, setIsLoadingComponent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [refreshDatas, setRefreshDatas] = useState<boolean>(false);

  const [lightsDatasArray, setLightsDatasArray] = useState<Lights[]>([]);
  const fetchLights = async () => {
    try {
      setIsLoadingComponent(true)
      const response = await fetch(`${baseURL}${urlShelly}/all/status`);
      const data = await response?.json();
      console.log(response, data)
      setLightsDatasArray(data.data);
      console.log(data);
      setIsLoadingComponent(false)
    } catch (error) {
      console.log('error fetching lights', error);
    }
  };

  useEffect(() => {
    const timeout =setTimeout(() => fetchLights(), 1000);
    return () => {
      clearTimeout(timeout)
    }
  }, [refreshDatas]);


  
  const switchOnLightById = async (key: any) => {
    try {
      setIsLoading(true)
      const light = lightsDatasArray.find((light) => light?.room === key);
      console.log(light?.room);
      if (light && !light.state.output) {
        await fetch(`${baseURL}${urlShelly}/${light.state.id}/on`, { method: 'POST' });
        setRefreshDatas((prevState) => !prevState);
      }
      setIsLoading(false)
    } catch (error) {
      console.log(`Error switching the light of the room:`, error);
    }
  }
  const switchOffLightById = async (key: any) => {
    console.log(key)
    try {
      const light = lightsDatasArray.find((light) => light?.room === key);
      console.log(light?.room);
      if (light && light.state.output) {
          await fetch(`${baseURL}${urlShelly}/${light.state.id}/off`, { method: 'POST' });
          setRefreshDatas((prevState) => !prevState);
      }
    } catch (error) {
      console.log(`Error switching the light of the room:`, error);
    }

  }

  return (
    <Box component='div' sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', p: '19px', gap: '32px' }}>
      {isLoadingComponent ? (
        <CircularProgress/>
      ) : (
        lightsDatasArray?.filter((light) => light.state.id === id)
          .map((light) => (
            <Card key={id} sx={{ display: 'flex', flexDirection: 'column', width: '201px' }}>
              <CardActionArea>
                <CardContent sx={{ p: '20px', mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography textAlign={'center'}>SWITCH LIGHT STATUS</Typography>
                  <ButtonGroup style={{ alignSelf: 'center' }} aria-label="button group">
                    <Button sx={{cursor:'pointer'}} onClick={() => switchOnLightById(light.room)} disabled={light.state.output == true}>ON</Button>
                    
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
                    <Button sx={{cursor:'pointer'}} onClick={() => switchOffLightById(light.room)} disabled={light.state.output == false}>OFF</Button>
                  </ButtonGroup>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
      )}
    </Box>
  );
                      }  

export default SwitchComponent
