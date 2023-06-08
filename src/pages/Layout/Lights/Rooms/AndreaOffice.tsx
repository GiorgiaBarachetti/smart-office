


import React from 'react'
import { useState, useEffect } from 'react';
import { Lights } from '../../../../utils/interfaces/Interfaces';
import { Box, Typography } from '@mui/material';
import TableRooms from '../../../../components/Tables/TableRooms';
import { baseURL, urlShelly } from '../../../../utils/fetch/api';

const AndreaOffice = () => {

  const [room, setRoom] = useState<Lights[]>([]);

  const id = 0;
  const fetchRoom = async () => {
    try {
      //trasforma in file .env chiave-valore
      const response = await fetch(`${baseURL}${urlShelly}/${id}/status`);
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
        <Typography>xxxxxxxxxxxxx</Typography>
      </Box>

      <Box component="div"></Box>
    <TableRooms rooms={room} idRoom={id}/>
    </Box>
  )
}

export default AndreaOffice
