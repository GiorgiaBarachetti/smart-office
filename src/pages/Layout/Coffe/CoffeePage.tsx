import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import coffee from '../../../img/Immagine_2023-06-05_090757-removebg-preview.png';
import doubleCoffee from '../../../img/Immagine_2023-06-01_175307-removebg-preview.png';
import background from '../../../img/output-onlinepngtools.png';

const CoffeePage = () => {
  const fetchCoffee = async (number: number) => {
    try {
      const response = await fetch(`http://192.168.1.6:3000/api/coffee/${number}`);
      const data = await response.json();
      // Process the response data if needed
    } catch (error) {
      console.log('Error fetching coffee:', error);
    }
  };

  const handleCoffeeClick = () => {
    coffeeNumber(1);
  };

  const handleDoubleCoffeeClick = () => {
    coffeeNumber(2);
  };

  const coffeeNumber = async (number: number) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await fetch(`http://192.168.1.6:3000/api/coffee/${number}`, {
      method: 'POST',
      headers,
    });

    await fetchCoffee(number);
  };

  useEffect(() => {
    fetchCoffee(0);
  }, []);

  return (
    <Box>

      <Box
        component="div"
        sx={{
          //backgroundImage: `url(${background})`,
          //backgroundImage:'linear-gradient(black, white);',
          //backgroundRepeat: "no-repeat",
          //backgroundSize: "cover",
          backgroundColor: '#121211',
          backgroundImage: 'radial-gradient(#ffffff2b, #000000)',
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
            bgcolor: 'black',
            bgsize: 'auto',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '400px',
            padding:'10px',
            mx: 'auto',
            mt: '60px',
            mb: '40px',
            color:'white',
            fontSize: '20px',
            borderRadius:'7px'
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
      </Box>
    </Box>
  );
};

export default CoffeePage;
