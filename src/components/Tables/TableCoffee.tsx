import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Typography } from '@mui/material';
import { Coffee, Energy } from '../../utils/interfaces/Interfaces';

interface Props {
  coffee: Coffee[]
}

const TableCoffee = ({ coffee }: Props) => {


  return <Box component='div'>
    <TableContainer sx={{ borderRadius: '6px', mx: 'auto', my: '30px', width: '85%' }}>
      <Typography>COFFEE COUNT</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>TOTAL COFFEES MADE</TableCell>
            <TableCell>TOTAL SINGLE COFFEE MADE</TableCell>
            <TableCell>TOTAL DOUBLE COFFE MADE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coffee?.map((c) => (
            <TableRow key={501}>
              <TableCell>{c.data?.totalCoffeeToday > 1 ? `${c.data?.totalCoffeeToday} coffees` : `${c.data?.totalCoffeeToday} coffee`}</TableCell>
              <TableCell>{c.data?.count1 >= 1 ? `${c.data?.count1} coffees` : `${c.data?.count1} coffee`}</TableCell>
              <TableCell>{c.data?.count2 >= 1 ? `${c.data?.count2} coffees` : `${c.data?.count2} coffee`}</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>

    <TableContainer sx={{ borderRadius: '6px', mx: 'auto', my: '30px', width: '85%' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>POWER</TableCell>
            <TableCell>VOLTS</TableCell>
            <TableCell>AMPERE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coffee?.map((c) => (
            <TableRow key={500}>
              <TableCell>{c.data?.macchinettaCaffe?.receivedData?.watt !== undefined ? `${c.data?.macchinettaCaffe?.receivedData?.watt}` : '0'} W</TableCell>
              <TableCell>{c.data?.macchinettaCaffe?.receivedData?.volts !== undefined ? `${c.data?.macchinettaCaffe?.receivedData?.volts}` : '0'} V</TableCell>
              <TableCell>{c.data?.macchinettaCaffe?.receivedData?.ampere !== undefined ? `${c.data?.macchinettaCaffe?.receivedData?.ampere}` : '0'} A</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
}

export default TableCoffee
