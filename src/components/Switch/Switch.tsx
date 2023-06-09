import React, { useState } from 'react'
import { Lights } from '../../utils/interfaces/Interfaces';
import { baseURL, urlShelly } from '../../utils/fetch/api';
import { Card, Box, Button, ButtonGroup, CardActionArea, CardContent, LinearProgress, Typography } from '@mui/material'
import SnackbarGeneral from '../Snackbar/SnackbarGeneral';

interface Props {
  id: number
  room: Lights[]
}

const SwitchComponent = ({ id, room }: Props) => {
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setMessage('')
  };

  const switchOnLightById = async () => {
    try {
      setIsLoading(true)
      if (room) {
        const response = await fetch(`${baseURL}${urlShelly}/${id}/on`, { method: 'POST' });
        if(!response.ok){
          throw new Error
      }
      }
      setIsLoading(false)
    } catch (error) {
      setOpen(true)
      setMessage(`Error switching on the light of the room:`);
    }
  }
  const switchOffLightById = async () => {
    try {
      setIsLoading(true)
      if (room) {
        const response = await fetch(`${baseURL}${urlShelly}/${id}/off`, { method: 'POST' });
        if(!response.ok){
          throw new Error
      }
      }
      setIsLoading(false)
    } catch (error) {
      setOpen(true)
      setMessage(`Error switching off the light of the room:`);
    }
  }

  return (
    <Box component='div' sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',mb:'20px', gap: '32px' }}>
      {room?.map((light) => (
        <Card key={id} sx={{ display: 'flex', flexDirection: 'column', width: '201px', border: light.state.output ? '2px solid green' : '2px solid red'}}>
          <CardActionArea>
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
      {message != '' ? <SnackbarGeneral openSnackbar={open} handleClose={() => handleClose()} message={message} /> : null}
    </Box>
  );
}

export default SwitchComponent
