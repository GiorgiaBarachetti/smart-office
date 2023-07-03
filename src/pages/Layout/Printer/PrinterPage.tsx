import React, { useState, useEffect } from 'react';
import TablePrinter from '../../../components/Tables/TablePrinter';
import { Printer, PrinterStatus } from '../../../utils/interfaces/Interfaces';
import { Box, Button, ButtonGroup, Typography, LinearProgress } from '@mui/material';
import { baseURL, urlTplink } from '../../../utils/fetch/api'
import { CONTAINERBOX, SHADOWSTYLE } from '../../../utils/const/Const';
import background from '../../../img/stampante.avif'

const PrinterPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const [isLoadingButtonOff, setIsLoadingButtonOff] = useState(false)

  const [printerDatas, setPrinterDatas] = useState<Printer[]>([]);
  const [statoPresa, setStatoPresa] = useState<boolean>(false);

  const fetchPrinter = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${baseURL}${urlTplink}/data`);
      const data = await response?.json();
      setPrinterDatas(Array.isArray(data) ? data : [data]);
      setIsLoading(false)
    } catch (error) {
    }
  };

  const switchOnPrinter = async () => {
    try {
      setIsLoadingButton(true)
      await fetch(`${baseURL}${urlTplink}/on`, { method: 'POST' });
      setStatoPresa(true);
      setIsLoadingButton(false)
    } catch (error) {
      console.log('Error switching on the printer:', error);
    }
  };

  const switchOffPrinter = async () => {
    try {
      setIsLoadingButtonOff(true)
      await fetch(`${baseURL}${urlTplink}/off`, { method: 'POST' });
      setStatoPresa(false);
      setIsLoadingButtonOff(false)
    } catch (error) {
      console.log('Error switching off the printer:', error);
    }
  };

  const fetchPrinterStatus = async () => {
    try {
      const response = await fetch(`${baseURL}${urlTplink}/status`);
      const data: PrinterStatus = await response.json();
      const isPrinterOn = data.stato_presa;
      setStatoPresa(isPrinterOn);
    } catch (error) {
      console.log('Error fetching printer Status:', error);
    }
  };

  useEffect(() => {
    const timeoutStato = setTimeout(()=>fetchPrinterStatus(), 1000)
    const timeoutDati = setTimeout(()=>fetchPrinter(),1000)
    return () => {
      clearTimeout(timeoutStato)
      clearTimeout(timeoutDati)
    }
  }, [statoPresa]);

  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', minHeight: '93vh' }} >
      <Box component='div' paddingTop={'30px'}  >
      <Box component='div' sx={{...CONTAINERBOX}}>
          <Box component='div' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap:'10px', p: '20px', borderRadius: '6px', bgcolor: 'white', mx: 'auto', my: '30px', width: { xs: '80%', sm: '40%', md: '30%' }, textAlign:'center',  border: statoPresa ? '2px solid green' : '2px solid red',...SHADOWSTYLE}}>
            <Typography variant='h6' >SWITCH THE PRINTER STATUS</Typography>
            <ButtonGroup>
              <Button sx={{cursor:'pointer'}} onClick={() => switchOnPrinter()} disabled={statoPresa}>ON</Button>
              {isLoadingButton && (
                  <LinearProgress/>
                )}
              <Button sx={{cursor:'pointer'}} onClick={() => switchOffPrinter()} disabled={!statoPresa}>OFF</Button>
            </ButtonGroup>
          </Box>
          <Box component='div' mt={'50px'} >
            <Typography variant='h6' sx={{ mt: '20px', textAlign: 'center', color:'white' }}>CONSUMPTIONS</Typography>
            <TablePrinter loading={isLoading} printer={printerDatas} />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default PrinterPage;
