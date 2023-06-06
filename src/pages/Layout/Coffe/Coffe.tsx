import { Box, ImageList, ImageListItem, Typography } from '@mui/material';
import React from 'react';
import coffee from '../../../img/Immagine_2023-06-05_090757-removebg-preview.png'
import doubleCoffe from '../../../img/Immagine_2023-06-01_175307-removebg-preview.png';
import background from '../../../img/CoffeeBeans.jpg';


const Coffee = () => {
/*
  const 
  const fetchCoffee = async (number: number) => {
    try{
      const response = await fetch(`http://192.168.1.6:3000/api/coffee/${number}`)
      const data = await response?.json()
      
    } catch (error) {
      console.log('Error fetching coffee:', error);
    }
  }
  */
  return (
    <Box sx={{ backgroundImage: `url(${background})`, height: '100%', p:'40px', pb:'350px',px: 'auto', py:'auto', backgroundPosition: 'center',backgroundRepeat: 'no-repeat',  backgroundSize: 'cover'}}>

    <Typography sx={{bgcolor: 'rgba(167,156,156,0.63)', bgsize:'auto',fontWeight:'bold', textAlign:'center', width: '300px', mx:'auto', mt:'60px', mb: '40px'}}>SELECT THE QUANTITY OF COFFEE</Typography>
    <Box sx={{display:'flex', flexDirection:'row', gap:'150px', justifyContent:'center'}}>
      <Box
        component="img"
        sx={{
          maxHeight: { xs: 120, md: 189 },
          pt: {xs: '10px', md: '20px'}
        }}
        src={coffee}
        />

        <Box
        component="img"
        sx={{
          maxHeight: { xs: 140, md: 220 },
        }}
        
        src={doubleCoffe}
        />
        </Box>
        </Box>
  )
}

export default Coffee
