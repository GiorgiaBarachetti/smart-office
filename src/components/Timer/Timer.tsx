import { Box, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'

const Timer = () => {

const [date, setDate] = useState(new Date())

useEffect (()=> {

    const timer = setInterval(()=>setDate(new Date()), 100)
    return function cleanup(){
        clearInterval(timer)
    }
}
)

  return (
    <Box component='div' sx={{position:'absolute', right: '10px', textAlign:'end'}}>
              <Typography>{date.toLocaleDateString()}</Typography>
              <Typography>{date.getHours()}:{date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}</Typography>
    </Box>
  )
}

export default Timer
