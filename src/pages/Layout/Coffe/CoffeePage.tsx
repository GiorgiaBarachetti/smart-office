import { Box, Typography, useMediaQuery, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Coffee, CoffeeConsumes } from '../../../utils/interfaces/Interfaces';
import { baseURL, urlCoffee, urlEvents } from '../../../utils/fetch/api';
import Stack from '@mui/material/Stack';
import background from './../../../img/coffee-5447420_1280.jpg'
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import ChartCoffee from '../../../components/Chart/ChartCoffee';
import TableCoffee from '../../../components/Tables/TableCoffee';
import SnackbarGeneral from '../../../components/Snackbar/SnackbarGeneral';

const CoffeePage = () => {
  const isXsScreen = useMediaQuery('(min-width:910px)');
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [coffeeConsumes, setCoffeeConsumes] = useState<CoffeeConsumes[]>([]);
  const [coffeeData, setCoffeeData] = useState<Coffee[]>([]);
  const defaultValue: [Dayjs | null, Dayjs | null] = [dayjs(new Date().setHours(0)), dayjs(new Date())];
  const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>(defaultValue);
  
  const handleClose = () => {
    setOpen(false);
    setMessage('')
  };

  const handleDateChange = (newDates: [Dayjs | null, Dayjs | null]) => {
    setSelectedDates(newDates);
  };

  const fetchCoffeeConsumes = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${baseURL}${urlCoffee}/registers`);
      const data = await response?.json();
      //Array.isArray(data) ? data : [data] senno dice che coffeeDatas non è una function
      setCoffeeConsumes(Array.isArray(data) ? data : [data]);
      setLoading(false)
    } catch (error) {
      setOpen(true)
      setMessage(`Error fetching coffee consumes`);
    }
  };

  const fetchCoffee = async () => {
    try {
      setLoading(true)
      const startDate = selectedDates[0]?.toISOString()
      const endDate = selectedDates[1]?.toISOString()
      const response = await fetch(`${baseURL}${urlCoffee}/data/count?start=${startDate}&end=${endDate}`);
      const data = await response?.json();
      //Array.isArray(data) ? data : [data] senno dice che coffeeDatas non è una function
      setCoffeeData(Array.isArray(data) ? data : [data]);
      setLoading(false)
    } catch (error) {
      setOpen(true)
      setMessage(`Error fetching coffee count`);
    }
  };

  const coffeeSum = coffeeData.reduce((sum, c) => {
    const singleCoffee = c.data.UNCaffe || 0;
    const doubleCoffee = c.data.DUECaffe || 0;
    return sum + singleCoffee + doubleCoffee * 2;
  }, 0);

  useEffect(() => {
    setLoading(true)
    fetchCoffee()
    fetchCoffeeConsumes()
  }, [selectedDates])

  useEffect(() => {
    const source = new EventSource(`${baseURL}${urlEvents}`);

    source.onmessage = (event) => {
      if (event.data) {
        const json: CoffeeConsumes = JSON.parse(event.data)
        if (json.id === 100 && json) {
          const newData: CoffeeConsumes = {
            ...json
          };
          setCoffeeConsumes(Array.isArray(newData) ? newData : [newData]);
        }
      }
    };

    source.onerror = () => {
      setOpen(true)
      setMessage(`Error finding coffee events`);
    }

    return () => {
      source.close();
    };

  }, []);

  return (
    <Box style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', minHeight: '92.3vh' }}>
      <Box component='div' py={'30px'} mx={'auto'} >
        {/**DESKTOP */}
        <Stack direction='column' gap={'10px'} sx={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center', alignItems: 'stretch' }} >
          <Box component="div" style={{ backgroundColor: '#d3d3d382', borderRadius: '6px', }}>

            <Typography variant="h6" sx={{ textAlign: 'center', pt: '30px', color: 'white' }}>CONSUMPTIONS</Typography>
            <TableCoffee coffee={coffeeConsumes} loading={loading} />
            <Typography variant="h6" sx={{ textAlign: 'center', color: 'white', mt: '30px' }}>COFFEE COUNT</Typography>
            <Box component="div" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', height: '360px', bgcolor: 'white', padding: '25px', mx: 'auto', my: '30px', borderRadius: '11px', width: '70%' }}>
              <Typography>Choose a date range</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem component="MultiInputDateTimeRangeField">
                  <MultiInputDateTimeRangeField
                    value={selectedDates}
                    onChange={(event) => handleDateChange(event)}
                    defaultValue={[dayjs('2022-04-17T15:30'), dayjs('2022-04-21T18:30')]}
                  />
                </DemoItem>
              </LocalizationProvider>
              {loading ? (<LinearProgress />) : (
                coffeeData.map((coffee) => (
                  isXsScreen ? (
                    <Box key={coffee.id}>
                      <Stack alignItems={'center'} sx={{ alignItems: 'stretch', gap: '20px', maxWidth: '640px', pt: '20px' }} direction={'row'} key={coffee.id} >
                        <Box component='div' sx={{ width: '30%', borderRadius: '11px', padding: '10px', backgroundColor: 'rgba(79, 64, 61, 0.75)', color: 'rgba(238, 231, 225, 0.77)' }}>
                          <Typography variant="h6" fontWeight={'bold'} display={'inline'}>TOTAL COFFEES TODAY </Typography>{coffeeSum === 1 ? `${coffeeSum} coffee` : `${coffeeSum} coffees`}
                        </Box>
                        <Stack direction={'row'} gap={'15px'} width={'70%'} alignItems={'center'}>
                          <Box component='div' sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'space-between' }}>
                            <Box component='div' sx={{ borderRadius: '11px', padding: '10px', backgroundColor: 'rgba(79, 64, 61, 0.75)', color: 'rgba(238, 231, 225, 0.77)' }}>
                              <Typography fontWeight={'bold'} display={'inline'}>TOTAL SINGLE COFFEES </Typography>{coffee.data.UNCaffe != undefined ? (coffee.data.UNCaffe === 1 ? `${coffee.data.UNCaffe} coffee` : `${coffee.data.UNCaffe} coffees`) : '0 coffees'}
                            </Box>
                            <Box component='div' sx={{ borderRadius: '11px', padding: '10px', backgroundColor: 'rgba(79, 64, 61, 0.75)', color: 'rgba(238, 231, 225, 0.77)' }}>
                              <Typography fontWeight={'bold'} display={'inline'}>TOTAL DOUBLE COFFEES </Typography>{coffee.data.DUECaffe != undefined ? (coffee.data.UNCaffe === 1 ? `${coffee.data.DUECaffe} coffee` : `${coffee.data.DUECaffe} coffees`) : '0 coffees'}
                            </Box>
                          </Box>
                          <Box component='div' sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Box component='div' sx={{ borderRadius: '11px', padding: '10px', bgcolor: '#b9ec86', color: '#4d8317' }}>
                              <Typography fontWeight={'bold'} display={'inline'}>IGNITIONS </Typography>{coffee.data.accensione != undefined ? (coffee.data.accensione === 1 ? `${coffee.data.accensione} time` : `${coffee.data.accensione} times`) : '0 times'}
                            </Box>
                            <Box component='div' sx={{ borderRadius: '11px', padding: '10px', bgcolor: '#e4160ca6', color: '#680703a6' }}>
                              <Typography fontWeight={'bold'} display={'inline'}>SHUTDOWNS  </Typography>{coffee.data.spegnimento != undefined ? (coffee.data.spegnimento === 1 ? `${coffee.data.spegnimento} time` : `${coffee.data.spegnimento} times`) : '0 times'}
                            </Box>
                          </Box>
                        </Stack>
                      </Stack>
                    </Box>
                  ) : (
                    <Box key={coffee.id}>
                      <Box component='div' key={coffee.id} sx={{ textAlign: 'center', pt: '10px' }}>
                        <Box component='div' sx={{ borderRadius: '11px', padding: '10px', backgroundColor: 'rgba(79, 64, 61, 0.75)', color: 'rgba(238, 231, 225, 0.77)' }}>
                          <Typography variant="h6" fontWeight={'bold'} display={'inline'}>TOTAL COFFEES TODAY </Typography>{coffeeSum === 1 ? `${coffeeSum} coffee` : `${coffeeSum} coffees`}
                        </Box>
                        <Stack direction={'row'} gap={'10px'} pt={'10px'} alignItems={'center'}>

                          <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'space-between' }}>
                            <Box component='div' sx={{ borderRadius: '11px', padding: '10px', backgroundColor: 'rgba(79, 64, 61, 0.75)', color: 'rgba(238, 231, 225, 0.77)' }}>
                              <Typography fontWeight={'bold'} display={'inline'}>TOTAL SINGLE COFFEES </Typography>{coffee.data.UNCaffe != undefined ? (coffee.data.UNCaffe === 1 ? `${coffee.data.UNCaffe} coffee` : `${coffee.data.UNCaffe} coffees`) : '0 coffees'}
                            </Box>
                            <Box component='div' sx={{ borderRadius: '11px', padding: '10px', backgroundColor: 'rgba(79, 64, 61, 0.75)', color: 'rgba(238, 231, 225, 0.77)' }}>
                              <Typography fontWeight={'bold'} display={'inline'}>TOTAL DOUBLE COFFEES </Typography>{coffee.data.DUECaffe != undefined ? (coffee.data.UNCaffe === 1 ? `${coffee.data.DUECaffe} coffee` : `${coffee.data.DUECaffe} coffees`) : '0 coffees'}
                            </Box>
                          </Box>
                          <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Box component='div' sx={{ borderRadius: '11px', padding: '10px', bgcolor: '#b9ec86', color: '#4d8317' }}>
                              <Typography fontWeight={'bold'} display={'inline'}>IGNITIONS </Typography>{coffee.data.accensione != undefined ? (coffee.data.accensione === 1 ? `${coffee.data.accensione} time` : `${coffee.data.accensione} times`) : '0 times'}
                            </Box>
                            <Box component='div' sx={{ borderRadius: '11px', padding: '10px', bgcolor: '#e4160ca6', color: '#680703a6' }}>
                              <Typography fontWeight={'bold'} display={'inline'}>SHUTDOWNS  </Typography>{coffee.data.spegnimento != undefined ? (coffee.data.spegnimento === 1 ? `${coffee.data.spegnimento} time` : `${coffee.data.spegnimento} times`) : '0 times'}
                            </Box>
                          </Box>
                        </Stack>
                      </Box>
                    </Box>
                  )))
              )}
            </Box>
            <ChartCoffee />
          </Box>
        </Stack>
      </Box>
      {message != '' ? <SnackbarGeneral openSnackbar={open} handleClose={() => handleClose()} message={message} /> : null}
    </Box>
  );
};

export default CoffeePage;