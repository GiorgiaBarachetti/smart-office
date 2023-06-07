import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Box from '@mui/material/Box/Box';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Sidebar />
      <Box component='div' sx={{mt:'60px'}}>
        {/* allows the routes to render their element content out */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
