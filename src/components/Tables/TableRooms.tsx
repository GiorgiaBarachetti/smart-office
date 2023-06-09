import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Lights } from '../../utils/interfaces/Interfaces';
import { baseURL, urlShelly } from '../../utils/fetch/api';
import { SHADOWSTYLE, TABLECOLOR } from '../../utils/const/Const';

interface Props {
  room: Lights[];
  idRoom: number;
}

const TableRooms = () => {
  const [room, setRoom] = useState<Lights[]>([]);

  const id = 0;

  const fetchRoom = async () => {
    try {
      const response = await fetch(`${baseURL}${urlShelly}/${id}/status`);
      const data = await response?.json();
      console.log(data);
      setRoom(data);
    } catch (error) {
      console.log('Error fetching room', error);
    }
  };
  
  console.log(room);
  useEffect(() => {
      fetchRoom();
  }, []);


  return (
    <TableContainer sx={{ borderRadius: '6px', bgcolor: 'lightpink', mx: 'auto', my: '30px', width: '95%', ...SHADOWSTYLE, ...TABLECOLOR }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>ROOM NAME</TableCell>
            <TableCell>STATUS</TableCell>
            <TableCell>ACTUAL CONSUMPTION</TableCell>
            <TableCell>HOUR CONSUMPTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {room.length ?( room.map((r) => {
            return (
            <TableRow key={id}>
              <TableCell>{r.state.id}</TableCell>
              <TableCell>{r.state.room}</TableCell>
              <TableCell style={{ color: r.state.output ? 'green' : 'red' }}>
                {r.state.output ? 'ON' : 'OFF'}
              </TableCell>
              <TableCell>{r.state.apower} Watt</TableCell>
              <TableCell>{r.state.aenergy?.total} Watt/h</TableCell>
            </TableRow>

            )})):[]}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableRooms;
