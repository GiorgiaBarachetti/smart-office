import { styled, useTheme } from '@mui/material/styles';
import {Box, Drawer, CssBaseline, Toolbar, Typography, List, Divider, IconButton, ListItem, ListItemButton, ListItemText, ClickAwayListener, LinearProgress } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SIDEBAR, PATH, SIDEBARROOMS } from '../../utils/routes/path';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Timer from '../Timer/Timer';

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


const PersistentDrawerLeft = (props: { location?: any }) => {

  const navigate = useNavigate()
  const location = useLocation();
  const [pageName, setPageName] = useState('')

  //constrollo che il path inizi con /lights
  function isLightsPage(path: string): boolean {
    return path.startsWith('/lights');
  }
  const handleClick = (path: string, name: string) => {
    if (isLightsPage(path)) {
      navigate(path);
    } else {
      setPageName(name)
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
  
  const now = new Date();
  const handleClickAway = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Get the sidebar item and sidebar dropdown item
    const sidebarItem = SIDEBAR.find((o) => o.href === location.pathname);
    const sidebarDropdownItem = SIDEBARROOMS.find((o) => o.href === location.pathname);
  
    // Set the page name and dropdown item name accordingly
    if (sidebarItem) {
      setPageName(sidebarItem.name);
    } else if (sidebarDropdownItem) {
      
        setPageName(sidebarDropdownItem.name);
      
    }
  }, [location.pathname]);



  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAway}>

      <Box component='div' >
        <CssBaseline />
        <AppBar sx={{ backgroundColor: '#009ee3', overflow: 'hidden', position: 'fixed', top: 0 }} open={open}>
          <Toolbar>
            {/*HAMBURGER ICON */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>

            <Box component='div' display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant="h6" noWrap component="div">{pageName}</Typography>
              <Timer />
            </Box>

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
            <List sx={{ py: '0' }}>
              {SIDEBAR?.filter((elem) =>
                elem.href !== PATH.main
              )
                .map((elem) => {
                  return (<>
                    <ListItem
                      key={elem.href}
                      onClick={() => handleClick(elem.href, elem.name)}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemText>{elem.name}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                    {elem.href === PATH.lightsPage && isLightsPage(location.pathname) ?
                      <List component="div">
                        {SIDEBARROOMS?.map((elem) => (
                          <ListItem
                            key={elem.href}
                            onClick={() => handleClick(elem.href, elem.name)}
                            sx={{ padding: '0px', margin: '0px' }}

                          >
                            <ListItemButton  sx={{py:'0px' }}>
                              <ListItemText sx={{ fontSize: '5px', pl: '15px', py:'0' }}>{elem.name}</ListItemText>
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List> : null}</>
                  )
                })}
            </List>

          </Box>


          <Divider />

          <Box component='nav'>
            <List sx={{ py: '0' }}>
              {SIDEBAR?.filter((elem) =>
                elem.href == '/'
              )
                .map((elem) => (

                  <ListItem
                    key={elem.href}
                    onClick={() => handleClick(elem.href, elem.name)}
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
    </ClickAwayListener>
  );
}

export default PersistentDrawerLeft