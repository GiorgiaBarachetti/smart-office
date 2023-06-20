import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import { Lights } from '../../utils/interfaces/Interfaces';
import { baseURL, urlShelly } from '../../utils/fetch/api';
import { SHADOWSTYLE, TABLECOLOR } from '../../utils/const/Const';

interface Props {
  idRoom: number;
}

const TableRooms = ({ idRoom }: Props) => {
  
  const[loading, setLoading] = useState(false)
  const [room, setRoom] = useState<Lights[]>([]);

  const fetchRoom = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${baseURL}${urlShelly}/${idRoom}/status`);
      if (response.ok) {
        const data = await response.json();
        setRoom(Array.isArray(data) ? data : [data]);
      } else {
        console.log('Error fetching room:', response.status);
      }
      setLoading(false)
    } catch (error) {
      console.log('Error fetching room:', error);
    }
    console.log(room);
  };
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
        {loading && (
          <TableRow>
            <TableCell colSpan={4}>
              <LinearProgress />
            </TableCell>
          </TableRow>
        )}

          {room.length && room != undefined ? ( 
            room.map((r) => (
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
