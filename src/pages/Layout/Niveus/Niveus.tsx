import React, { useState, useEffect } from 'react';
import { Niveus } from '../../../utils/interfaces/Interfaces';
import { baseURL, urlNiveus } from '../../../utils/fetch/api';
import { Box, Typography, CircularProgress } from '@mui/material';
import { CONTAINERBOX } from '../../../utils/const/Const';
import background from '../../../img/niveus.png';
import TableNiveus from '../../../components/Tables/TableNiveus';
import ChartNiveus from '../../../components/Chart/ChartNiveus';
import './style.css'
const NiveusPage = () => {
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [niveusData, setNiveusData] = useState<Niveus[]>([]);

  const fetchNiveus = async (numberCase: number) => {
    try {
      if (numberCase === 0) {
        const response = await fetch(`${baseURL}${urlNiveus}/registers`);
        const data = await response?.json();
        setNiveusData(Array.isArray(data) ? data : [data]);
        setIsLoadingPage(false);
      } else {
        setIsLoading(true);
        const response = await fetch(`${baseURL}${urlNiveus}/registers`);
        const data = await response?.json();
        setNiveusData(Array.isArray(data) ? data : [data]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('error fetching datas of niveus', error);
    }
  };

  useEffect(() => {
    setIsLoadingPage(true);
    fetchNiveus(0);
  }, []);


  useEffect(() => {
    const source = new EventSource('http://192.168.1.6:3000/events');

    source.onmessage = (event) => {
      if(event.data){
      const json : Niveus = JSON.parse(event.data)

        if(json.id === 400 && json.data.receivedData){
          const { volts, ampere, watt } = json.data.receivedData;
          const newData : Niveus = {
            id: json.id,
            data: {
              receivedData:{
                volts: volts,
                ampere: ampere,
                watt: watt,
              }
            },
          };
          setNiveusData(Array.isArray(newData) ? newData : [newData]);
        }
      }
    };
    
    source.onerror=()=>{
      console.log('Error finding Niveus events')
    }


    return () => {
      source.close();
    };

  }, []);
  
  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', minHeight: '93vh' }}>
      {isLoadingPage ? (
        <CircularProgress sx={{ position: 'absolute', top: 100, right: 50 }} />
      ) : (
        <Box component="div" py={'30px'}>
          <Box component="div" className="test" sx={{ ...CONTAINERBOX }}>
            <Typography variant="h6" sx={{ color: 'white', textAlign: 'center'}}>CONSUMPTIONS</Typography>
            <TableNiveus niveus={niveusData} loading={isLoading} />
            <ChartNiveus />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default NiveusPage;
