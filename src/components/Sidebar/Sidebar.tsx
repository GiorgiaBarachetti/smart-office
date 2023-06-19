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
import ListItemText from '@mui/material/ListItemText';
import { SIDEBAR, PATHDROPDOWNROOMS, PATH, SIDEBARROOMS } from '../../utils/routes/path';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ClickAwayListener, LinearProgress } from '@mui/material';
import Timer from '../Timer/Timer';
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


const PersistentDrawerLeft = (props: { location?: any }) => {

  const navigate = useNavigate()
  const location = useLocation();
  const [pageName, setPageName] = useState('')
  const [isOpenLights, setIsOpenLights] = useState(false)

  //constrollo che il path inizi con /lights
  function isLightsPage(path: string): boolean {
    return path.startsWith('/lights');
  }
  const handleClick = (path: string, name: string) => {
    if (isLightsPage(path)) {
      console.log(path)
      setIsOpenLights(true)
      navigate(path);
    } else {
      setIsOpenLights(false)
      console.log('no im not')
      setPageName(name)
      navigate(path);
      //}
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

  const now = new Date();
  const handleClickAway = () => {
    setOpen(false);
  };

  useEffect(() => {
    //get path name
    console.log(location)
    handleClick(location.pathname, SIDEBAR.find((o: { name: string, href: string }) => o.href === location.pathname)?.name || "")
  }, []);


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
                      </List> : ""}</>
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