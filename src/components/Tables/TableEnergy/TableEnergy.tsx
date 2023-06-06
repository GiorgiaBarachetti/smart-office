import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import {Energy} from '../../../utils/interfaces/Interfaces';

interface Props{
  energy : Energy[]
}

const TablePrinter = ({energy}:Props) => {
  return <TableContainer sx={{borderRadius:'6px', bgcolor: 'lightpink', mx:'auto', my: '30px', width: '85%'}}>
  <Table size="small">
      <TableHead>
          <TableRow>
              <TableCell>POWER CURRENTLY USED ..until this moment..</TableCell>
              <TableCell>POWER USED EVERY 15 min</TableCell>
              <TableCell>CURRENT HOUR</TableCell>
           </TableRow>
      </TableHead>
      <TableBody>
      {energy?.map((energ)=>(
                  <TableRow>
                      <TableCell>{energ.powerUsed} W</TableCell>
                      <TableCell>{energ.averagePowerUsed} W</TableCell>
                      <TableCell>{energ.currentHour} h</TableCell>
                  </TableRow>
              ))}
          
      </TableBody>
  </Table>
</TableContainer>
}

export default TablePrinter
