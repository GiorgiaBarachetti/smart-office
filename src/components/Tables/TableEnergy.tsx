import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import { Energy } from '../../utils/interfaces/Interfaces';
import { baseURL, urlAlhpa } from '../../utils/fetch/api';
import { SHADOWSTYLE, TABLECOLOR } from '../../utils/const/Const';

interface Props {
  energy: Energy[]
  loading: boolean
}

const TableEnergy = ({ loading, energy }: Props) => {


  return <TableContainer sx={{ borderRadius: '8px', mx: 'auto', my: '3px', width: '99%', ...SHADOWSTYLE, ...TABLECOLOR }} >
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>POWER CURRENTLY USED ..until this moment..</TableCell>
          <TableCell>POWER USED EVERY 15 min</TableCell>
          <TableCell>CURRENT HOUR</TableCell>
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
          <TableCell>{energ.powerUsed} W</TableCell>
          <TableCell>{energ.averagePowerUsed} W</TableCell>
          <TableCell>{energ.currentHour} h</TableCell>
        </TableRow>
        ))}

      </TableBody>
    </Table>
  </TableContainer>
}

export default TableEnergy
