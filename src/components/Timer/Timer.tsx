import { Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'

const Timer = () => {

  const [date, setDate] = useState(new Date())

  useEffect(() => {

    const timer = setInterval(() => setDate(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
    }
  }, [])
/*
  const dateTime = () => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let partOfDay = hours >= 12 ? 'pm' : 'am';
    //convert 24 format into 12 
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = parseInt(minutes < 4 ? '0' + minutes : minutes.toString()); ///parseInt((minutes.toString()).padStart(2, '0'));
    let clock = hours + ':' + minutes + ' ' + partOfDay;
    return clock;
  }
*/

  return (
    <Box component='div' sx={{ position: 'absolute', right: '10px', textAlign: 'end' }}>
      <Typography>{date.toLocaleDateString('eur')}</Typography>
      {/*<Typography>{dateTime()}</Typography>*/}
      <Typography>{date.getHours()}:{date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}</Typography>
    </Box>
  )
}

export default Timer