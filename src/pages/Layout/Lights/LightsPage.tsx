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
import { baseURL, urlEvents, urlShelly } from '../../../utils/fetch/api';
import { ROOMPHOTOS, SHADOWSTYLE } from '../../../utils/const/Const';
import { useNavigate } from 'react-router-dom';
import { SIDEBARROOMS } from '../../../utils/routes/path';
import SnackbarGeneral from '../../../components/Snackbar/SnackbarGeneral';

const LightsPage = () => {
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setMessage('')
  };

  const [isLoading, setIsLoading] = useState<number | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const [lightsDatasArray, setLightsDatasArray] = useState<Lights[]>([]);
  const [updatedLights, setUpdatedLights] = useState<Lights>();

  const fetchLights = async (/*key: number | null*/) => {
    try {
      const response = await fetch(`${baseURL}${urlShelly}/all/status`);
      const data = await response?.json();
      setLightsDatasArray(data.data);
    } catch (error) {
      setOpen(true)
      setMessage(`Error fetching lights`);
    }
  };


  // switch off all the lights
  const switchOffAllLightDatas = async () => {
    try {
      const response = await fetch(`${baseURL}${urlShelly}/all/off`, { method: 'POST' });
      if (!response.ok) {
        throw new Error()
      }
    } catch (error) {
      setOpen(true)
      setMessage(`Error switching all the lights off`);
    }
  };


  const switchOnLightById = async (key: number) => {
    try {
      const light = lightsDatasArray.find((light) => light?.state?.id === key);
      if (light && light.state.output === false) {
        const response = await fetch(`${baseURL}${urlShelly}/${key}/on`, { method: 'POST' });
        if (!response.ok) {
          throw new Error()
        }
      }
    } catch (error) {
      setOpen(true)
      setMessage(`Error switching on the lights of the room`);
    }
  };

  const switchOffLightById = async (key: number) => {
    try {
      const light = lightsDatasArray.find((light) => light?.state.id === key);
      if (light && light.state.output === true) {
        const response = await fetch(`${baseURL}${urlShelly}/${key}/off`, { method: 'POST' });
        if (!response.ok) {
          throw new Error()
        }
      }
    } catch (error) {
      setOpen(true)
      setMessage(`Error switching off the light of the room`);
    }
  };

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

  useEffect(() => {
    setIsLoadingPage(true);
    setTimeout(() => fetchLights(), 1000);
    setIsLoadingPage(false);
  }, []);



  useEffect(() => {
    const id = updatedLights?.state?.id
    const output = updatedLights?.state?.output
    const power = updatedLights?.state?.apower

    if (id != undefined && output != undefined && power != undefined) {
      const current_output = lightsDatasArray[id]?.state?.output
      const current_power = lightsDatasArray[id]?.state?.apower


      if (current_output != output && current_power != power && lightsDatasArray != undefined && updatedLights != undefined) {
        const updatedArray = lightsDatasArray.map((c, i) => {
          if (i === id) {
            return updatedLights;
          } else {
            return c;
          }
        });
        setLightsDatasArray(updatedArray);
      } else {
      }
    }
  }, [updatedLights]);

  useEffect(() => {
    const source = new EventSource(`${baseURL}${urlEvents}`);
    source.onmessage = (event) => {
      if (event.data) {
        const json = JSON.parse(event.data);
        const id = json?.state?.id
        if (id != undefined && id >= 0 && id <= 7) {
          setUpdatedLights(json)
        }
      }
    };

    source.onerror = () => {
      setOpen(true)
      setMessage(`Error finding Lights events`);
    };


  }, [])

  return (
    <>
        <Box
          component="div"
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: '20px', borderRadius: '6px', bgcolor: '#d3d3d382', mx: 'auto', my: '30px', width: '90%', ...SHADOWSTYLE }}>
          <Typography variant="h6" sx={{ variant: 'h1', textAlign: 'center' }}>ROOMS</Typography>

          <Button onClick={() => switchOffAllLightDatas()} sx={{ cursor: 'pointer', width: '300px', mx: 'auto' }}>SWITCH OFF ALL THE LIGHTS</Button>
          {isLoadingPage ? (<LinearProgress />) : (

            <Box component="div" sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', p: '19px', gap: '32px' }}>
              {lightsDatasArray != undefined && lightsDatasArray?.filter(
                (light) => light?.room !== '----' && light?.room !== 'Punto luce non attivo'
              ).map((light) =>
              (
                <Card key={light.state.id} sx={{ display: 'flex', flexDirection: 'column', width: '201px', border: light?.state?.output ? '2px solid green' : '2px solid red', ...SHADOWSTYLE }}>

                  <CardActionArea>
                    {light?.state?.output === false ? (
                      getRoomOFFPhotoById(light?.state?.id) ? (
                        <CardMedia
                          component="img"
                          height="140"
                          image={getRoomOFFPhotoById(light?.state?.id)}
                          sx={{ padding: '0' }}
                          onClick={() => goToPage(light?.state?.id)}
                        />
                      ) : null
                    ) : (
                      getRoomONPhotoById(light?.state?.id) ? (
                        <CardMedia
                          component="img"
                          height="140"
                          image={getRoomONPhotoById(light?.state?.id)}
                          sx={{ padding: '0' }}
                          onClick={() => goToPage(light?.state?.id)}
                        />
                      ) : null
                    )}
                    <CardContent sx={{ p: '20px', mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Typography sx={{ textAlign: 'center', pb: '10px' }}>{light?.room}</Typography>
                      {/*{isLoading !== null && isLoading === light.state.id ? (<LinearProgress />) : (*/}
                      <ButtonGroup sx={{ position: 'relative', alignSelf: 'center' }}>
                        <Button sx={{ cursor: 'pointer' }} onClick={() => switchOnLightById(light?.state?.id)} disabled={light?.state?.output === true || isLoading !== null}>ON</Button>
                        <Button sx={{ cursor: 'pointer' }} onClick={() => switchOffLightById(light?.state?.id)} disabled={light?.state?.output === false || isLoading !== null}>OFF</Button>
                      </ButtonGroup>
                      {/*)}*/}
                      <Typography sx={{ textAlign: 'center', pt: '10px', fontSize: '13px' }} variant="body2">{light?.state?.output === true ? `Power used: ${light?.state?.apower}Watt` : ''}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          )}
        </Box>

        <Box component="div" sx={{ display: 'flex', flexDirection: 'column', gap: '10px', bgcolor: '#d3d3d382', padding: '10px', borderRadius: '6px', mx: 'auto', my: '30px', width: '90%', ...SHADOWSTYLE }}>
          <Typography variant="h6" sx={{ mt: '10px', variant: 'h1', textAlign: 'center' }}>CONSUMES</Typography>
          <TableLights loading={isLoadingPage} lightsDatasArray={lightsDatasArray} />
        </Box>
      {message != '' ? <SnackbarGeneral openSnackbar={open} handleClose={() => handleClose()} message={message} /> : null}
    </>
  );
};

export default LightsPage;
