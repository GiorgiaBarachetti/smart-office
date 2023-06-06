import React from 'react'
import { useState, useEffect } from 'react';
import { Lights } from '../../../../utils/interfaces/Interfaces';
import { Box, Typography } from '@mui/material';
const AndreaOffice = () => {

  const [room, setRoom] = useState<Lights[]>([]);

  const fetchRoom = async () => {
    try {
      //trasforma in file .env chiave-valore
      const response = await fetch("http://192.168.1.6:3000/api/shelly/relays/0/status");
      const data = await response?.json();
      setRoom(data);
      console.log(data);
    } catch (error) {
      console.log('Error fetching room');
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  return (
    <Box component="div">
       <Box component="div">
        <Typography>room</Typography>
      </Box>

       <Box component="div"></Box>

    </Box>
  )
}

export default AndreaOffice
