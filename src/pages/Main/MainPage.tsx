import React from 'react';

import './style.css'
import { useState, useEffect } from 'react'

import SvgIcon from '@mui/material/SvgIcon';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PrintIcon from '@mui/icons-material/Print';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import BoltIcon from '@mui/icons-material/Bolt';
import planimetry from '../../img/Immagine 2023-05-31 093913.jpg';

//import Switch from '@material-ui/core/Switch';
//import { useN01SwitchStyles } from '@mui-treasury/styles/switch/n01';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch/Switch';
import { Energy, Lights, Printer } from '../../utils/interfaces/Interfaces';
import ModalLights from '../../components/Modals/ModalLights';
import { Coffee } from '../../utils/interfaces/Interfaces';
import ModalPrinter from '../../components/Modals/ModalPrinter';
import ModalCoffee from '../../components/Modals/ModalCoffee';
import ModalEnergy from '../../components/Modals/ModalEnergy';

const lightStyle = {
  //color:"#ffea00",
  stroke: "#9d9d15",
  color: "#ffef3c66",
  //stroke:"#FFFF07"
}
const coffeeStyle = {
  color: "#424242",
  stroke: "#212121"
}
const printerStyle = {
  color: "#424242",
  stroke: "#212121"
}


const MainPage = () => {
  const [boltStyle, setBoltStyle] = useState({
    color: "#3cff427a",
    stroke: "#068b15"
  })

  const [openModalLight, setOpenModalLight] = useState(false)
  const [idRoomModal, setIdRoomModal] = useState<number | undefined>();
  
  const openModalLights = (id: number) => {
    console.log(id)
    if (id !== undefined) {
      setIdRoomModal(id);
    }
    setOpenModalLight(true);
  };
  const closeModalLight = () => {
    setOpenModalLight(false)
  }
  
  const [openModalCoffee, setOpenModalCoffee] = useState(false)
  const [idCoffeeModal, setIdCoffeeModal] = useState<number | undefined>();

  const openCoffeeModal = (id: number) => {
    console.log(id)
    if (id !== undefined) {
      setIdCoffeeModal(id);
    }
    setOpenModalCoffee(true);
  };
  const closeCoffeeModal = () => {
    setOpenModalCoffee(false)
  }

  
  const [openModalEnergy, setOpenModalEnergy] = useState(false)
  const [idEnergyModal, setIdEnergyModal] = useState<number | undefined>();

  const openEnergyModal = (id: number) => {
    console.log(id)
    if (id !== undefined) {
      setIdEnergyModal(id);
    }
    setOpenModalEnergy(true);
  };
  const closeEnergyModal = () => {
    setOpenModalEnergy(false)
  }

 

  const [openModalPrinter, setOpenModalPrinter] = useState(false)
  const [idPrinterModal, setIdPrinterModal] = useState<number | undefined>();

  const openPrinterModal = (id: number) => {
    console.log(id)
    if (id !== undefined) {
      setIdPrinterModal(id);
    }
    setOpenModalPrinter(true);
  };
  const closePrinterModal = () => {
    setOpenModalPrinter(false)
  }
 



  const [lightsStatusArray, setLightsStatusArray] = useState<Lights[]>([]);
  
  const fetchLights = async () => {
    try {
      const response = await fetch("http://192.168.1.6:3000/api/shelly/relays/all/status");
      const data = await response?.json();
      setLightsStatusArray(data);
      console.log(data);
    } catch (error) {
      console.log('error fetching lights', error);
    }
  };

  const [coffeeStatus, setCoffeeStatus] = useState<Coffee[]>([]);

  const fetchCoffee = async () => {
    try {
      const response = await fetch("http://192.168.1.6:3000/api/coffee/data");
      const data = await response?.json();
      //Array.isArray(data) ? data : [data] senno dice che coffeestatus non è una function
      setCoffeeStatus(Array.isArray(data) ? data : [data]);
      console.log(data);
    } catch (error) {
      console.log('Error fetching coffee:', error);
    }
  };

  const [energyStatus, setEnergyStatus] = useState<Energy[]>([]);

  const fetchEnergy = async () => {
    try {
      const response = await fetch("http://192.168.1.6:3000/api/alpha/data");
      const data = await response?.json();
      //Array.isArray(data) ? data : [data] senno dice che coffeestatus non è una function
      setEnergyStatus(Array.isArray(data) ? data : [data]);
      console.log(data);
    } catch (error) {
      console.log('Error fetching coffee:', error);
    }
  };

  const [printerStatus, setPrinterStatus] = useState<Printer[]>([]);

  const fetchPrinter = async () => {
    try {
      const response = await fetch("http://192.168.1.6:3000/api/alpha/data");
      const data = await response?.json();
      //Array.isArray(data) ? data : [data] senno dice che printerStatus non è una function
      setPrinterStatus(Array.isArray(data) ? data : [data]);
      console.log(data);
    } catch (error) {
      console.log('Error fetching coffee:', error);
    }
  };

  useEffect(() => {
    fetchLights();
    fetchCoffee();
    fetchEnergy();
    fetchPrinter();
  }, []);


  const changeStyleBolt = () => {
    //if the powerused of the first element of energy array is >= 690 
    if (energyStatus[0]?.powerUsed >= 690) {
      console.log(energyStatus[0]?.powerUsed);
      return {
        ...boltStyle,
        color: "green"
      };
    } else if (energyStatus[0]?.powerUsed >= 1308) {
      return {
        ...boltStyle,
        color: "black"
      };
    }
    return boltStyle;
  };


  useEffect(() => {
    const updatedBoltStyle = changeStyleBolt();
    setBoltStyle(updatedBoltStyle);
  }, [energyStatus]);



  const getCoordinates = (roomId: number) => {
    let x = 0;
    let y = 0;

    switch (roomId) {
      case 0: // UFFICIO ANDREA
        x = 1000;
        y = -245;
        break;
      case 1: // SALA RIUNIONI
        x = 810;
        y = -245;
        break;
      case 2: // UFFICIO FLAVIO
        x = 565;
        y = -245;
        break;

      // LABORATORIO
      case 3:
        x = 370;
        y = -245;
        break;

      // CUCINA-RIPOSTIGLIO
      case 4:
        x = 185;
        y = -245;
        break;

      // BREAKTIME SPACE
      case 6:
        x = 280;
        y = -50;
        break;

      // INGRESSO
      case 5:
        x = 585;
        y = -50;
        break;

      // OPEN SPACE
      case 7:
        x = 850;
        y = -50;
        break;

      default:
        break;
    }
    return { x, y };
  };


  /*
            {/*UFFICIO ANDREA = 0}
            <g style={lightStyle}>
                <SvgIcon component={LightbulbIcon} x="1000" y="-245" width='90px'
                    //()=>openModal se scrivo cosi non mi apre il modal
                    onClick={openModal} ></SvgIcon>
                <Box>
                    <Typography>power: </Typography>
                </Box>
            </g>

            {/*SALA RIUNIONI = 1}
            <g style={lightStyle}>
                <SvgIcon component={LightbulbIcon} x="810" y="-245" width='90px' 
                onClick={openModal} ></SvgIcon>
            </g>

            {/*UFFICIO FLAVIO = 2}
            <g style={lightStyle}>
                <SvgIcon component={LightbulbIcon} x="565" y="-245" width='90px' 
                onClick={openModal} ></SvgIcon>
            </g>

            {/*LABORATORIO = 3}
            <g style={lightStyle}>
                <SvgIcon component={LightbulbIcon} x="370" y="-245" width='90px' 
                onClick={openModal} ></SvgIcon>
            </g>

            {/*CUCINA-RIPOSTIGLIO = 4}
            <g style={lightStyle}>
                <SvgIcon component={LightbulbIcon} x="185" y="-245" width='90px' 
                onClick={openModal} ></SvgIcon>
            </g>

            {/*BREAKTIME SPACE = 6}
            <g style={lightStyle}>
                <SvgIcon component={LightbulbIcon} x="280" y="-50" width='90px' 
                onClick={openModal} ></SvgIcon>
            </g>
            <g style={coffeeStyle}>
                <SvgIcon component={CoffeeMakerIcon} x="300" y="60" width='80px' 
                onClick={openModal} ></SvgIcon>
            </g>

            {/*INGRESSO = 5}
            <g style={lightStyle}>
                <SvgIcon component={LightbulbIcon} x="585" y="-50" width='90px' 
                onClick={openModal} ></SvgIcon>
            </g>
            <g style={boltStyle}>
                <SvgIcon component={BoltIcon} x="600" y="100" width='90px' 
                onClick={openModal} ></SvgIcon>
            </g>

            {/*OPEN SPACE = 7}
            <g style={lightStyle}>
                <SvgIcon component={LightbulbIcon} x="850" y="-50" width='90px' 
                onClick={openModal} ></SvgIcon>
            </g>
            <g style={printerStyle}>
                <SvgIcon component={PrintIcon} x="980" y="110" width='90px' 
                onClick={openModal} ></SvgIcon>
            </g>


             {printer.map((p) => {
                    const { x, y } = getCoordinates(p.state.id);
                    return (
                    <g key={light.room} style={printerStyle}>
                        <SvgIcon component={LightbulbIcon} x='980' y='110' width="80px" onClick={() => openModal(light.state.id)} />
                    </g>
                    );
                })}
  */

  return (
    <div>
      <svg className="svgMain" viewBox="0 0 1280 720" preserveAspectRatio="xMinYMin meet" style={{}} >
        <image href={planimetry} width={'100%'}></image>

        {lightsStatusArray.length ? (
          lightsStatusArray.filter((light) => light.state.id !== 8 && light.state.id !== 9)
            .map((light) => {
              const { x, y } = getCoordinates(light.state.id);
              return (
                <g key={light.state.id} style={lightStyle}>
                  <SvgIcon component={LightbulbIcon} x={x} y={y} width="80px"
                    onClick={() => openModalLights(light.state.id)} />
                </g>
              );
            })
        ) : (
          'lightsStatusArray is empty'
        )}

        {coffeeStatus.length ? (
          coffeeStatus.map((coffee) => (
            <g key={coffee.id} style={coffeeStyle}>
              <SvgIcon component={CoffeeMakerIcon} x='300' y='60' width="80px" onClick={() => openCoffeeModal(coffee.id)} />
            </g>
          ))
        ) : (
          'CoffeeStatus array is empty'
        )}

        {energyStatus.length ? (
          energyStatus.map((energy) => (
            <g key={energy.id} style={boltStyle}>
              <SvgIcon component={BoltIcon} x='610' y='100' width="80px" onClick={() => openEnergyModal(energy.id)} style={boltStyle} />
            </g>
          ))
        ) : (
          'energyStatus is empty'
        )
        }

        {printerStatus.length ? (
        printerStatus.map((printer) => (
          <g key={printer.id} style={printerStyle}>
            <SvgIcon component={PrintIcon} x='990' y='110' width="80px" onClick={() => openPrinterModal(printer.id)}/>
          </g>
        ))
        ):(
          'printerStatus is empty'
        )}


      </svg>

      <ModalLights open={openModalLight} idRoomModal={idRoomModal} handleClose={closeModalLight} lights={lightsStatusArray} />
      <ModalCoffee open={openModalCoffee} handleClose={closeCoffeeModal} idCoffee={idCoffeeModal}></ModalCoffee>
      <ModalEnergy open={openModalEnergy} handleClose={closeEnergyModal} idEnergy={idEnergyModal}></ModalEnergy>
      <ModalPrinter open={openModalPrinter} handleClose={closePrinterModal} printer={printerStatus}></ModalPrinter>

    </div>
  )
}

export default MainPage
