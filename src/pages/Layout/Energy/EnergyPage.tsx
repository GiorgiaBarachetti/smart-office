import React, { useState, useEffect } from 'react';
import { Energy } from '../../../utils/interfaces/Interfaces';
import TableEnergy from '../../../components/Tables/TableEnergy'
import { baseURL, urlAlhpa } from '../../../utils/fetch/api';
import { Box, Typography } from '@mui/material';
import { SHADOWSTYLE } from '../../../utils/const/Const';
import background from '../../../img/energyy.jpg'
import ChartPage from '../../../components/Chart/ChartEnergy';
const EnergyPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [energyStatus, setEnergyStatus] = useState<Energy[]>([]);

  const fetchPrinter = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${baseURL}${urlAlhpa}/registers`);
      const data = await response?.json();
      setEnergyStatus(Array.isArray(data) ? data : [data]);
      console.log(data);
      setIsLoading(false)
    } catch (error) {
      console.log('not found datas of energy');
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
    if (energyStatus[0]?.powerUsed >= 1308) {
      console.log(energyStatus[0]?.powerUsed);
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
    <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', marginTop: '-27px' }}>
      <Box component='div' paddingTop={'30px'} paddingBottom={'430px'}>
        <Box component='div' display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ padding: '10px', borderRadius: '6px', bgcolor: '#d3d3d382', mx: 'auto', my: '30px', width: { xs: '80%', sm: '80%', md: '70%' }, ...SHADOWSTYLE }} >
          <Typography variant='h6' sx={{ mt: '10px', variant: 'h1', textAlign: 'center' }}>CONSUMES</Typography>
          <Box component='div' sx={{ padding: '1px', borderRadius: '11px', bgcolor: {...boltStyle}, mx: 'auto', my: '30px', width: { xs: '80%', sm: '80%', md: '70%' }, ...SHADOWSTYLE }} >
            <TableEnergy loading={isLoading} energy={energyStatus} />
          </Box>
            <ChartPage id={200}/>
        </Box>
      </Box>
    </div>
  )
}

export default EnergyPage
