import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import {Printer} from '../../utils/interfaces/Interfaces';
import { SHADOWSTYLE, TABLECOLOR } from '../../utils/const/Const';

interface Props{
  printer : Printer[]
}

const TablePrinter = ({printer}:Props) => {
  return <TableContainer sx={{borderRadius:'6px', bgcolor: 'white', mx:'auto', my: '30px', width: '85%', ...SHADOWSTYLE}}>
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
                  <TableRow key={p.tplinkStampante.id}>
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
