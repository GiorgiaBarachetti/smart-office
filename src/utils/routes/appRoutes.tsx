import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Link, { LinkProps } from '@mui/material/Link';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import { useState } from 'react'
import MainPage from '../../pages/Main/MainPage';
import Layout from '../../pages/Layout/Layout';
import LightsPage from '../../pages/Layout/Lights/LightsPage';
import { PATH } from '../routes/path'
import AndreaOffice from '../../pages/Layout/Lights/Rooms/AndreaOffice';
import MeetingRoom from '../../pages/Layout/Lights/Rooms/MeetingRoom';
import FlavioOffice from '../../pages/Layout/Lights/Rooms/FlavioOffice';
import Laboratory from '../../pages/Layout/Lights/Rooms/Laboratory';
import Kitchen from '../../pages/Layout/Lights/Rooms/Kitchen';
import BreaktimeSpace from '../../pages/Layout/Lights/Rooms/BreaktimeSpace';
import Entrance from '../../pages/Layout/Lights/Rooms/Entrance';
import OpenSpace from '../../pages/Layout/Lights/Rooms/OpenSpace';
import Coffe from '../../pages/Layout/Coffe/Coffe';
import Coffee from '../../pages/Layout/Coffe/Coffe';
import Printer from '../../pages/Layout/Printer/PrinterPage';
import Energy from '../../pages/Layout/Energy/EnergyPage';

interface ListItemLinkProps extends ListItemProps {
  to: string;
  open?: boolean;
}
/*
const breadcrumbNameMap: { [key: string]: string } = {
  '/': 'MainPage',
  '/lights': 'Lights',
  '/lights/ufficioAndrea': "Andrea's office",
  '/lights/meetingRoom': "Meeting room",
  '/lights/ufficioFlavio': "Flavio's office",
  '/lights/laboratory': "Laboratory",
  '/lights/kitchen': "Kitchen",
  '/lights/breaktimeSpace': "Breaktime space",
  '/lights/entrance': "Entrance",
  '/lights/openSpace': "Open space",
  '/coffee': 'Coffee',
  '/printer': 'Printer',
  '/energy': 'Energy',
};
function ListItemLink(props: ListItemLinkProps) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];
  
  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }
  
  return (
    <li>
    <ListItem button component={RouterLink as any} to={to} {...other}>
    <ListItemText primary={primary} />
    {icon}
    </ListItem>
    </li>
    );
  }
  
  interface LinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
  }
  function LinkRouter(props: LinkRouterProps) {
    return <Link {...props} component={RouterLink as any} />;
  }
  
  function Page() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    
   
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter underline="hover" color="inherit" to="/">
        Home
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
}
 */
const AppRoutes = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <BrowserRouter>
      <Box component="div" sx={{ display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path={PATH.main} element={<MainPage />} />
          <Route element={<Layout />} >
            <Route path={PATH.lightsPage} element={<LightsPage />} />
            <Route path={PATH.andreaOffice} element={<AndreaOffice />} />
            <Route path={PATH.meetingRoom} element={<MeetingRoom />} />
            <Route path={PATH.flavioOffice} element={<FlavioOffice />} />
            <Route path={PATH.laboratory} element={<Laboratory />} />
            <Route path={PATH.kitchen} element={<Kitchen />} />
            <Route path={PATH.breaktimeSpace} element={<BreaktimeSpace />} />
            <Route path={PATH.entrance} element={<Entrance />} />
            <Route path={PATH.openSpace} element={<OpenSpace />} />
            <Route path={PATH.coffee} element={<Coffee />} />
            <Route path={PATH.printer} element={<Printer />} />
            <Route path={PATH.energy} element={<Energy />} />
          </Route>
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default AppRoutes
