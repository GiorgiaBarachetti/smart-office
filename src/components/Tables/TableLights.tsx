import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Lights } from '../../utils/interfaces/Interfaces';

interface Props {
    lightsDatasArray : Lights[]
}

const TableLights = ({lightsDatasArray}: Props) => {
    //sum of current consumption 
    
    const totalApower = lightsDatasArray.length ? lightsDatasArray.reduce(
        //on= somma actual
        //light= somma da aggiungere
        (currentValueSum, light) => currentValueSum + (light.state.apower  || 0),
        //somma di partenza
         0) : 0;
   
    //sum of hour consumption 
    const totalAenergy = lightsDatasArray.reduce((currentValueSum, light) => currentValueSum + (light.state.aenergy?.total || 0), 0);
    //total count of room with light on
    const totalLightsOn = lightsDatasArray.filter((light) => light.state.output).length;
    //ordinamento per id ascendente
    const sortedLightsDatasArray = lightsDatasArray.sort((a, b) => a.state.id - b.state.id);
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
            {/*elimino le due stanze che sono in piu*/}
        {sortedLightsDatasArray?.filter((light) =>
                        light.state.id !== 8 &&
                        light.state.id !== 9
                        /*
                        light.room !== "----" &&
                        light.room !== "Punto luce non attivo"
                         */
                    )
                .map((light)=>(
                    <TableRow key={light.state.id}>
                        <TableCell>{light.state.id}</TableCell>
                        <TableCell>{light.room}</TableCell>
                        {/*if light is on color:green else if is off color red */}
                        <TableCell style={{ color: light.state.output ? 'green' : 'red' }}>{light.state.output ? 'ON' : 'OFF'}</TableCell>
                        <TableCell>{light.state.apower} Watt</TableCell>
                        <TableCell>{light.state.aenergy?.total} Watt/h</TableCell>
                        </TableRow>
                ))}
            <TableRow>
                <TableCell colSpan={2}></TableCell>
                <TableCell>TOTAL ROOM WITH LIGHT ON</TableCell>
                <TableCell>TOTAL ACTUAL CONSUMPTION</TableCell>
                <TableCell>TOTAL HOUR CONSUMPTION</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={2}></TableCell>
                <TableCell>{totalLightsOn}</TableCell>
                <TableCell>{totalApower} Watt</TableCell>
                <TableCell>{totalAenergy} Watt/h</TableCell>
                {/* fixed on decimal 
                <TableCell>{(totalAenergy).toFixed(2)} Watt/h</TableCell>
                */}
            </TableRow>    
        </TableBody>
    </Table>
</TableContainer>
  )
}

export default TableLights
