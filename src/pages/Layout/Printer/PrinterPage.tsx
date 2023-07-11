import React, { useState, useEffect } from 'react';
import TablePrinter from '../../../components/Tables/TablePrinter';
import { Printer, PrinterStatus } from '../../../utils/interfaces/Interfaces';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { baseURL, urlEvents, urlTplink } from '../../../utils/fetch/api'
import { CONTAINERBOX, SHADOWSTYLE } from '../../../utils/const/Const';
import background from '../../../img/stampante.avif'
import SnackbarGeneral from '../../../components/Snackbar/SnackbarGeneral';

const PrinterPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [printerDatas, setPrinterDatas] = useState<Printer[]>([]);
  const [statoPresa, setStatoPresa] = useState<boolean>(false);
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    setOpen(false);
    setMessage('')
  };

  const fetchPrinter = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${baseURL}${urlTplink}/data`);
      const data = await response?.json();
      setPrinterDatas(Array.isArray(data) ? data : [data]);
      setIsLoading(false)
    } catch (error) {
      setOpen(true)
      setMessage(`Error fetching lights`);
    }
  };

  const switchOnPrinter = async () => {
    try {
      const response = await fetch(`${baseURL}${urlTplink}/on`, { method: 'POST' });
      setStatoPresa(true);
      if(!response.ok){
        throw new Error
    }
    } catch (error) {
      setOpen(true)
      setMessage(`Error switching on the printer`);
    }
  };

  const switchOffPrinter = async () => {
    try {
      const response = await fetch(`${baseURL}${urlTplink}/off`, { method: 'POST' });
      setStatoPresa(false);
      if(!response.ok){
        throw new Error
    }
    } catch (error) {
      setOpen(true)
      setMessage(`Error switching off the printer`);
    }
  };

  const fetchPrinterStatus = async () => {
    try {
      const response = await fetch(`${baseURL}${urlTplink}/status`);
      const data: PrinterStatus = await response.json();
      const isPrinterOn = data.stato_presa;
      setStatoPresa(isPrinterOn);
    } catch (error) {
      setOpen(true)
      setMessage(`Error fetching printer Status`);
    }
  };

  useEffect(() => {
    fetchPrinterStatus()
    fetchPrinter()
  }, []);

  useEffect(() => {
    const source = new EventSource(`${baseURL}${urlEvents}`);

    source.onmessage = (event) => {
      if (event.data) {
        const json: Printer = JSON.parse(event.data)
        if (json?.tplinkStampante?.id === 300 && json.tplinkStampante) {
          const newData: Printer = {
            ...json
          };
          setPrinterDatas(Array.isArray(newData) ? newData : [newData]);
        }
      }
    };

    source.onerror = () => {
      setOpen(true)
      setMessage(`Error finding printer events`);
    }

    return () => {
      source.close();
    };
  }, []);

  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', minHeight: '94vh' }} >
      <Box component='div' paddingTop={'30px'}  >
      <Box component='div' sx={{...CONTAINERBOX}}>
          <Box component='div' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap:'10px', p: '20px', borderRadius: '6px', bgcolor: 'white', mx: 'auto', my: '30px', width: { xs: '80%', sm: '40%', md: '30%' }, textAlign:'center',  border: statoPresa ? '2px solid green' : '2px solid red',...SHADOWSTYLE}}>
            <Typography variant='h6' >SWITCH THE PRINTER STATUS</Typography>
            <ButtonGroup>
              <Button sx={{cursor:'pointer'}} onClick={() => switchOnPrinter()} disabled={statoPresa}>ON</Button>
              <Button sx={{cursor:'pointer'}} onClick={() => switchOffPrinter()} disabled={!statoPresa}>OFF</Button>
            </ButtonGroup>
          </Box>
          <Box component='div' mt={'50px'} >
            <Typography variant='h6' sx={{ mt: '20px', textAlign: 'center', color:'white' }}>CONSUMPTIONS</Typography>
            <TablePrinter loading={isLoading} printer={printerDatas} />
          </Box>
        </Box>
      </Box>
      {message != '' ? <SnackbarGeneral openSnackbar={open} handleClose={() => handleClose()} message={message} /> : null}
    </div>
  );
};

export default PrinterPage;
