import React, { useState, useEffect } from 'react'
import { Lights } from '../../utils/interfaces/Interfaces';
import { baseURL, urlShelly } from '../../utils/fetch/api';
import { Card, Box, Button, ButtonGroup, CardActionArea, CardContent, LinearProgress, Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';

interface Props {
  id: number
  room: Lights[]
  fetchRoom: () => void
}

const SwitchComponent = ({ id, room, fetchRoom }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [refreshDatas, setRefreshDatas] = useState<boolean>(false);

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

  useEffect(() => {
    const timeout = setTimeout(() => fetchRoom(), 1000);
    return () => {
      clearTimeout(timeout)
    }
  }, [refreshDatas]);


  return (
    <Box component='div' sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',mb:'20px', gap: '32px' }}>
      {room?.map((light) => (
        <Card key={id} sx={{ display: 'flex', flexDirection: 'column', width: '201px', border: light.state.output ? '2px solid green' : '2px solid red'}}>
          <CardActionArea>
            {/*
          <CircleIcon
                    style={{ color: light.state.output ? 'green' : 'red', position: 'absolute', right: '7px', top: '7px', fontSize: '20px' }}
                    />
            */}
            <CardContent sx={{ backgroundColor: light.state.output ? '2px solid green' : '2px solid red',p: '20px', mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center',gap:'10px' }}>
              <Typography textAlign={'center'}>SWITCH LIGHT STATUS</Typography>
              <ButtonGroup style={{ alignSelf: 'center' }} aria-label="button group">
                <Button sx={{ cursor: 'pointer' }} onClick={() => switchOnLightById()} disabled={light.state.output == true || isLoading}>ON</Button>
                <Button sx={{ cursor: 'pointer' }} onClick={() => switchOffLightById()} disabled={light.state.output == false || isLoading}>OFF</Button>
              </ButtonGroup>

              {isLoading &&
                <LinearProgress />}
            </CardContent>
          </CardActionArea>
        </Card>
      ))
      }
    </Box>
  );
}

export default SwitchComponent
