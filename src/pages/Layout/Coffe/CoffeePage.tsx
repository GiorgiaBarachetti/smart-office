import { Box, Button, Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import coffee from '../../../img/Immagine_2023-06-05_090757-removebg-preview.png';
import doubleCoffee from '../../../img/Immagine_2023-06-01_175307-removebg-preview.png';
import background from '../../../img/CoffeeBeans.jpg';
import { Coffee } from '../../../utils/interfaces/Interfaces';
import { baseURL, urlCoffee } from '../../../utils/fetch/api';
import { SHADOWSTYLE } from '../../../utils/const/Const';

const BOXSTYLE = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  backgroundColor: 'white',
  maxWidth: '160px',
  height: '110px',
  padding: '20px',
  m: '20px',
  alignItems: 'center',
  borderRadius: '7px',
  color: 'black',
  ...SHADOWSTYLE
}
const CONSUMESSTYLE = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  backgroundColor: 'white',
  padding: '20px',
  m: '20px',
  alignItems: 'center',
  color: 'black',
  borderRadius: '50%',
  width: '105px',
  height: '105px',
  ...SHADOWSTYLE
}

const TYTLESTYLE = {
  color: 'black',
  mt: '10px',
  variant: 'h1',
  textAlign: 'center'
}
const CoffeePage = () => {

  const [coffeeData, setCoffeeData] = useState<Coffee[]>([]);
  const isXsScreen = useMediaQuery('(min-width:900px)');

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
    <Box component='div' padding={5}>
      {/**DESKTOP */}
      {isXsScreen ? (
        <Grid container spacing={2}>
          <Grid item xs={9} >
            <Box component='div' style={{ backgroundColor: '#d3d3d382', borderRadius: '6px', height: '60%', marginBottom: '0' }}>
              <Typography
                variant="h5"
                sx={{
                  bgsize: 'auto',
                  textAlign: 'center',
                  pt: '20px',
                  mx: 'auto',
                  color: 'black'
                }}>
                SELECT THE QUANTITY OF COFFEE
              </Typography>

              <Box component='div' sx={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center', p: '20px' }}>
                <Button sx={{cursor:'pointer'}} onClick={handleCoffeeClick}>
                  <Box
                    component="img" src={coffee}
                    sx={{
                      maxHeight: { xs: 120, md: 189, border: 'white' },
                      pt: { xs: '10px', md: '20px' },
                    }} />
                </Button>

                <Button sx={{cursor:'pointer'}}
                  onClick={handleDoubleCoffeeClick}
                >
                  <Box component="img" src={doubleCoffee}
                    sx={{
                      maxHeight: { xs: 140, md: 220 },
                    }} />
                </Button>
              </Box>
              <Typography sx={{ textAlign: 'center', color: '#d3d3d382' }}>{message}</Typography>
            </Box>



            <Box component="div" style={{ backgroundColor: '#d3d3d382', borderRadius: '6px', height: '40%' }}>
              <Box component="div" p={'5px'}>
                <Typography variant="h5" sx={{ ...TYTLESTYLE }}>COFFEE COUNT</Typography>

                <Box component="div" sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>

                  {coffeeData?.map((c) => (
                    <Box component="div" key={c.coffes.id} sx={{ ...BOXSTYLE }}>
                      <Typography sx={{ textAlign: 'center' }}>TOTAL COFFEES MADE TODAY</Typography>
                      <Typography sx={{ textAlign: 'center', fontWeight:'bold' }}>{c.data?.totalCoffeeToday > 1 ? `${c.data?.totalCoffeeToday} coffees` : `${c.data?.totalCoffeeToday} coffee`}</Typography>
                    </Box>
                  ))}
                  {coffeeData?.map((c) => (
                    <Box component="div" key={c.coffes.id} sx={{ ...BOXSTYLE }}>
                      <Typography sx={{ textAlign: 'center' }}>TOTAL SINGLE COFFEES</Typography>
                      <Typography sx={{ textAlign: 'center', fontWeight:'bold' }}>{c.data?.count1 >= 1 ? `${c.data?.count1} coffees` : `${c.data?.count1} coffee`}</Typography>
                      {/*<CountUp delay={1} end={c.data?.count1}/>*/}
                    </Box>
                  ))}
                  {coffeeData?.map((c) => (
                    <Box component="div" key={c.coffes.id} sx={{ ...BOXSTYLE }}>
                      <Typography sx={{ textAlign: 'center' }}>TOTAL DOUBLE COFFES</Typography>
                      <Typography sx={{ textAlign: 'center', fontWeight:'bold' }}>{c.data?.count2 >= 1 ? `${c.data?.count2} double coffees` : `${c.data?.count2} double coffee`}</Typography>
                    </Box>
                  ))}

                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Box component="div" sx={{ paddingBottom: '0', backgroundColor: '#d3d3d382', borderRadius: '6px', height: '100%', pt: '30px', }}>
              <Typography variant="h5" sx={{ ...TYTLESTYLE }}>CONSUMES</Typography>
              <Box component="div" sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                {coffeeData?.map((c) => (
                  <Box key={c.coffes.id} sx={{ ...CONSUMESSTYLE }}>
                    <Typography sx={{ textAlign: 'center' }}>POWER</Typography>
                    <Typography sx={{ textAlign: 'center', fontWeight:'bold' }}>{c.data?.macchinettaCaffe?.receivedData?.watt !== undefined ? `${c.data?.macchinettaCaffe?.receivedData?.watt}` : '0'} W</Typography>
                  </Box>
                ))}
                {coffeeData?.map((c) => (
                  <Box component="div" key={c.coffes.id} sx={{ ...CONSUMESSTYLE }}>
                    <Typography sx={{ textAlign: 'center' }}>VOLTAGE</Typography>
                    <Typography sx={{ textAlign: 'center', fontWeight:'bold' }}>{c.data?.macchinettaCaffe?.receivedData?.volts !== undefined ? `${c.data?.macchinettaCaffe?.receivedData?.volts}` : '0'} V</Typography>
                  </Box>
                ))}
                {coffeeData?.map((c) => (
                  <Box component="div" key={c.coffes.id} sx={{ ...CONSUMESSTYLE }}>
                    <Typography sx={{ textAlign: 'center' }}>AMPERE</Typography>
                    <Typography sx={{ textAlign: 'center', fontWeight:'bold' }}>{c.data?.macchinettaCaffe?.receivedData?.ampere !== undefined ? `${c.data?.macchinettaCaffe?.receivedData?.ampere}` : '0'} A</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>

      ) : (

        <Box component="div">
          <Box component="div">
            <Box component="div" sx={{ backgroundColor: '#d3d3d382', borderRadius: '6px', height: '50%' }}>
              <Typography
                variant="h6"
                sx={{
                  bgsize: 'auto',
                  textAlign: 'center',
                  pt: '20px',
                  mx: 'auto',

                  color: 'black'
                }}>
                SELECT THE QUANTITY OF COFFEE
              </Typography>

              <Box component="div" sx={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center', p: '20px' }}>
                <Button sx={{cursor:'pointer'}} onClick={handleCoffeeClick}>
                  <Box
                    component="img" src={coffee}
                    sx={{
                      maxHeight: { xs: 120, md: 189, border: 'white' },
                      pt: { xs: '10px', md: '20px' },
                    }} />
                </Button>

                <Button
                sx={{cursor:'pointer'}}
                  onClick={handleDoubleCoffeeClick}
                >
                  <Box sx={{
                    maxHeight: { xs: 140, md: 220 },
                  }} component="img" src={doubleCoffee} />
                </Button>
              </Box>
              <Typography sx={{ textAlign: 'center', color: '#d3d3d382' }}>{message}</Typography>
            </Box>



            <Box component="div" style={{ backgroundColor: '#d3d3d382', borderRadius: '6px', height: '50%' }}>
              <Box component='div' padding={'10px'} marginTop={'10px'}>
              <Typography variant="h6" sx={{ ...TYTLESTYLE }}>COFFEE COUNT</Typography>

              <Box component="div" sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>

                {coffeeData?.map((c) => (
                  <Box component="div" key={c.coffes.id} sx={{ ...BOXSTYLE }}>
                    <Typography sx={{ textAlign: 'center' }}>TOTAL COFFEES MADE TODAY</Typography>
                    <Typography sx={{ textAlign: 'center', fontWeight:'bold' }}>{c.data?.totalCoffeeToday > 1 ? `${c.data?.totalCoffeeToday} coffees` : `${c.data?.totalCoffeeToday} coffee`}</Typography>
                  </Box>
                ))}
                {coffeeData?.map((c) => (
                  <Box component="div" key={c.coffes.id} sx={{ ...BOXSTYLE }}>
                    <Typography sx={{ textAlign: 'center' }}>TOTAL SINGLE COFFEES</Typography>
                    <Typography sx={{ textAlign: 'center', fontWeight:'bold' }}>{c.data?.count1 >= 1 ? `${c.data?.count1} coffees` : `${c.data?.count1} coffee`}</Typography>
                    {/*<CountUp delay={1} end={c.data?.count1}/>*/}
                  </Box>
                ))}
                {coffeeData?.map((c) => (
                  <Box component="div" key={c.coffes.id} sx={{ ...BOXSTYLE }}>
                    <Typography sx={{ textAlign: 'center' }}>TOTAL DOUBLE COFFES</Typography>
                    <Typography sx={{ textAlign: 'center', fontWeight:'bold' }}>{c.data?.count2 >= 1 ? `${c.data?.count2} double coffees` : `${c.data?.count2} double coffee`}</Typography>
                  </Box>
                ))}
                    </Box>
              </Box>
            </Box>
          </Box>

          <Box component="div" sx={{ pt: '10px' }}>
            <Box component="div" sx={{ backgroundColor: '#d3d3d382', borderRadius: '6px', height: '100%', py: '2px', }}>
              <Typography variant="h6" sx={{ ...TYTLESTYLE }}>CONSUMES</Typography>
              <Box component="div" sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                {coffeeData?.map((c) => (
                  <Box component="div" key={c.coffes.id} sx={{ ...CONSUMESSTYLE, borderRadius: '50%' }}>
                    <Typography sx={{ textAlign: 'center' }}>POWER</Typography>
                    <Typography sx={{ textAlign: 'center' , fontWeight:'bold'}}>{c.data?.macchinettaCaffe?.receivedData?.watt !== undefined ? `${c.data?.macchinettaCaffe?.receivedData?.watt}` : '0'} W</Typography>
                  </Box>
                ))}
                {coffeeData?.map((c) => (
                  <Box component="div" key={c.coffes.id} sx={{ ...CONSUMESSTYLE, borderRadius: '50%' }}>
                    <Typography sx={{ textAlign: 'center' }}>VOLTAGE</Typography>
                    <Typography sx={{ textAlign: 'center', fontWeight:'bold' }}>{c.data?.macchinettaCaffe?.receivedData?.volts !== undefined ? `${c.data?.macchinettaCaffe?.receivedData?.volts}` : '0'} V</Typography>
                  </Box>
                ))}
                {coffeeData?.map((c) => (
                  <Box component="div" key={c.coffes.id} sx={{ ...CONSUMESSTYLE }}>
                    <Typography sx={{ textAlign: 'center' }}>AMPERE</Typography>
                    <Typography sx={{ textAlign: 'center', fontWeight:'bold' }}>{c.data?.macchinettaCaffe?.receivedData?.ampere !== undefined ? `${c.data?.macchinettaCaffe?.receivedData?.ampere}` : '0'} A</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CoffeePage;
