import React, { useState, useEffect } from 'react';
import { Energy } from '../../../utils/interfaces/Interfaces';
import TableEnergy from '../../../components/Tables/TableEnergy'
import { baseURL, urlAlhpa, urlEvents } from '../../../utils/fetch/api';
import { Box, Typography } from '@mui/material';
import { CONTAINERBOX, SHADOWSTYLE } from '../../../utils/const/Const';
import background from '../../../img/energyy.jpg'
import ChartEnergy from '../../../components/Chart/ChartEnergy';
import SnackbarGeneral from '../../../components/Snackbar/SnackbarGeneral';

const EnergyPage = () => {
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [energyStatus, setEnergyStatus] = useState<Energy[]>([]);
  
  const handleClose = () => {
    setOpen(false);
    setMessage('')
  };

  const fetchEnergy = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${baseURL}${urlAlhpa}/registers`);
      const data = await response?.json();
      setEnergyStatus(Array.isArray(data) ? data : [data]);
      setIsLoading(false)
    } catch (error) {
      setOpen(true)
      setMessage(`Error fetching energy`);
    }
  };

  useEffect(() => {
    fetchEnergy();
  }, []);

  useEffect(() => {
    const source = new EventSource(`${baseURL}${urlEvents}`);

    source.onmessage = (event) => {
      if (event.data) {
        const json: Energy = JSON.parse(event.data)
        if (json.id === 200 && json) {
          const newData: Energy = {
            ...json
          };
          setEnergyStatus(Array.isArray(newData) ? newData : [newData]);
        }
      }
    };

    source.onerror = () => {
      setOpen(true)
      setMessage(`Error finding energy events`);
    }

    return () => {
      source.close();
    };

  }, []);

  const [boltStyle, setBoltStyle] = useState({
    backgroundColor: "rgb(113,200,16)"
  })
  
  const changeStyleBolt = () => {
    //if the powerused of the first element of energy array is >= 690 
    if (energyStatus[0]?.powerUsed >= 1308) {
      return {
        ...boltStyle,
        color: "rgba(202,232,76)"
      };
    } else if (energyStatus[0]?.powerUsed >= 2070) {
      return {
        ...boltStyle,
        color: "rgba(244,245,27)"
      };
    } else if (energyStatus[0]?.powerUsed >= 2760) {
      return {
        ...boltStyle,
        color: "rgba(226,172,26)"
      };
    } else if (energyStatus[0]?.powerUsed >= 3450) {
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
  }, [energyStatus]);

  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', minHeight: '94vh' }}>
      <Box component='div' py={'30px'} >
        <Box component='div' sx={{ ...CONTAINERBOX }} >
          <Typography variant='h6' sx={{ color: 'white', mt: '10px', variant: 'h1', textAlign: 'center' }}>CONSUMPTIONS</Typography>
          <Box component='div' sx={{ padding: '2px', borderRadius: '13px', bgcolor: { ...boltStyle }, mx: 'auto', my: '20px', width: { xs: '80%', sm: '80%', md: '70%' }, ...SHADOWSTYLE }} >
            <TableEnergy loading={isLoading} energy={energyStatus} />
          </Box>
          <ChartEnergy />
        </Box>
      </Box>
      {message != '' ? <SnackbarGeneral openSnackbar={open} handleClose={() => handleClose()} message={message} /> : null}
    </div>
  )
}

export default EnergyPage
