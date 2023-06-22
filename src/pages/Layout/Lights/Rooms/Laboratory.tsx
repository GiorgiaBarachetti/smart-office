import React, { useState, useEffect } from 'react'
import { Box, Stack, useMediaQuery } from '@mui/material';
import TableRooms from '../../../../components/Tables/TableRooms';
import background from '../../../../img/stanzePages/andrea.jpg'
import { SHADOWSTYLE } from '../../../../utils/const/Const';
import SwitchComponent from '../../../../components/Switch/Switch';
import ChartLights from '../../../../components/Chart/ChartLights';
import { Lights } from '../../../../utils/interfaces/Interfaces';
import { baseURL, urlShelly } from '../../../../utils/fetch/api';

const Laboratory = () => {
  const id = 3;
  const isXsScreen = useMediaQuery('(min-width:770px)');
  const [room, setRoom] = useState<Lights[]>([]);
  const[loading, setLoading] = useState<boolean>(false)
  const fetchRoom = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${baseURL}${urlShelly}/${id}/status`);
      if (response.ok) {
        const data = await response.json();
        setRoom(Array.isArray(data) ? data : [data]);
      } else {
        console.log('Error fetching room:', response.status);
      }
      setLoading(false)
    } catch (error) {
      console.log('Error fetching room:', error);
    }
    console.log(room);
  };


  useEffect(() => {
    const interval = setTimeout(() => fetchRoom(), 1000)

    return () => {
      clearTimeout(interval)
    }
  }, []);
  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', marginTop: '-27px' }} >
      <Box component='div' paddingTop={'30px'} paddingBottom={'10px'}>
        <Box component='div' display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ padding: '10px', borderRadius: '6px', bgcolor: 'rgba(211, 211, 211,0.4)', mx: 'auto', my: '30px', width: '90%', heigth: '40%', ...SHADOWSTYLE }}>

          {isXsScreen ? (
            <Stack direction="row" spacing={2} alignItems={'center'} padding={'20px'} >
              <SwitchComponent id={id} room={room} fetchRoom={() => fetchRoom()} />
              <TableRooms idRoom={id} light={room} fetchRoom={() => fetchRoom()} loading={loading}/>
            </Stack>
          ) : (
            <Stack direction="column" spacing={2} alignItems={'center'} justifyContent={'center'} px={'100px'}>
              <SwitchComponent id={id} room={room} fetchRoom={() => fetchRoom()} />
              <TableRooms idRoom={id} light={room} fetchRoom={() => fetchRoom()} loading={loading}/>
            </Stack>
          )
          }
          <ChartLights id={id} />
        </Box>
      </Box>
    </div>
  )
}

export default Laboratory
