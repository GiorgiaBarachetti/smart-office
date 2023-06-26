import React, { useState, useEffect } from 'react';
import { Niveus } from '../../../utils/interfaces/Interfaces';
import { baseURL, urlNiveus } from '../../../utils/fetch/api';
import { Box, Typography } from '@mui/material';
import { SHADOWSTYLE } from '../../../utils/const/Const';
import background from '../../../img/niveus.png'
import TableNiveus from '../../../components/Tables/TableNiveus';
import ChartNiveus from '../../../components/Chart/ChartNiveus';
import './style.css'

const NiveusPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [niveusData, setNiveusData] = useState<Niveus[]>([]);

  const fetchNiveus = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${baseURL}${urlNiveus}/registers`);
      const data = await response?.json();
      setNiveusData(Array.isArray(data) ? data : [data]);
      setIsLoading(false)
    } catch (error) {
      console.log('error fetching datas of niveus', error);
    }
  };

  useEffect(() => {
    fetchNiveus();
  }, []);

  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', marginTop: '-27px' }} >
      <Box component='div' paddingTop={'30px'} paddingBottom={'430px'}>
        <Box component='div' className="test" display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ padding: '10px', borderRadius: '6px', bgcolor: '#d3d3d382', mx: 'auto', my: '30px', width: { xs: '80%', sm: '80%', md: '70%' }, ...SHADOWSTYLE }} >
          <Typography variant='h6' sx={{color: 'white', mt: '10px', variant: 'h1', textAlign: 'center' }}>CONSUMES</Typography>
          <Box component='div' sx={{ padding: '1px', borderRadius: '11px', mx: 'auto', my: '30px', width: { xs: '80%', sm: '80%', md: '70%' }, ...SHADOWSTYLE }} >
            <TableNiveus niveus={niveusData}  loading={isLoading} />
          </Box>
            <ChartNiveus />
        </Box>
      </Box>
    </div>
  )
}

export default NiveusPage
