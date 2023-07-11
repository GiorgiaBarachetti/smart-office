import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/routes/path';
import { baseURL, urlEvents } from '../../utils/fetch/api';

export default function SimpleSnackbar() {
  const [open, setOpen] = React.useState(false);
  
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const navigate = useNavigate();
  const goToPage = () => {
    navigate(PATH.coffee);
    setOpen(false)
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={() => goToPage()}>
        COFFEE PAGE
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const [message, setMessage] = useState('')
  const [date] = useState(new Date())

  useEffect(() => {
    const source = new EventSource(`${baseURL}${urlEvents}`);

    source.onmessage = (event) => {
      if (event.data) {
        const json = JSON.parse(event.data);
        if (json.id === 1000 && json) {
          setOpen(true)
          if (json.count === -1) {
            setMessage(`${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} | Turned off the coffee machine `)
          } else if (json.count === 0) {
            setMessage(`${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} | Turned on the coffee machine`)
          } else if (json.count === 1) {
            setMessage(`${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} | Made one coffee`)
          } else if (json.count === 2) {
            setMessage(`${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} | Made two coffees`)
          }
        }
      }
    }

    source.onerror = () => {
      // add snackbre
      // console.log('Error finding Coffee events');
    };

    return () => {
      source.close();
    };
  }, []);

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={100000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}