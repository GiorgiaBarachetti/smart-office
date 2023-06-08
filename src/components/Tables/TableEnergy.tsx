import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Energy } from '../../utils/interfaces/Interfaces';
import { baseURL, urlAlhpa } from '../../utils/fetch/api';

interface Props {
  energy: Energy[]
}

const TableEnergy = ({ energy }: Props) => {
  
  const [energyDatas, setEnergyDatas] = useState<Energy[]>([]);
  const fetchPrinter = async () => {
    try {
      const response = await fetch(`${baseURL}${urlAlhpa}`);
      const data = await response?.json();
      setEnergyDatas(Array.isArray(data) ? data : [data]);
      console.log(data);
    } catch (error) {
      console.log('not found datas');
    }
  };
  
  useEffect(() => {
    fetchPrinter();
  }, []);


  const [boltStyle, setBoltStyle] = useState({
    backgroundColor: "rgba(113,200,16)"
  })
  const changeStyleBolt = () => {
    //if the powerused of the first element of energy array is >= 690 
    if (energyDatas[0]?.powerUsed >= 1308) {
      console.log(energyDatas[0]?.powerUsed);
      return {
        ...boltStyle,
        color: "rgba(202,232,76)"
      };
    } else if (energyDatas[0]?.powerUsed >= 2070) {
      return {
        ...boltStyle,
        color: "rgba(244,245,27)"
      };
    } else if (energyDatas[0]?.powerUsed >= 2760) {
      return {
        ...boltStyle,
        color: "rgba(226,172,26)"
      };
    } else if (energyDatas[0]?.powerUsed >= 3450) {
      return {
        ...boltStyle,
        color: "rgba(224,60,60)"
      };
    }
    return boltStyle;
  };


  useEffect(() => {
    const updatedBoltStyle = changeStyleBolt();
    setBoltStyle(updatedBoltStyle);
  }, [energyDatas]);


  return <TableContainer sx={{ borderRadius: '6px', mx: 'auto', my: '30px', width: '85%'}} style={boltStyle}>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>POWER CURRENTLY USED ..until this moment..</TableCell>
          <TableCell>POWER USED EVERY 15 min</TableCell>
          <TableCell>CURRENT HOUR</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {energy?.map((energ) => (
          <TableRow key={896}>
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
