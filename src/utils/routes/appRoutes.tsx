import React from 'react'
import Box from '@mui/material/Box';
import { ListItemProps } from '@mui/material/ListItem';
import {  Route,  Routes,  BrowserRouter} from "react-router-dom";
import { useState } from 'react'
import MainPage from '../../pages/Main/MainPage';
import Layout from '../../pages/Layout/Layout';
import LightsPage from '../../pages/Layout/Lights/LightsPage';
import { PATH, PATHDROPDOWNROOMS } from '../routes/path'
import AndreaOffice from '../../pages/Layout/Lights/Rooms/AndreaOffice';
import MeetingRoom from '../../pages/Layout/Lights/Rooms/MeetingRoom';
import FlavioOffice from '../../pages/Layout/Lights/Rooms/FlavioOffice';
import Laboratory from '../../pages/Layout/Lights/Rooms/Laboratory';
import Kitchen from '../../pages/Layout/Lights/Rooms/Kitchen';
import BreaktimeSpace from '../../pages/Layout/Lights/Rooms/BreaktimeSpace';
import Entrance from '../../pages/Layout/Lights/Rooms/Entrance';
import OpenSpace from '../../pages/Layout/Lights/Rooms/OpenSpace';
import Coffee from '../../pages/Layout/Coffe/CoffeePage';
import Printer from '../../pages/Layout/Printer/PrinterPage';
import Energy from '../../pages/Layout/Energy/EnergyPage';
import Niveus from '../../pages/Layout/Niveus/Niveus';

interface ListItemLinkProps extends ListItemProps {
  to: string;
  open?: boolean;
}
const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Box component="div" sx={{ display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path={PATH.main} element={<MainPage />} />
          <Route element={<Layout />} >
            <Route path={PATH.lightsPage} element={<LightsPage />} />
            <Route path={PATHDROPDOWNROOMS.andreaOffice} element={<AndreaOffice />} />
            <Route path={PATHDROPDOWNROOMS.meetingRoom} element={<MeetingRoom />} />
            <Route path={PATHDROPDOWNROOMS.flavioOffice} element={<FlavioOffice />} />
            <Route path={PATHDROPDOWNROOMS.laboratory} element={<Laboratory />} />
            <Route path={PATHDROPDOWNROOMS.kitchen} element={<Kitchen />} />
            <Route path={PATHDROPDOWNROOMS.breaktimeSpace} element={<BreaktimeSpace />} />
            <Route path={PATHDROPDOWNROOMS.entrance} element={<Entrance />} />
            <Route path={PATHDROPDOWNROOMS.openSpace} element={<OpenSpace />} />
            <Route path={PATH.coffee} element={<Coffee />} />
            <Route path={PATH.niveus} element={<Niveus />} />
            <Route path={PATH.printer} element={<Printer />} />
            <Route path={PATH.energy} element={<Energy />} />
          </Route>
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default AppRoutes
