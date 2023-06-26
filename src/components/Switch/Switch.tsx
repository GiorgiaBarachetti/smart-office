import React, { useState, useEffect } from 'react'
import { Lights } from '../../utils/interfaces/Interfaces';
import { baseURL, urlShelly } from '../../utils/fetch/api';
import { Card, Box, Button, ButtonGroup, CardActionArea, CardContent, LinearProgress, Typography } from '@mui/material'
interface Props {
  id: number
  room: Lights[]
  fetchRoom: ()=>void
}

const SwitchComponent = ({ id, room, fetchRoom }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [refreshDatas, setRefreshDatas] = useState<boolean>(false);

  useEffect(() => {
    const timeout =setTimeout(() => fetchRoom(), 1000);
    return () => {
      clearTimeout(timeout)
    }
  }, [refreshDatas]);
  
  const switchOnLightById = async () => {
    try {
      setIsLoading(true)
      if (room) {
        await fetch(`${baseURL}${urlShelly}/${id}/on`, { method: 'POST' });
       setRefreshDatas((prevState) => !prevState);
      }
      setIsLoading(false)
    } catch (error) {
      console.log(`Error switching the light of the room:`, error);
    }
  }
  const switchOffLightById = async () => {
    try {
      setIsLoading(true)
      if (room) {
          await fetch(`${baseURL}${urlShelly}/${id}/off`, { method: 'POST' });
        setRefreshDatas((prevState) => !prevState);
      }
      setIsLoading(false)
    } catch (error) {
      console.log(`Error switching the light of the room:`, error);
    }

  }

  return (
    <Box component='div' sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', p: '19px', gap: '32px' }}>
      {room?.map((light) => (
            <Card key={id} sx={{ display: 'flex', flexDirection: 'column', width: '201px' }}>
              <CardActionArea>
                <CardContent sx={{ p: '20px', mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography textAlign={'center'}>SWITCH LIGHT STATUS</Typography>
                    {isLoading ? (
                      <LinearProgress/>):(
                  <ButtonGroup style={{ alignSelf: 'center' }} aria-label="button group">
                    <Button sx={{cursor:'pointer'}} onClick={() => switchOnLightById()} disabled={light.state.output == true}>ON</Button>
                    <Button sx={{cursor:'pointer'}} onClick={() => switchOffLightById()} disabled={light.state.output == false}>OFF</Button>
                  </ButtonGroup>
                    )}
                </CardContent>
              </CardActionArea>
            </Card>
          ))
      }
    </Box>
  );
                      }  

export default SwitchComponent
