import { Box, Typography, useMediaQuery, LinearProgress, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Coffee } from '../../../utils/interfaces/Interfaces';
import { baseURL, urlCoffee } from '../../../utils/fetch/api';
import { CONSUMESSTYLE, SHADOWSTYLE, TYTLESTYLE } from '../../../utils/const/Const';
import Stack from '@mui/material/Stack';
import background from './../../../img/coffee-5447420_1280.jpg'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateRange, DateTimeField, MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import ChartCoffee from '../../../components/Chart/ChartCoffee';

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
const CoffeePage = () => {
  const isXsScreen = useMediaQuery('(min-width:910px)');

  const defaultValue: [Dayjs | null, Dayjs | null] = [dayjs(new Date().setHours(0)), dayjs(new Date())];
  const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>(defaultValue);

  const handleDateChange = (newDates: [Dayjs | null, Dayjs | null]) => {
    console.log(newDates)
    setSelectedDates(newDates);
  };

  const [loading, setLoading] = useState<boolean>(false)

  const [coffeeData, setCoffeeData] = useState<Coffee[]>([]);

  const fetchCoffee = async () => {
    try {
      setLoading(true)
      const startDate = selectedDates[0]?.toISOString()
      const endDate = selectedDates[1]?.toISOString()
      console.log(startDate, endDate)
      const response = await fetch(`${baseURL}${urlCoffee}/data/count?start=${startDate}&end=${endDate}`);
      const data = await response?.json();
      //Array.isArray(data) ? data : [data] senno dice che coffeeDatas non è una function
      setCoffeeData(Array.isArray(data) ? data : [data]);
      console.log(response, data)
      setLoading(false)
    } catch (error) {
      console.log('Error fetching coffee:', error);
    }
  };

  const coffeeSum = coffeeData.reduce((sum, c) => {
    const singleCoffee = c.data.UNCaffe || 0;
    const doubleCoffee = c.data.DUECaffe || 0;
    return sum + singleCoffee + doubleCoffee * 2;
  }, 0);

  const handleFetch = () => {
    setLoading(true)
    fetchCoffee();
  };

  useEffect(() => {
    setLoading(true)

    fetchCoffee()
  }, [selectedDates]

  )

  return (
    <Box style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', minHeight: '92.3vh' }}>
      <Box component='div' py={'30px'} mx={'auto'} >
        {/**DESKTOP */}
        <Stack direction='column' gap={'10px'} sx={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center', alignItems: 'stretch' }} >
          <Box component="div" style={{ backgroundColor: '#d3d3d382', borderRadius: '6px', }}>
            <Typography variant="h6" sx={{ ...TYTLESTYLE, color: 'white', pt: '20px' }}>COFFEE COUNT</Typography>
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
              {/*
              <Button onClick={handleFetch}>CHECK THE USAGE</Button>
  */}
              {loading ? (<LinearProgress />) : (
                coffeeData.map((coffee) => (
                  isXsScreen ? (
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
                        <Box component='div' sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '10px'/*, justifyContent: 'space-between' */ }}>
                          <Box component='div' sx={{ borderRadius: '11px', padding: '10px', bgcolor: '#b9ec86', color: '#4d8317' }}>
                            <Typography fontWeight={'bold'} display={'inline'}>IGNITIONS </Typography>{coffee.data.accensione != undefined ? (coffee.data.accensione === 1 ? `${coffee.data.accensione} time` : `${coffee.data.accensione} times`) : '0 times'}
                          </Box>
                          <Box component='div' sx={{ borderRadius: '11px', padding: '10px', bgcolor: '#e4160ca6', color: '#680703a6' }}>
                            <Typography fontWeight={'bold'} display={'inline'}>SHUTDOWNS  </Typography>{coffee.data.spegnimento != undefined ? (coffee.data.spegnimento === 1 ? `${coffee.data.spegnimento} time` : `${coffee.data.spegnimento} times`) : '0 times'}
                          </Box>
                        </Box>
                      </Stack>
                    </Stack>
                  ) : (
                    <Box component='div' key={coffee.id} sx={{ textAlign: 'center', pt: '10px' }}>
                      <Box component='div' sx={{borderRadius: '11px', padding: '10px', backgroundColor: 'rgba(79, 64, 61, 0.75)', color: 'rgba(238, 231, 225, 0.77)' }}>
                        <Typography variant="h6" fontWeight={'bold'} display={'inline'}>TOTAL COFFEES TODAY </Typography>{coffeeSum === 1 ? `${coffeeSum} coffee` : `${coffeeSum} coffees`}
                      </Box>
                      <Stack direction={'row'} gap={'10px'} pt={'10px'} alignItems={'center'}>

                      <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'space-between'}}>
                        <Box component='div' sx={{ borderRadius: '11px', padding: '10px', backgroundColor: 'rgba(79, 64, 61, 0.75)', color: 'rgba(238, 231, 225, 0.77)' }}>
                          <Typography fontWeight={'bold'} display={'inline'}>TOTAL SINGLE COFFEES </Typography>{coffee.data.UNCaffe != undefined ? (coffee.data.UNCaffe === 1 ? `${coffee.data.UNCaffe} coffee` : `${coffee.data.UNCaffe} coffees`) : '0 coffees'}
                        </Box>
                        <Box component='div' sx={{ borderRadius: '11px', padding: '10px', backgroundColor: 'rgba(79, 64, 61, 0.75)', color: 'rgba(238, 231, 225, 0.77)' }}>
                          <Typography fontWeight={'bold'} display={'inline'}>TOTAL DOUBLE COFFEES </Typography>{coffee.data.DUECaffe != undefined ? (coffee.data.UNCaffe === 1 ? `${coffee.data.DUECaffe} coffee` : `${coffee.data.DUECaffe} coffees`) : '0 coffees'}
                        </Box>
                      </Box>
                      <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: '10px'/*, justifyContent: 'space-between' */ }}>
                        <Box component='div' sx={{ borderRadius: '11px', padding: '10px', bgcolor: '#b9ec86', color: '#4d8317' }}>
                          <Typography fontWeight={'bold'} display={'inline'}>IGNITIONS </Typography>{coffee.data.accensione != undefined ? (coffee.data.accensione === 1 ? `${coffee.data.accensione} time` : `${coffee.data.accensione} times`) : '0 times'}
                        </Box>
                        <Box component='div' sx={{ borderRadius: '11px', padding: '10px', bgcolor: '#e4160ca6', color: '#680703a6' }}>
                          <Typography fontWeight={'bold'} display={'inline'}>SHUTDOWNS  </Typography>{coffee.data.spegnimento != undefined ? (coffee.data.spegnimento === 1 ? `${coffee.data.spegnimento} time` : `${coffee.data.spegnimento} times`) : '0 times'}
                        </Box>
                      </Box>
                      </Stack>
                    </Box>
                  )))
              )}
            </Box>
            <ChartCoffee />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default CoffeePage;