import React from 'react'
import { useState, useEffect } from 'react';
import { Lights } from '../../../../utils/interfaces/Interfaces';
import { Box, Typography } from '@mui/material';
import TableRooms from '../../../../components/Tables/TableRooms';
import { baseURL, urlShelly } from '../../../../utils/fetch/api';

const AndreaOffice = () => {
  const id = 0;

  return (
    <Box component="div">
       <Box component="div">
        <Typography>xxxxxxxxxxxxx</Typography>
      </Box>

      <Box component="div"></Box>
    <TableRooms idRoom={id}/>
    </Box>
  )
}

export default AndreaOffice
