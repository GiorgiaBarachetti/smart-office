import React, { useState, useEffect } from 'react'
import { Box, Stack, useMediaQuery, CircularProgress } from '@mui/material';
import TableRooms from '../../../../components/Tables/TableRooms';
import background from '../../../../img/stanzePages/laboratory.jpg'
import { CONTAINERBOX } from '../../../../utils/const/Const';
import SwitchComponent from '../../../../components/Switch/Switch';
import ChartLights from '../../../../components/Chart/ChartLights';
import { Lights } from '../../../../utils/interfaces/Interfaces';
import { baseURL, urlShelly } from '../../../../utils/fetch/api';

const Laboratory = () => {
  const id = 3;
  const [room, setRoom] = useState<Lights[]>([]);

  const isXsScreen = useMediaQuery('(min-width:770px)');

  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchRoom = async (/*numberCase: number*/) => {
    try {
      //if (numberCase === 0) {
      const response = await fetch(`${baseURL}${urlShelly}/${id}/status`);
      if (response.ok) {
        const data = await response.json();
        setRoom(Array.isArray(data) ? data : [data]);
      } else {
        console.log('Error fetching room:', response.status);
      }
      setIsLoadingPage(false)
       } catch (error) {
      console.log('Error fetching room:', error);
    }
  };


  

  useEffect(() => {
    const source = new EventSource('http://192.168.1.6:3000/events');

    source.onmessage = (event) => {
      if (event.data) {
        const json: Lights = JSON.parse(event.data)

        if (json?.state?.id === id) {
          const newData: Lights = {
            ...json
          };
          setRoom(Array.isArray(newData) ? newData : [newData]);
        }
      }
    };

    source.onerror = () => {
      console.log('Error finding Niveus events');
    };

    return () => {
      source.close();
    };
  }, []);

  useEffect(() => {
    setIsLoadingPage(true)
    fetchRoom()
  }, [])


  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', minHeight: 'calc(100vh - 60px)' }} >
      {isLoadingPage ? <CircularProgress sx={{ position: 'absolute', top: 100, right: 50 }} /> :
        <Box component='div' py={'30px'} >
          <Box component='div' sx={{ ...CONTAINERBOX }}>
            <Box component='div' sx={{ width: '95%', mx: 'auto' }}>
              {isXsScreen ? (
                <Stack direction="row" spacing={2} alignItems={'center'} >
                  <SwitchComponent id={id} room={room} />
                  <TableRooms idRoom={id} light={room} fetchRoom={() => fetchRoom()} loading={loading} />
                </Stack>
              ) : (
                <Stack direction="column" spacing={2} alignItems={'center'} justifyContent={'center'} px={'auto'} >
                  <SwitchComponent id={id} room={room} />
                  <TableRooms idRoom={id} light={room} fetchRoom={() => fetchRoom()} loading={loading} />
                </Stack>
              )}
              <ChartLights id={id} />
            </Box>
          </Box>
        </Box>
      }
    </div>
  )
}

export default Laboratory
