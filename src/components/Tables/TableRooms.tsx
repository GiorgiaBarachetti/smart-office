import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Lights } from '../../utils/interfaces/Interfaces';

interface Props {
    room : Lights[]
    idRoom: number
}

const TableRooms = ({room, idRoom}: Props) => {
  console.log(idRoom)
    /*
    //sum of current consumption 
    const totalApower = room.length ? room.reduce(
        //on= somma actual
        //light= somma da aggiungere
        (currentValueSum, r) => 
        currentValueSum + r.state.apower || 0, 
        //somma di partenza
        0) : [];
    //sum of hour consumption 
    const totalAenergy = lightsDatasArray.reduce((currentValueSum, light) => currentValueSum + (light.state.aenergy?.total || 0), 0);
    //total count of room with light on
    const totalLightsOn = lightsDatasArray.filter((light) => light.state.output).length;
    //ordinamento per id ascendente
    const sortedLightsDatasArray = lightsDatasArray.sort((a, b) => a.state.id - b.state.id);
    */
   console.log(room)

  return (
    <TableContainer sx={{borderRadius:'6px', bgcolor: 'lightpink', mx:'auto', my: '30px', width: '95%'}}>
    <Table size="small">
        <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>ROOM NAME</TableCell>
                <TableCell>Datas</TableCell>
                <TableCell>ACTUAL CONSUMPTION</TableCell>
                <TableCell>HOUR CONSUMPTION</TableCell>                        
             </TableRow>
        </TableHead>
        <TableBody>
            {/*seleziono la stanza grazie a idRoom fornito dal componente {room(ex andreaoffice, meeting...)}*/}
        {room?.map((r)=>(
                    <TableRow key={idRoom}>
                        <TableCell>{r.state.id}</TableCell>
                        <TableCell>{r.room != undefined ? r.room : ''}</TableCell>
                        {/*if light is on color:green else if is off color red */}
                        <TableCell style={{ color: r.state.output ? 'green' : 'red' }}>{r.state.output ? 'ON' : 'OFF'}</TableCell>
                        <TableCell>{r.state.apower} Watt</TableCell>
                        <TableCell>{r.state.aenergy?.total} Watt/h</TableCell>
                        </TableRow>
           
           
           ))  
        }
        </TableBody>
    </Table>
</TableContainer>
  )
}

export default TableRooms
