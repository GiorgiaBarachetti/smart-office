import React, { useState, useEffect } from 'react'
import { Box, Stack, useMediaQuery, CircularProgress } from '@mui/material';
import TableRooms from '../../../../components/Tables/TableRooms';
import background from '../../../../img/stanzePages/openspace.jpg'
import { CONTAINERBOX } from '../../../../utils/const/Const';
import SwitchComponent from '../../../../components/Switch/Switch';
import ChartLights from '../../../../components/Chart/ChartLights';
import { Lights } from '../../../../utils/interfaces/Interfaces';
import { baseURL, urlShelly } from '../../../../utils/fetch/api';

const OpenSpace = () => {
  const id = 7;
  
  const [room, setRoom] = useState<Lights[]>([]);

  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const fetchRoom = async (numberCase: number) => {
    try {
      if (numberCase === 0) {
        const response = await fetch(`${baseURL}${urlShelly}/${id}/status`);
        if (response.ok) {
          const data = await response.json();
          setRoom(Array.isArray(data) ? data : [data]);
        } else {
          console.log('Error fetching room:', response.status);
        }
        setIsLoadingPage(false)
      } else {
        setLoading(true)
        const response = await fetch(`${baseURL}${urlShelly}/${id}/status`);
        if (response.ok) {
          const data = await response.json();
          setRoom(Array.isArray(data) ? data : [data]);
        } else {
          console.log('Error fetching room:', response.status);
        }
        setLoading(false)
      }
    } catch (error) {
      console.log('Error fetching room:', error);
    }
  };


  useEffect(() => {
    setIsLoadingPage(true)
    setTimeout(() => fetchRoom(0), 1000)
  }, [])


  useEffect(() => {
    const interval = setTimeout(() => fetchRoom(1), 1000)
    return () => {
      clearTimeout(interval)
    }
  }, []);

  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', marginTop: '-27px', height: '745px' }} >
      {isLoadingPage ? <CircularProgress sx={{ position: 'absolute', top: 100, right: 50 }} /> :
        <Box component='div' paddingTop={'30px'} paddingBottom={'10px'}>
          <Box component='div' sx={{ ...CONTAINERBOX, heigth: '40%' }}>
            <Box sx={{ padding: '20px', width: '80%', mx: 'auto' }}>
              <Stack direction="row" spacing={2} alignItems={'center'} my={'20px'} >
                <SwitchComponent id={id} room={room} fetchRoom={() => fetchRoom(1)} />
                <TableRooms idRoom={id} light={room} fetchRoom={() => fetchRoom(1)} loading={loading} />
              </Stack>
              <ChartLights id={id} />
            </Box>
          </Box>
        </Box>
      }
    </div>
  )
}

export default OpenSpace
