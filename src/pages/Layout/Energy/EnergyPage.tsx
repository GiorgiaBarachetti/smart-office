import React, { useState, useEffect } from 'react';
import { Energy } from '../../../utils/interfaces/Interfaces';
import TableEnergy from '../../../components/Tables/TableEnergy'
import { baseURL, urlAlhpa } from '../../../utils/fetch/api';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { SHADOWSTYLE } from '../../../utils/const/Const';
import background from '../../../img/energy.jpeg'
const EnergyPage = () => {
  const [energyDatas, setEnergyDatas] = useState<Energy[]>([]);

  const fetchPrinter = async () => {
    try {
      const response = await fetch(`${baseURL}${urlAlhpa}`);
      const data = await response?.json();
      setEnergyDatas(Array.isArray(data) ? data : [data]);
      console.log(data);
    } catch (error) {
      console.log('not found datas of energy');
    }
  };

  useEffect(() => {
    fetchPrinter();
  }, []);


  return (
    <div style={{backgroundImage: `url(${background})`,  backgroundRepeat: 'no-repeat', backgroundSize: 'cover', marginTop:'-27px'}}>
      <Box paddingTop={'30px'} paddingBottom={'350px'}>

      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ padding: '10px', borderRadius: '6px', bgcolor: '#d3d3d382', mx: 'auto', my: '30px', width: {xs: '80%',sm: '80%', md: '70%'}, ...SHADOWSTYLE }} >
        <Typography variant='h6'  sx={{ mt: '10px', variant: 'h1', textAlign: 'center' }}>CONSUMES</Typography>
        <TableEnergy energy={energyDatas} />
      </Box>
      </Box>
    </div>
  )
}

export default EnergyPage
