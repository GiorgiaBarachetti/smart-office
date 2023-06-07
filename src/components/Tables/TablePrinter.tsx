import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import {Printer} from '../../utils/interfaces/Interfaces';

interface Props{
  printer : Printer[]
}

const TablePrinter = ({printer}:Props) => {
  return <TableContainer sx={{borderRadius:'6px', bgcolor: 'lightpink', mx:'auto', my: '30px', width: '85%'}}>
  <Table size="small">
      <TableHead>
          <TableRow>
              <TableCell>POWER</TableCell>
              <TableCell>VOLTAGE</TableCell>
              <TableCell>CURRENT</TableCell>
              <TableCell>TOTAL KWH</TableCell>
           </TableRow>
      </TableHead>
      <TableBody>
      {printer?.map((p)=>(
                  <TableRow>
                      <TableCell>{p.tplinkStampante.power.value} {p.tplinkStampante.power.unit}</TableCell>
                      <TableCell>{p.tplinkStampante.voltage.value} {p.tplinkStampante.voltage.unit}</TableCell>
                      <TableCell>{p.tplinkStampante.current.value} {p.tplinkStampante.current.unit}</TableCell>
                      <TableCell>{p.tplinkStampante.total.value} {p.tplinkStampante.total.unit}</TableCell>
                  </TableRow>
              ))}
          
      </TableBody>
  </Table>
</TableContainer>
}

export default TablePrinter
