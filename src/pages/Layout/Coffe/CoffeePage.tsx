import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import coffee from '../../../img/Immagine_2023-06-05_090757-removebg-preview.png';
import doubleCoffee from '../../../img/Immagine_2023-06-01_175307-removebg-preview.png';
import background from '../../../img/output-onlinepngtools.png';
import { Coffee } from '../../../utils/interfaces/Interfaces';
import TableCoffee from '../../../components/Tables/TableCoffee';
import { baseURL, urlCoffee } from '../../../utils/fetch/api';
import { SHADOWSTYLE } from '../../../utils/const/Const';

const CoffeePage = () => {

  const [coffeeData, setCoffeeData] = useState<Coffee[]>([]);

  const fetchCoffee = async () => {
    try {
      const response = await fetch(`${baseURL}${urlCoffee}/data`);
      const data = await response?.json();
      //Array.isArray(data) ? data : [data] senno dice che coffeeDatas non è una function
      setCoffeeData(Array.isArray(data) ? data : [data]);
      console.log(data);
    } catch (error) {
      console.log('Error fetching coffee:', error);
    }
  };



  const handleCoffeeClick = () => {
    fetchCoffeeNumber(1);
  };

  const handleDoubleCoffeeClick = () => {
    fetchCoffeeNumber(2);
  };
  
  
  const [message, setMessage] = useState('')
  const fetchCoffeeNumber = async (number: number) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(`${baseURL}${urlCoffee}/${number}`, {
      method: 'POST',
      headers,
    });
    console.log('made')
    await fetchCoffee();
    return setMessage('Coffee number has been saved')
  };

  useEffect(() => {
   
    fetchCoffee()
  }, []);

  return (
    <Box>

      <Box
        component="div"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,

        }}
      ></Box>

      <Box>
        <Typography
          sx={{
            bgsize: 'auto',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '400px',
            padding:'10px',
            mx: 'auto',
            mt: '60px',
            mb: '40px',
            fontSize: '20px',
          }}
        >
          SELECT THE QUANTITY OF COFFEE
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '150px', justifyContent: 'center' }}>
          <Button
            onClick={handleCoffeeClick}

          >
            <Box sx={{
              maxHeight: { xs: 120, md: 189, border: 'white' },
              pt: { xs: '10px', md: '20px' },
            }} component="img" src={coffee} />
          </Button>

          <Button
            onClick={handleDoubleCoffeeClick}
          >
            <Box sx={{
              maxHeight: { xs: 140, md: 220 },
            }} component="img" src={doubleCoffee} />
          </Button>
        </Box>
        <Typography>{message}</Typography>
      </Box>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ padding: '10px', borderRadius: '6px', bgcolor: 'lightgrey', mx: 'auto', my: '30px', width: '70%' }} style={SHADOWSTYLE}>
      <Typography sx={{ mt: '10px', variant: 'h1', textAlign: 'center' }}>COFFEE COUNT</Typography>
      <TableCoffee coffee={coffeeData}/>
      </Box>
    </Box>
  );
};

export default CoffeePage;
