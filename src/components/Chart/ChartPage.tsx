import React, { ChangeEvent, useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Box, Button, LinearProgress, Typography } from '@mui/material'
import { AreaSeries, EventTracker } from '@devexpress/dx-react-chart';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  Tooltip,
  ZoomAndPan,
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale} from '@devexpress/dx-react-chart';
//import { Tooltip } from 'devextreme-react';

interface Props {
  id?: number;
  watt?: number | undefined;
}

interface ChartData {
  time: string;
  watt: number;
}

const ChartPage = ({ id }: Props) => {
  //const [firstDate, setFirstDate] = useState(new Date());
  //const [secondDate, setSecondDate] = useState(new Date());
  const [lightsDatasArray, setLightsDatasArray] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
/*
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    if (!isNaN(selectedDate.getTime())) {
      setFirstDate(selectedDate);
    }
  };

  const handleDateChangeSecond = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    if (!isNaN(selectedDate.getTime())) {
      setSecondDate(selectedDate);
    }
  };*/

  const fetchLightsData = async () => {
    try {
      setIsLoading(true);
    //const response = await fetch(`http://192.168.1.6:3000/api/shelly/0/data?start=${firstDate.toISOString()}&end=${secondDate.toISOString()}`);
      const response = await fetch(`http://192.168.1.6:3000/api/shelly/0/data?start=2023/06/08&end=2023/06/09`);
      const data = await response.json();
      console.log(response, data);
      setLightsDatasArray(Array.isArray(data) ? data : [data]);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching lights data', error);
    }
  };
/*
  const resetDatas = () => {
    const currentDate = new Date();
    const today = currentDate.toISOString().substr(0, 10);
    const todayDate = new Date(today);
    if (!isNaN(todayDate.getTime())) {
      setSecondDate(todayDate);
    }
    const currentDate2 = new Date();
    const today2 = currentDate2.toISOString().substr(0, 10);
    const todayDate2 = new Date(today2);
    if (!isNaN(todayDate2.getTime())) {
      setSecondDate(todayDate2);
    }
  };

  const [eror, seterror] = useState('')
  const startFetch = () => {
    if(!lightsDatasArray.length){
      fetchLightsData()
    }else{
      resetDatas()
      seterror('no dats')
    }
  }
  <label>Select a start date:</label>
  <input type="date" value={firstDate.toISOString().substr(0, 10)} onChange={handleDateChange} />
  <label>Select an end date:</label>
  <input type="date" value={secondDate.toISOString().substr(0, 10)} onChange={handleDateChangeSecond} />
  <Button onClick={()=>startFetch()}>SEE CHART</Button>
  <Typography>{eror}</Typography>
  */

  useEffect(() => {
    fetchLightsData();
  }, []);


  

 return (
   <Box sx={{ padding: '20px' }}>
      <Paper>
        {isLoading ? (
          <LinearProgress/>
        ) : (
          <Chart data={lightsDatasArray}>
            <ValueScale name="watt" />
            <ArgumentAxis />
            <ValueAxis scaleName="watt" showGrid={false} showLine={true} showTicks={true} />
            <AreaSeries
              name="Total Transactions"
              valueField="watt"
              argumentField="time"
              scaleName="watt"
            />
            <EventTracker />
            <Tooltip/>
            <ZoomAndPan />
          </Chart>
        )}
      </Paper>
    </Box>
  );
};

export default ChartPage;
