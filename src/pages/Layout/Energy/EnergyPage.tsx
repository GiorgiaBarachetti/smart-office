import React, { useState, useEffect } from 'react';
import { Energy} from '../../../utils/interfaces/Interfaces';
import TableEnergy from '../../../components/Tables/TableEnergy'
import { baseURL, urlAlhpa } from '../../../utils/fetch/api';
import { Box, Typography } from '@mui/material';
import { SHADOWSTYLE } from '../../../utils/const/Const';

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
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ padding: '10px', borderRadius: '6px', bgcolor: 'lightgrey', mx: 'auto', my: '30px', width: '70%', ...SHADOWSTYLE}} >
    <Typography sx={{ mt: '10px', variant: 'h1', textAlign: 'center' }}>COFFEE COUNT</Typography>
      <TableEnergy energy={energyDatas}/>
    </Box>
  )
}

export default EnergyPage
