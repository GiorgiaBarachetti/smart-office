import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Lights } from '../../utils/interfaces/Interfaces';
import { SHADOWSTYLE, TABLECOLOR } from '../../utils/const/Const';

interface Props {
  idRoom: number;
  light: Lights[]
  fetchRoom: ()=>void
}

const TableRooms = ({ idRoom, light, fetchRoom }: Props) => {
  
  useEffect(() => {
    const interval = setTimeout(()=>fetchRoom(),1000)

    return () => {
      clearTimeout(interval)
    }
  }, [idRoom]);
  
  return (
    <TableContainer sx={{ borderRadius: '6px', bgcolor: 'lightpink', mx: 'auto', my: '30px', width: '100%', ...SHADOWSTYLE, ...TABLECOLOR }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>STATUS</TableCell>
            <TableCell>ACTUAL CONSUMPTION</TableCell>
            <TableCell>HOUR CONSUMPTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {light.length && light != undefined ? ( 
            light.map((r) => (
            <TableRow key={r.state.id}>
              <TableCell>{r.state.id}</TableCell>
              <TableCell style={{ color: r.state.output ? 'green' : 'red' }}>{r.state.output ? 'ON' : 'OFF'}</TableCell>
              <TableCell>{r.state.apower ?? '0'} Watt</TableCell>
              <TableCell>{r.state.aenergy?.total ?? '0'} Watt/h</TableCell>
            </TableRow>
          ))):[]}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableRooms;
