import React from 'react';

import { useState, useEffect } from 'react'

import SvgIcon from '@mui/material/SvgIcon';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PrintIcon from '@mui/icons-material/Print';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import BoltIcon from '@mui/icons-material/Bolt';
import planimetry from '../../img/Immagine 2023-05-31 093913.jpg';

import { Energy, Lights, Printer } from '../../utils/interfaces/Interfaces';
import ModalLights from '../../components/Modals/ModalLights';
import { Coffee } from '../../utils/interfaces/Interfaces';
import ModalPrinter from '../../components/Modals/ModalPrinter';
import ModalCoffee from '../../components/Modals/ModalCoffee';
import ModalEnergy from '../../components/Modals/ModalEnergy';
import { baseURL, urlShelly, urlCoffee, urlAlhpa, urlTplink } from '../../utils/fetch/api';
import CircularProgress from '@mui/material/CircularProgress';


const lightStyle = {
  stroke: "#9d9d15",
  color: "#ffef3c66",
  //color:"#ffea00",
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
  const [isLoading, setIsLoading] = useState(true);

  const [openModalLight, setOpenModalLight] = useState(false)
  const [idRoomModal, setIdRoomModal] = useState<number | undefined>();

  const openModalLights = (id: number) => {
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
    if (id !== undefined) {
      setIdPrinterModal(id);
    }
    setOpenModalPrinter(true);
  };
  const closePrinterModal = () => {
    setOpenModalPrinter(false)
  }




  const [lightsDatasArray, setLightsDatasArray] = useState<Lights[]>([]);
  const fetchLights = async () => {
    try {
      
      setIsLoading(true);
      const response = await fetch(`${baseURL}${urlShelly}/all/Datas`);
      const data = await response?.json();
      setLightsDatasArray(data);
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.log('error fetching lights', error);
    }
  };


  const [coffeeDatas, setCoffeeDatas] = useState<Coffee[]>([]);
  const fetchCoffee = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseURL}${urlCoffee}/data`);
      const data = await response?.json();
      //Array.isArray(data) ? data : [data] senno dice che coffeeDatas non è una function
      setCoffeeDatas(Array.isArray(data) ? data : [data]);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching coffee:', error);
    }
  };

  const [energyDatas, setEnergyDatas] = useState<Energy[]>([]);
  const fetchEnergy = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseURL}${urlAlhpa}`);
      const data = await response?.json();
      //Array.isArray(data) ? data : [data] senno dice che coffeeDatas non è una function
      setEnergyDatas(Array.isArray(data) ? data : [data]);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching coffee:', error);
    }
  };

  const [printerDatas, setPrinterDatas] = useState<Printer[]>([]);

  const fetchPrinter = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseURL}${urlTplink}/data`);
      const data = await response?.json();
      //Array.isArray(data) ? data : [data] senno dice che printerDatas non è una function
      setPrinterDatas(Array.isArray(data) ? data : [data]);
      console.log(data);
      setIsLoading(false);
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

  const [boltStyle, setBoltStyle] = useState({
    color: "rgba(113,200, 46)",
    //stroke: "rgba(25, 104, 34,1)"
  })
  const changeStyleBolt = () => {
    //if the powerused of the first element of energy array is >= 690 
    if (energyDatas[0]?.powerUsed >= 1308) {
      console.log(energyDatas[0]?.powerUsed);
      return {
        ...boltStyle,
        color: "rgba(202,232,76)",
        stroke: "rgba(41,146,53,1)"
      };
    } else if (energyDatas[0]?.powerUsed >= 2070) {
      return {
        ...boltStyle,
        color: "rgba(244,245,27)",
        stroke:"rgba(136,135,46,1)"
      };
    } else if (energyDatas[0]?.powerUsed >= 2760) {
      return {
        ...boltStyle,
        color: "rgba(226,172,26)",
        stroke: "rgba(175,106,5,1)"
      };
    } else if (energyDatas[0]?.powerUsed >= 3450) {
      return {
        ...boltStyle,
        color: "rgba(224,60,60)",
        stroke: "rgba(106,20,20,1)"
      };
    }
    return boltStyle;
  };


  useEffect(() => {
    const updatedBoltStyle = changeStyleBolt();
    setBoltStyle(updatedBoltStyle);
  }, [energyDatas]);



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


  return (
    <div>
      {/*MOSTRA Il loader se è true  */}
      {isLoading ? (
      <CircularProgress /> 
    ) : (
      <svg viewBox="0 0 1280 720" preserveAspectRatio="xMinYMin meet" /*style={{ paddingLeft: { sm: '80px', md: '150px' } }} */>
        <image href={planimetry} width={'100%'}></image>

        {lightsDatasArray.length ? (
          lightsDatasArray.filter((light) => light.state.id !== 8 && light.state.id !== 9)
            .map((light) => {
              const { x, y } = getCoordinates(light.state.id);
              return (
                <g key={light.state.id}>
                  <SvgIcon component={LightbulbIcon} x={x} y={y} width="80px" style={lightStyle}
                    onClick={() => openModalLights(light.state.id)} />
                  <rect x={x + 50} y={y + 300} width="125px" height="50px" fill="#ffef3c66" rx="5px" ry="5px" />
                  <text x={x + 60} y={y + 320} fill="black" fontSize="15px">
                    <tspan>{`Power: ${light.state.apower} W`}</tspan>
                  </text>
                  <text x={x + 60} y={y + 340} fill="black" fontSize="15px">
                    <tspan>{`Output: ${light.state.output === true ? 'ON' : 'OFF'}`}</tspan>
                  </text>
                </g>
              );
            })
        ) : (
          'lightsDatasArray is empty'
        )}

        {coffeeDatas.length ? (
          coffeeDatas.map((coffee) => (
            <g key={100} >
              <SvgIcon component={CoffeeMakerIcon} x='300' y='60' width="80px" onClick={() => openCoffeeModal(coffee.id)} style={coffeeStyle} />
              <rect x={350} y={360} width="125px" height="50px" fill="rgba(167,156,156,0.53)" rx="5px" ry="5px" />
              <text x={360} y={380} fill="black" fontSize="15px">
                <tspan>{`Power: ${coffee.data.macchinettaCaffe?.receivedData?.watt !== null ? coffee.data.macchinettaCaffe?.receivedData?.watt : ''} W`}</tspan>
              </text>
              {/* 
                      <text x={350} y={360} fill="black" fontSize="15px">
                   <tspan>{`Output: ${light.state.output === true ? 'ON' : 'OFF'}`}</tspan>
                  </text>
                   */}
            </g>

          ))
        ) : (
          'CoffeeDatas array is empty'
        )}

        {energyDatas.length ? (
          energyDatas.map((energy) => (
            <g key={200} style={boltStyle}>
              <SvgIcon component={BoltIcon} x='610' y='100' width="80px" onClick={() => openEnergyModal(energy.id)} style={boltStyle} />
              <rect x={660} y={400} width="125px" height="40px" fill="rgba(167,156,156,0.53)" rx="5px" ry="5px" />
              <text x={670} y={425} fill="black" fontSize="15px">
                <tspan>{`Power: ${energy.powerUsed !== undefined ? energy.powerUsed : ''} W`}</tspan>
              </text>
            </g>
          ))
        ) : (
          'energyDatas is empty'
        )
        }

        {printerDatas.length ? (
          printerDatas.map((printer) => (
            <g key={300} >
              <SvgIcon component={PrintIcon} x='990' y='110' width="80px" onClick={() => openPrinterModal(printer.id)} style={printerStyle} />
              <rect x={1040} y={410} width="125px" height="40px" fill="rgba(167,156,156,0.53)" rx="5px" ry="5px" />
              <text x={1050} y={435} fill="black" fontSize="15px">
                <tspan>{`Power: ${printer.tplinkStampante.power.value !== undefined ? printer.tplinkStampante.power.value : ''} W`}</tspan>
              </text>
            </g>
          ))
        ) : (
          'printerDatas is empty'
        )}

      </svg>
       )}

      <ModalLights open={openModalLight} idRoomModal={idRoomModal} handleClose={()=>closeModalLight()} lights={lightsDatasArray} />
      <ModalCoffee open={openModalCoffee} handleClose={()=>closeCoffeeModal()} idCoffee={idCoffeeModal}></ModalCoffee>
      <ModalEnergy open={openModalEnergy} handleClose={()=>closeEnergyModal()} idEnergy={idEnergyModal}></ModalEnergy>
      <ModalPrinter open={openModalPrinter} handleClose={()=>closePrinterModal()} idPrinter={idPrinterModal}></ModalPrinter>

    </div>
  )
}

export default MainPage
