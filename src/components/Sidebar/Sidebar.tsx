import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SIDEBAR, PATHDROPDOWNROOMS, PATH } from '../../utils/routes/path';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


const drawerWidth = '240px';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {

  const navigate = useNavigate()
  const handleClick = (path: string) => {
    if (path === '/rooms') {
      handleDropdownToggle(); // Open the dropdown menu
    } else {
      navigate(path);
    }
  }
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
    setSelectedMenuItem(selectedMenuItem === '/rooms' ? null : '/rooms');
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{backgroundColor:'#009ee3', overflow: 'hidden', position: 'fixed', top: 0 }} open={open}>
        <Toolbar>
          {/*HAMBURGER ICON */}
          <IconButton
            color="default"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {/*inserisci NOME PAGINA APERTA */}

          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <Box component='nav'>
          <List sx={{paddingTop:'0'}}>
            {SIDEBAR?.filter((elem) =>
              elem.href !== PATH.main &&
              elem.href !== PATHDROPDOWNROOMS.andreaOffice &&
              elem.href !== PATHDROPDOWNROOMS.meetingRoom &&
              elem.href !== PATHDROPDOWNROOMS.flavioOffice &&
              elem.href !== PATHDROPDOWNROOMS.laboratory &&
              elem.href !== PATHDROPDOWNROOMS.kitchen &&
              elem.href !== PATHDROPDOWNROOMS.breaktimeSpace &&
              elem.href !== PATHDROPDOWNROOMS.entrance &&
              elem.href !== PATHDROPDOWNROOMS.openSpace
            )
              .map((elem) => {
                if (elem.href === '/rooms') {
                  return (
                    <List key={elem.href} sx={{paddingTop:'0', paddingBottom:'0'}}>
                      <ListItem disablePadding onClick={handleDropdownToggle}>
                        <ListItemButton>
                          <ListItemText sx={{paddingLeft:'10px'}}>ROOMS</ListItemText>
                          {dropdownOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                      </ListItem>
                      <List
                        component="div"
                        disablePadding
                        style={{ display: dropdownOpen ? 'block' : 'none' }}
                      >
                        {Object.entries(PATHDROPDOWNROOMS).map(([roomName, roomPath]) => (
                          <ListItem
                            key={roomPath}
                            onClick={() => handleClick(roomPath)}
                            disablePadding
                            sx={{ pl: 4 }}
                            selected={selectedMenuItem === roomPath}
                          >
                            <ListItemButton>
                              <ListItemText>{SIDEBAR.find((elem) => elem.href === roomPath)?.name}</ListItemText>
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>

                    </List>
                  );
                } else {
                  return (
                    <ListItem
                      key={elem.href}
                      onClick={() => handleClick(elem.href)}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemText>{elem.name}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  );
                }
              })}
          </List>
        </Box>

        <Divider />

        <Box component='nav'>
          <List>
            {SIDEBAR?.filter((elem) =>
              elem.href == '/'
            )
              .map((elem) => (

                <ListItem
                  key={elem.href}
                  onClick={() => handleClick(elem.href)}
                  disablePadding>
                  <ListItemButton>
                    <ListItemText>RETURN TO {elem.name} PAGE</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
          </List>


        </Box>
      </Drawer>
    </Box>
  );
}