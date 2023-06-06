import React, { useState, useEffect } from 'react';
import TablePrinter from '../../../components/Tables/TablePrinter/TablePrinter';
import { Printer, PrinterStatus } from '../../../utils/interfaces/Interfaces';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';

const PrinterPage = () => {
  const [printerStatus, setPrinterStatus] = useState<Printer[]>([]);
  const [statoPresa, setStatoPresa] = useState<boolean>(false);

  const fetchPrinter = async () => {
    try {
      const response = await fetch('http://192.168.1.6:3000/api/tplink/data');
      const data = await response?.json();
      setPrinterStatus(Array.isArray(data) ? data : [data]);
      console.log(data);
    } catch (error) {
      console.log('not found datas');
    }
  };

  const switchOnPrinter = async () => {
    try {
      await fetch('http://192.168.1.6:3000/api/tplink/on', { method: 'POST' });
      setStatoPresa(true);
    } catch (error) {
      console.log('Error switching on the printer:', error);
    }
  };

  const switchOffPrinter = async () => {
    try {
      await fetch('http://192.168.1.6:3000/api/tplink/off', { method: 'POST' });
      setStatoPresa(false);
    } catch (error) {
      console.log('Error switching off the printer:', error);
    }
  };

  const fetchPrinterStatus = async () => {
    try {
      const response = await fetch('http://192.168.1.6:3000/api/tplink/status');
      const data: PrinterStatus = await response.json();
      const isPrinterOn = data.stato_presa;
      setStatoPresa(isPrinterOn);
      console.log(isPrinterOn);
    } catch (error) {
      console.log('Error fetching printer status:', error);
    }
  };

  useEffect(() => {
    fetchPrinterStatus();
    fetchPrinter();
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: '20px',
          borderRadius: '6px',
          bgcolor: 'lightgrey',
          mx: 'auto',
          my: '30px',
          width: '80%',
        }}
      >
        <Typography>SWITCH THE PRINTER STATUS</Typography>
        <ButtonGroup>
          <Button onClick={() => switchOnPrinter()} disabled={statoPresa}>ON</Button>
          <Button onClick={() => switchOffPrinter()} disabled={!statoPresa}>OFF</Button>
        </ButtonGroup>
      </Box>

      <Box>
        <TablePrinter printer={printerStatus} />
      </Box>
    </div>
  );
};

export default PrinterPage;
