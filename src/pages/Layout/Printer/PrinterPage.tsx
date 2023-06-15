import React, { useState, useEffect } from 'react';
import TablePrinter from '../../../components/Tables/TablePrinter';
import { Printer, PrinterStatus } from '../../../utils/interfaces/Interfaces';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { baseURL, urlShelly, urlCoffee, urlAlhpa, urlTplink } from '../../../utils/fetch/api'
import { BOXSTYLE, SHADOWSTYLE } from '../../../utils/const/Const';
import background from '../../../img/stampante.avif'

const PrinterPage = () => {
  const [printerDatas, setPrinterDatas] = useState<Printer[]>([]);
  const [statoPresa, setStatoPresa] = useState<boolean>(false);

  const fetchPrinter = async () => {
    try {
      const response = await fetch(`${baseURL}${urlTplink}/data`);
      const data = await response?.json();
      setPrinterDatas(Array.isArray(data) ? data : [data]);
      console.log(data);
    } catch (error) {
      console.log('not found datas of printer');
    }
  };

  const switchOnPrinter = async () => {
    try {
      await fetch(`${baseURL}${urlTplink}/on`, { method: 'POST' });
      setStatoPresa(true);
    } catch (error) {
      console.log('Error switching on the printer:', error);
    }
  };

  const switchOffPrinter = async () => {
    try {
      await fetch(`${baseURL}${urlTplink}/off`, { method: 'POST' });
      setStatoPresa(false);
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
      console.log(isPrinterOn);
    } catch (error) {
      console.log('Error fetching printer Status:', error);
    }
  };

  useEffect(() => {
    fetchPrinterStatus();
    fetchPrinter();
  }, []);

  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', marginTop: '-27px' }} >
      <Box paddingTop={'30px'} paddingBottom={'230px'} >
      <Box component='div' sx={{ padding: '10px', borderRadius: '6px', bgcolor: 'rgba(211, 211, 211,0.4)', mx: 'auto', my: '30px', width: {xs: '90%',sm: '90%', md: '70%'}, heigth: '40%' }} style={SHADOWSTYLE}>

          <Box component='div'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: '20px',
              borderRadius: '6px',
              bgcolor: 'white',
              mx: 'auto',
              my: '30px',
              width: { xs: '80%', sm: '40%', md: '30%' },
              textAlign:'center',
              ...SHADOWSTYLE
            }}
          >
            <Typography variant='h6' >SWITCH THE PRINTER STATUS</Typography>
            <ButtonGroup>
              <Button sx={{cursor:'pointer'}} onClick={() => switchOnPrinter()} disabled={statoPresa}>ON</Button>
              <Button sx={{cursor:'pointer'}} onClick={() => switchOffPrinter()} disabled={!statoPresa}>OFF</Button>
            </ButtonGroup>
          </Box>

          <Box component='div' mt={'50px'} >
            <Typography variant='h6' sx={{ mt: '20px', textAlign: 'center' }}>CONSUMES</Typography>
            <TablePrinter printer={printerDatas} />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default PrinterPage;
