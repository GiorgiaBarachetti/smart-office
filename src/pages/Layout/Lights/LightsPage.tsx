import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  CardActionArea,
  CardContent,
  Card,
  CardMedia,
  LinearProgress,
  Typography
} from '@mui/material';
import TableLights from '../../../components/Tables/TableLights';
import { Lights } from '../../../utils/interfaces/Interfaces';
import { baseURL, urlShelly } from '../../../utils/fetch/api';
import { ROOMPHOTOS, SHADOWSTYLE } from '../../../utils/const/Const';
import CircleIcon from '@mui/icons-material/Circle';
import { useNavigate } from 'react-router-dom';
import { SIDEBARROOMS } from '../../../utils/routes/path';

const LightsPage = () => {
  const [isLoading, setIsLoading] = useState<number | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const [lightsDatasArray, setLightsDatasArray] = useState<Lights[]>([]);

  const fetchLights = async (key: number | null) => {
    try {
      if (key === null) {
        setIsLoadingPage(true);
        const response = await fetch(`${baseURL}${urlShelly}/all/status`);
        const data = await response?.json();
        setLightsDatasArray(data.data);
        setIsLoadingPage(false);
      } else {
        const response = await fetch(`${baseURL}${urlShelly}/${key}/status`);
        const data = await response?.json();

        const updatedLightsDatasArray = lightsDatasArray.map(light => {
          if (light?.state.id === key) {
            const updatedArray = {
              //if the old lightdataarry.property s different from the new one from the object data sostituiscila
              ...({ output: data.state.output }),
              ...({ apower: data.state.apower })
            };
            //se le key (output and apower) dei nuovi valori esistono stampale  senno stampa array di prima 
            if (Object.keys(updatedArray).length > 0) {
              return {
                ...light,
                state: {
                  ...light.state,
                  ...updatedArray
                }
              };
            }
          }
          return light;
        });

        setLightsDatasArray(updatedLightsDatasArray);
        setIsLoading(null);
        setKeyForFetch(key)
      }
    } catch (error) {
      console.log('error fetching lights', error);
    }
  };


  // switch off all the lights
  const switchAllOffLightDatas = async () => {
    try {
      await fetch(`${baseURL}${urlShelly}/all/off`, { method: 'POST' });
    } catch (error) {
      console.log('Error switching all the lights off:', error);
    }
  };

  const [keyForFetch, setKeyForFetch] = useState<number | null>(null);

  const switchOnLightById = async (key: number) => {
    try {
      const light = lightsDatasArray.find((light) => light?.state.id === key);
      if (light) {
        if (light.state.output === false) {
          await fetch(`${baseURL}${urlShelly}/${key}/on`, { method: 'POST' });
          setIsLoading(key);
          setTimeout(() => fetchLights(key), 1000);
        }
      }
    } catch (error) {
      console.log('Error switching the light of the room:', error);
    }
  };

  const switchOffLightById = async (key: number) => {
    try {
      const light = lightsDatasArray.find((light) => light?.state.id === key);
      if (light) {
        if (light.state.output === true) {
          await fetch(`${baseURL}${urlShelly}/${key}/off`, { method: 'POST' });
          setIsLoading(key);
          setTimeout( () => fetchLights(key), 1000);
        }
      }
    } catch (error) {
      console.log('Error switching the light of the room:', error);
    }
  };

  useEffect(() => {
    fetchLights(null);
  }, []);

  const sortedLightsDatasArray = lightsDatasArray !== undefined ? lightsDatasArray.sort((a, b) => a.state.id - b.state.id) : [];

  const getRoomOFFPhotoById = (id: number) => {
    const roomPhoto = ROOMPHOTOS.find((photo) => photo.id === id);
    if (roomPhoto) {
      return roomPhoto.src?.off;
    }
    // return default image
    return undefined;
  };

  const getRoomONPhotoById = (id: number) => {
    const roomPhoto = ROOMPHOTOS.find((photo) => photo.id === id);
    if (roomPhoto) {
      return roomPhoto.src?.on;
    }
    // return default image
    return undefined;
  };

  const navigate = useNavigate();
  const goToPage = (key: number) => {
    navigate(SIDEBARROOMS[key].href);
  };

  return (
    <>
      <Box
        component="div"
        sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', p: '20px', borderRadius: '6px', bgcolor: '#d3d3d382', mx: 'auto', my: '30px', width: '90%',
          ...SHADOWSTYLE
        }}>
        <Typography variant="h6" sx={{ variant: 'h1', textAlign: 'center' }}>ROOMS</Typography>

        <Button onClick={() => switchAllOffLightDatas()} sx={{ cursor: 'pointer', width: '300px', mx: 'auto' }}>SWITCH OFF ALL THE LIGHTS</Button>
        {isLoadingPage ? (<LinearProgress />) : (

          <Box component="div" sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', p: '19px', gap: '32px' }}>
            {sortedLightsDatasArray?.filter(
              (light) => light.room !== '----' && light.room !== 'Punto luce non attivo'
            ).map((light) =>
            (
              <Card key={light.state.id} sx={{ display: 'flex', flexDirection: 'column', width: '201px' }}>
                <CardActionArea>
                  {light.state.output === false ? (
                    getRoomOFFPhotoById(light.state.id) ? (
                      <CardMedia
                        component="img"
                        height="140"
                        image={getRoomOFFPhotoById(light.state.id)}
                        sx={{ padding: '0' }}
                        onClick={() => goToPage(light.state.id)}
                      />
                    ) : null
                  ) : (
                    getRoomONPhotoById(light.state.id) ? (
                      <CardMedia
                        component="img"
                        height="140"
                        image={getRoomONPhotoById(light.state.id)}
                        sx={{ padding: '0' }}
                        onClick={() => goToPage(light.state.id)}
                      />
                    ) : null
                  )}
                  <CircleIcon
                    style={{ color: light.state.output ? 'green' : 'red', position: 'absolute', right: '7px', top: '7px', fontSize: '20px' }}
                  />
                  <CardContent sx={{ p: '20px', mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography sx={{ textAlign: 'center', pb: '10px' }}>{light.room}</Typography>
                    {isLoading !== null && isLoading === light.state.id ? (<LinearProgress />) : (
                      <ButtonGroup sx={{ position: 'relative', alignSelf: 'center' }}>
                        <Button sx={{ cursor: 'pointer' }} onClick={() => switchOnLightById(light.state.id)} disabled={light.state.output === true || isLoading !== null}>
                          ON
                        </Button>
                        <Button sx={{ cursor: 'pointer' }} onClick={() => switchOffLightById(light.state.id)} disabled={light.state.output === false || isLoading !== null}>
                          OFF
                        </Button>
                      </ButtonGroup>
                    )}
                    <Typography sx={{ textAlign: 'center', pt: '10px', fontSize: '13px' }} variant="body2">{light.state.output === true ? `Power used: ${light.state.apower}Watt` : ''}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      <Box component="div" sx={{ display: 'flex', flexDirection: 'column', gap: '10px', bgcolor: '#d3d3d382', padding: '10px', borderRadius: '6px', mx: 'auto', my: '30px', width: '90%', ...SHADOWSTYLE }}>
        <Typography variant="h6" sx={{ mt: '10px', variant: 'h1', textAlign: 'center' }}>
          CONSUMES
        </Typography>
        <TableLights loading={isLoadingPage} lightsDatasArray={lightsDatasArray} />
      </Box>
    </>
  );
};

export default LightsPage;
