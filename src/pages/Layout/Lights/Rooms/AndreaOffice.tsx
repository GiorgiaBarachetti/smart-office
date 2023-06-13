import React from 'react'
import { Box } from '@mui/material';
import TableRooms from '../../../../components/Tables/TableRooms';
import background from '../../../../img/stanzePages/andrea.jpg'
import { SHADOWSTYLE } from '../../../../utils/const/Const';
import ChartPage2 from '../../../../components/Chart/ChartPage';

const AndreaOffice = () => {
  const id = 0;

  return (
    <div style={{backgroundImage: `url(${background})`,  backgroundRepeat: 'no-repeat', backgroundSize: 'cover', marginTop:'-27px'}} >
      <Box paddingTop={'30px'} paddingBottom={'10px'}>
        <Box component='div' display={'flex'} flexDirection={'column'} justifyContent={'center'} sx={{ padding: '10px', borderRadius: '6px', bgcolor: 'rgba(211, 211, 211,0.4)', mx: 'auto', my: '30px', width: '90%', heigth: '40%' }} style={SHADOWSTYLE}>
          <TableRooms idRoom={id} />
          <ChartPage2 />
        </Box>
      </Box>
    </div>
  )
}

export default AndreaOffice
