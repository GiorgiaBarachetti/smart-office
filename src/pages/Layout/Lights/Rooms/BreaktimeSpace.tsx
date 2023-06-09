import React, { useState, useEffect } from 'react'
import { Box, Stack, useMediaQuery, CircularProgress } from '@mui/material';
import TableRooms from '../../../../components/Tables/TableRooms';
import background from '../../../../img/stanzePages/breaktime.jpg'
import { CONTAINERBOX } from '../../../../utils/const/Const';
import SwitchComponent from '../../../../components/Switch/Switch';
import ChartLights from '../../../../components/Chart/ChartLights';
import { Lights } from '../../../../utils/interfaces/Interfaces';
import { baseURL, urlEvents, urlShelly } from '../../../../utils/fetch/api';
import SnackbarGeneral from '../../../../components/Snackbar/SnackbarGeneral';

const BreaktimeSpace = () => {
  const id = 6;
  const [room, setRoom] = useState<Lights[]>([]);
  const isXsScreen = useMediaQuery('(min-width:770px)');
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true)
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setMessage('')
  };

  const fetchRoom = async () => {
    try {
      const response = await fetch(`${baseURL}${urlShelly}/${id}/status`);
      if (response.ok) {
        const data = await response.json();
        setRoom(Array.isArray(data) ? data : [data]);
      } else {
        setOpen(true)
        setMessage(`Error fetching Breaktime:', ${response.status}`);
      }
      setIsLoadingPage(false)
    } catch (error) {
      setOpen(true)
      setMessage(`Error fetching Breaktime`);
    }
  };

  useEffect(() => {
    const source = new EventSource(`${baseURL}${urlEvents}`);

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
      setOpen(true)
      setMessage(`Error finding Breaktime events`)
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
                  <TableRooms idRoom={id} light={room} fetchRoom={() => fetchRoom()} />
                </Stack>
              ) : (
                <Stack direction="column" spacing={2} alignItems={'center'} justifyContent={'center'} px={'auto'} >
                  <SwitchComponent id={id} room={room} />
                  <TableRooms idRoom={id} light={room} fetchRoom={() => fetchRoom()} />
                </Stack>
              )}
              <ChartLights id={id} />
            </Box>
          </Box>
        </Box>
      }
      {message != '' ? <SnackbarGeneral openSnackbar={open} handleClose={() => handleClose()} message={message} /> : null}

    </div>
  )
}

export default BreaktimeSpace
