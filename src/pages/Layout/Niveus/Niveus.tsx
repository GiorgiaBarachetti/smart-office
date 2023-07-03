import React, { useState, useEffect } from 'react';
import { Niveus } from '../../../utils/interfaces/Interfaces';
import { baseURL, urlNiveus } from '../../../utils/fetch/api';
import { Box, Typography, CircularProgress } from '@mui/material';
import { CONTAINERBOX } from '../../../utils/const/Const';
import background from '../../../img/niveus.png'
import TableNiveus from '../../../components/Tables/TableNiveus';
import ChartNiveus from '../../../components/Chart/ChartNiveus';
import './style.css'

const NiveusPage = () => {

  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState(false)
  const [niveusData, setNiveusData] = useState<Niveus[]>([]);

  const fetchNiveus = async (numberCase: number) => {
    try {
      if (numberCase === 0) {
        const response = await fetch(`${baseURL}${urlNiveus}/registers`);
        const data = await response?.json();
        setNiveusData(Array.isArray(data) ? data : [data]);
        setIsLoadingPage(false)
      } else {
        setIsLoading(true)
        const response = await fetch(`${baseURL}${urlNiveus}/registers`);
        const data = await response?.json();
        setNiveusData(Array.isArray(data) ? data : [data]);
        setIsLoading(false)
      }
    } catch (error) {
      console.log('error fetching datas of niveus', error);
    }
  };

  useEffect(() => {
    setIsLoadingPage(true)
    fetchNiveus(0)
    //setInterval(()=>fetchNiveus(1),5000);
  }, []);

  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', minHeight: '93vh' }} >
      {isLoadingPage ? <CircularProgress sx={{ position: 'absolute', top: 100, right: 50 }} /> :
        <Box component='div' py={'30px'}>
          <Box component='div' className="test" sx={{ ...CONTAINERBOX }} >
            <Typography variant='h6' sx={{ color: 'white', textAlign: 'center', pb:'20px' }}>CONSUMPTIONS</Typography>
            <TableNiveus niveus={niveusData} loading={isLoading} />
            <ChartNiveus />
          </Box>
        </Box>
      }
    </div>
  )
}

export default NiveusPage
