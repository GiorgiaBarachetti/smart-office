import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import { SHADOWSTYLE, TABLECOLOR } from '../../utils/const/Const';
import { Niveus } from '../../utils/interfaces/Interfaces';

interface Props {
  niveus: Niveus[]
  loading: boolean
}

const TableNiveus = ({ loading, niveus }: Props) => {


  return  ( <TableContainer sx={{ borderRadius: '8px', mx: 'auto', my: '3px', width: '99%', ...SHADOWSTYLE, ...TABLECOLOR }} >
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell>POWER</TableCell>
        <TableCell>VOLTAGE</TableCell>
        <TableCell>AMPERE</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {loading && (
        <TableRow>
          <TableCell colSpan={4}>
            <LinearProgress />
          </TableCell>
        </TableRow>
      )}

      {niveus?.map((n) => (
      <TableRow key={n.id}>
        <TableCell>{n.data.receivedData.watt} W</TableCell>
        <TableCell>{n.data.receivedData.volts} V</TableCell>
        <TableCell>{n.data.receivedData.ampere} A</TableCell>
      </TableRow>
      ))}

    </TableBody>
  </Table>
</TableContainer>

)}

export default TableNiveus
