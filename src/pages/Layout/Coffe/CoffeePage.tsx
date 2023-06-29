import { Box, Typography, useMediaQuery, LinearProgress } from '@mui/material';
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
  const defaultValue: [Dayjs | null, Dayjs | null] = [dayjs(null), dayjs(null)];
  const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>(defaultValue);

  const handleDateChange = (newDates: [Dayjs | null, Dayjs | null]) => {
    console.log(newDates)
    setSelectedDates(newDates);
  };

  const [loading, setLoading] = useState<boolean>(false)

  const [coffeeData, setCoffeeData] = useState<Coffee[]>([]);
  const isXsScreen = useMediaQuery('(min-width:900px)');

  const fetchCoffee = async () => {
    try {
      setLoading(true)

      const startDate = selectedDates[0]?.toISOString()
      const endDate = selectedDates[1]?.toISOString()
      console.log(startDate, endDate)

      /*
      switch (range) {
        case 'today':
          const currentDate = new Date();
          let startDate = '';
          let endDate = currentDate;
          startDate = currentDate.toISOString().split('T')[0];
          break;
        case 'yesterday':
          const yesterday = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
          startDate = yesterday.toISOString().split('T')[0];
          break;
        case 'lastWeek':
          const lastWeekStart = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
          startDate = lastWeekStart.toISOString().split('T')[0];
          break;
        case 'lastMonth':
          const lastMonthStart = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
          startDate = lastMonthStart.toISOString().split('T')[0];
          break;
        default:
          break;
      }*/
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

  useEffect(() => {
    fetchCoffee()

  }, [selectedDates]);

  const coffeeSum = coffeeData.reduce((sum, c) => {
    const singleCoffee = c.data.UNCaffe || 0;
    const doubleCoffee = c.data.DUECaffe || 0;
  
    return sum + singleCoffee + doubleCoffee * 2;
  }, 0);

  return (

    <Box style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', minHeight: '92.3vh' }}>
      <Box component='div' paddingTop={'30px'} mx={'auto'} >
        {/**DESKTOP */}
        <Stack direction='column' gap={'10px'} width={'90%'} marginLeft={'auto'} marginRight={'auto'} justifyContent={'center'}>
          <Box component="div" style={{ backgroundColor: '#d3d3d382', borderRadius: '6px' }}>
            <Typography variant="h5" sx={{ ...TYTLESTYLE, color: 'white', py: '20px' }}>COFFEE COUNT</Typography>

            <Box component="div" sx={{ bgcolor: 'white', padding: '30px', mx: 'auto', width: '75%', borderRadius: '11px' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem
                  label="Choose a date time range"
                  component="MultiInputDateTimeRangeField"
                >
                  <MultiInputDateTimeRangeField
                    value={selectedDates}
                    onChange={(event)=>handleDateChange(event)}
                    defaultValue={[dayjs('2022-04-17T15:30'), dayjs('2022-04-21T18:30')]}
                  />
                </DemoItem>
              </LocalizationProvider>
              {coffeeData.map((coffee, index) => (
                <Box key={index} sx={{ textAlign:'center', padding:'10px', mt:'10px' }}>
                  <Box>
                   
                    <Typography variant="h6">TOTAL COFFEES TODAY  {coffeeSum}</Typography>
                  
                    <Typography>TOTAL SINGLE COFFEES  {coffee.data.UNCaffe != undefined ? `${coffee.data.UNCaffe}`:''}</Typography>
                
                    <Typography>TOTAL DOUBLE COFFEES  {coffee.data.DUECaffe != undefined ? `${coffee.data.DUECaffe}`:''}</Typography>

                    <Typography>IGNITION  {coffee.data.accensione != undefined ? `${coffee.data.accensione}`:'undef'}</Typography>
                    <Typography>SHUTDOWN  {coffee.data.spegnimento!= undefined ? `${coffee.data.spegnimento}`:'undef'}</Typography>
                  </Box>
                </Box>
              ))}

            </Box>
            <ChartCoffee />
          </Box>
        </Stack>
      </Box >
    </Box >
  )
}
export default CoffeePage;
