import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import { Energy } from '../../utils/interfaces/Interfaces';
import { SHADOWSTYLE, TABLECOLOR } from '../../utils/const/Const';

interface Props {
  energy: Energy[]
  loading: boolean
}

const TableEnergy = ({ loading, energy }: Props) => {


  return <TableContainer sx={{ borderRadius: '8px', mx: 'auto', my: '5px', width: '99%', ...SHADOWSTYLE, ...TABLECOLOR }} >
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>POWER CURRENTLY USED</TableCell>
          <TableCell>POWER USED EVERY 15 min</TableCell>
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

        {energy?.map((energ) => (
        <TableRow key={energ.id}>
          <TableCell>{energ.powerUsed != undefined ? energ.powerUsed : 0} W</TableCell>
          <TableCell>{energ.averagePowerUsed != undefined ? energ.averagePowerUsed : 0} W</TableCell>
        </TableRow>
        ))}

      </TableBody>
    </Table>
  </TableContainer>
}

export default TableEnergy
