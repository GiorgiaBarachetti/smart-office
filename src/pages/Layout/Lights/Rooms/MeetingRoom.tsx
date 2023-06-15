import React from 'react'
import { Box, Stack, useMediaQuery } from '@mui/material';
import TableRooms from '../../../../components/Tables/TableRooms';
import background from '../../../../img/stanzePages/meeting.jpg'
import { SHADOWSTYLE } from '../../../../utils/const/Const';
import ChartPage from '../../../../components/Chart/ChartPage';
import SwitchComponent from '../../../../components/Switch/Switch';


const MeetingRoom = () => {
  const id = 1;
  const isXsScreen = useMediaQuery('(min-width:770px)');
  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', marginTop: '-27px' }} >
      <Box component='div' paddingTop={'30px'} paddingBottom={'10px'}>
        <Box component='div' display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ padding: '10px', borderRadius: '6px', bgcolor: 'rgba(211, 211, 211,0.4)', mx: 'auto', my: '30px', width: '90%', heigth: '40%', ...SHADOWSTYLE }}>

          {isXsScreen ? (
            <Stack direction="row" spacing={2} alignItems={'center'} padding={'20px'} >
              <TableRooms idRoom={id} />
              <SwitchComponent id={id} />
            </Stack>
          ) : (
            <Stack direction="column" spacing={2} alignItems={'center'} justifyContent={'center'} px={'100px'}>
              <SwitchComponent id={id} />
              <TableRooms idRoom={id} />
            </Stack>
          )
          }
          <ChartPage id={id} />
        </Box>
      </Box>
    </div>
  )
}

export default MeetingRoom
