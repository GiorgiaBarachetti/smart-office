import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../utils/routes/path';

export default function SimpleSnackbar() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

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
      <Button color="secondary" size="small" onClick={()=>goToPage()}>
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

  useEffect(() => {
    const source = new EventSource('http://192.168.1.6:3000/events');

    source.onmessage = (event) => {
        if (event.data) {
            const json = JSON.parse(event.data);

            if (json.id === 1000 && json) {
                setOpen(true)
                const coffeeMessage = json.id
                if(json.count === -1){
                  setMessage('Turning off the coffee machine')
                } else  if(coffeeMessage.count === 0){
                  setMessage('Ignition of the coffee machine')
                } else  if(coffeeMessage.count === 1){
                  setMessage('Making one coffee...')
                } else  if(coffeeMessage.count === 2){
                  setMessage('Making two coffees...')
                }
            } 
        }
    }

    source.onerror = () => {
        console.log('Error finding Coffee events');
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