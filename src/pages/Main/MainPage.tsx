import React, { useState, useEffect } from 'react';

import SvgIcon from '@mui/material/SvgIcon';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PrintIcon from '@mui/icons-material/Print';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import BoltIcon from '@mui/icons-material/Bolt';
import AirIcon from '@mui/icons-material/Air';
import planimetry from '../../img/background.png';

import { Energy, Lights, Printer, Coffee, PrinterStatus, Niveus } from '../../utils/interfaces/Interfaces';
import ModalLights from '../../components/ModalsMain/ModalLights';
import ModalPrinter from '../../components/ModalsMain/ModalPrinter';
import ModalCoffee from '../../components/ModalsMain/ModalCoffee';
import ModalEnergy from '../../components/ModalsMain/ModalEnergy';
import { baseURL, urlShelly, urlCoffee, urlAlhpa, urlTplink, urlNiveus } from '../../utils/fetch/api';
import { LinearProgress, CircularProgress } from '@mui/material';
import ModalNiveus from '../../components/ModalsMain/ModalNiveus';

const lightStyle = {
  color: '#fff25fc7',
  stroke: 'rgb(255 255 0)'
  //stroke: "#9d9d15",
  //color: "#ffef3c66",
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
const niveusStyle = {
  color: "#66e0dc",
  stroke: "#0f4389"
}

const MainPage = () => {

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


  const [openModalNiveus, setOpenModalNiveus] = useState(false)
  const [idNiveusModal, setIdNiveusModal] = useState<number | undefined>();

  const openNiveusModal = (id: number) => {
    if (id !== undefined) {
      setIdNiveusModal(id);
    }
    setOpenModalNiveus(true);
  };
  const closeNiveusModal = () => {
    setOpenModalNiveus(false)
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


  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingLights, setIsLoadingLights] = useState(false);
  const [isLoadingCoffee, setIsLoadingCoffee] = useState(false);
  const [isLoadingEnergy, setIsLoadingEnergy] = useState(false);
  const [isLoadingNiveus, setIsLoadingNiveus] = useState(false);
  const [isLoadingPrinter, setIsLoadingPrinter] = useState(false);

  const [lightsDatasArray, setLightsDatasArray] = useState<Lights[]>([]);


  const fetchLights = async () => {
    try {
      //setIsLoading(true);
      //setIsLoadingLights(true)
      const response = await fetch(`${baseURL}${urlShelly}/all/status`);
      const data = await response?.json();
      setLightsDatasArray(data.data);
      //setIsLoading(false);
      //setIsLoadingLights(false)
    } catch (error) {
      console.log('error fetching lights', error);
    }
  };


  const [coffeeDatas, setCoffeeDatas] = useState<Coffee[]>([]);
  const fetchCoffee = async () => {
    try {
      setIsLoading(true);
      setIsLoadingCoffee(true)
      const response = await fetch(`${baseURL}${urlCoffee}/data`);
      const data = await response?.json();
      //Array.isArray(data) ? data : [data] senno dice che coffeeDatas non è una function
      setCoffeeDatas(Array.isArray(data) ? data : [data]);
      setIsLoading(false);
      setIsLoadingCoffee(false)
    } catch (error) {
      console.log('Error fetching coffee:', error);
    }
  };

  const [energyDatas, setEnergyDatas] = useState<Energy[]>([]);
  const fetchEnergy = async () => {
    try {
      setIsLoading(true);
      setIsLoadingEnergy(true)
      const response = await fetch(`${baseURL}${urlAlhpa}/registers`);
      const data = await response?.json();
      //Array.isArray(data) ? data : [data] senno dice che coffeeDatas non è una function
      setEnergyDatas(Array.isArray(data) ? data : [data]);
      setIsLoading(false);
      setIsLoadingEnergy(false)
    } catch (error) {
      console.log('Error fetching coffee:', error);
    }
  };

  const [niveusData, setNiveusData] = useState<Niveus[]>([]);

  const fetchNiveus = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${baseURL}${urlNiveus}/registers`);
      const data = await response?.json();
      setNiveusData(Array.isArray(data) ? data : [data]);
      console.log(data)
      setIsLoading(false)
    } catch (error) {
      console.log('not found datas of niveus');
    }
  };

  const [printerDatas, setPrinterDatas] = useState<Printer[]>([]);

  const fetchPrinter = async () => {
    try {
      setIsLoading(true);
      setIsLoadingPrinter(true)
      const response = await fetch(`${baseURL}${urlTplink}/data`);
      const data = await response?.json();
      //Array.isArray(data) ? data : [data] senno dice che printerDatas non è una function
      setPrinterDatas(Array.isArray(data) ? data : [data]);
      setIsLoading(false);
      setIsLoadingPrinter(false)
    } catch (error) {
      console.log('Error fetching coffee:', error);
    }
  };

  const [printerStatus, setPrinterStatus] = useState<PrinterStatus[]>([]);

  const fetchPrinterStatus = async () => {
    try {
      const response = await fetch(`${baseURL}${urlTplink}/status`);
      const data = await response?.json();
      //Array.isArray(data) ? data : [data] senno dice che printerDatas non è una function
      setPrinterStatus(Array.isArray(data) ? data : [data]);
      console.log(data)
    } catch (error) {
      console.log('Error fetching coffee:', error);
    }
  };

  useEffect(() => {
    const timeoutLights = setInterval(() => fetchLights(), 5000)
    const intervalCoffee = setInterval(() => fetchCoffee(), 10000)
    const intervalEnergy = setInterval(() => fetchEnergy(), 10000)
    const intervalNiveus = setTimeout(() => fetchNiveus(), 1000)
    const timeoutPrinter = setTimeout(() => fetchPrinter(), 100)
    const timeoutPrinterStatus = setTimeout(() => fetchPrinterStatus(), 1000)

    return () => {
      clearInterval(timeoutLights)
      clearInterval(intervalCoffee)
      clearInterval(intervalEnergy)
      clearTimeout(intervalNiveus)
      clearTimeout(timeoutPrinter)
      clearTimeout(timeoutPrinterStatus)
    }
  }, []);

  const [boltStyle, setBoltStyle] = useState({
    color: "rgba(113,200, 46)",
    stroke: "rgba(25, 104, 34,1)"
  })
  const changeStyleBolt = () => {
    //if the powerused of the first element of energy array is >= 690 
    if (energyDatas[0]?.powerUsed >= 1308) {
      return {
        ...boltStyle,
        color: "rgba(202,232,76)",
        stroke: "rgba(41,146,53,1)"
      };
    } else if (energyDatas[0]?.powerUsed >= 2070) {
      return {
        ...boltStyle,
        color: "rgba(244,245,27)",
        stroke: "rgba(136,135,46,1)"
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

      <svg viewBox="0 0 1280 720" preserveAspectRatio="xMinYMin meet" /*style={{ paddingLeft: { sm: '80px', md: '150px' } }} */>
        <image href={planimetry} width={'100%'}></image>
        {isLoadingLights ? (
          <LinearProgress />
        ) : (
          lightsDatasArray && lightsDatasArray.length > 0 ? (
            lightsDatasArray
              .filter((light) => light.state && light.state.id !== 8 && light.state.id !== 9)
              .map((light) => {
                const { x, y } = getCoordinates(light.state.id);
                return (
                  <g key={light.state.id} style={{ cursor: 'pointer' }}>
                    <SvgIcon component={LightbulbIcon} x={x} y={y} width="80px" style={lightStyle} onClick={() => openModalLights(light.state.id)} />
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
          )
        )}

        {/*cordinate rect: x = 300+50 e y = 60 + 300*/}

        {isLoadingCoffee ? (<LinearProgress />) : (
          coffeeDatas.length ? (
            coffeeDatas.map((coffee) => (
              <g key={coffee.coffes.id} style={{ ...coffeeStyle, cursor: 'pointer' }} >
                <SvgIcon component={CoffeeMakerIcon} x='300' y='60' width="80px" onClick={() => openCoffeeModal(coffee.coffes.id)} />
                <rect x={345} y={350} width="140px" height="50px" fill="rgba(167,156,156,0.53)" rx="5px" ry="5px" />
                <text x={360} y={380} fontSize="15px">
                  <tspan>{`Power: ${coffee.data.macchinettaCaffe?.receivedData?.watt !== undefined ? coffee.data.macchinettaCaffe?.receivedData?.watt : '0'} W`}</tspan>
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
          )
        )}

        {isLoadingNiveus ? (<LinearProgress />) : (
          niveusData.length ? (
            niveusData.map((niveus) => (
              <g key={niveus.id} style={{...niveusStyle, cursor: 'pointer' }}>
                <SvgIcon component={AirIcon} x='700' y='50' width="80px" onClick={() => openNiveusModal(niveus.id)} />
                <rect x={750} y={350} width="125px" height="40px" fill="rgba(167,156,156,0.53)" rx="5px" ry="5px" />
                <text x={770} y={375} fill="black" fontSize="15px">
                  <tspan>{`Power: ${niveus.data.receivedData.watt !== undefined ? niveus.data.receivedData.watt : ''} W`}</tspan>
                </text>
              </g>
            ))
          ) : (
            'niveusData is empty'
          )
        )}

        {isLoadingEnergy ? (<LinearProgress />) : (
          energyDatas.length ? (
            energyDatas.map((energy) => (
              <g key={energy.id} style={{ ...boltStyle, cursor: 'pointer' }}>
                <SvgIcon component={BoltIcon} x='610' y='200' width="80px" onClick={() => openEnergyModal(energy.id)} />
                <rect x={660} y={500} width="125px" height="40px" fill="rgba(167,156,156,0.53)" rx="5px" ry="5px" />
                <text x={670} y={525} fill="black" fontSize="15px">
                  <tspan>{`Power: ${energy.powerUsed !== undefined ? energy.powerUsed : ''} W`}</tspan>
                </text>
              </g>
            ))
          ) : (
            'energyDatas is empty'
          )
        )}

        {isLoadingPrinter ? (<CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }} />
        ) : (
          printerDatas.length ? (
            printerDatas.map((printer) => (
              <g key={printer.tplinkStampante.id} style={{ ...printerStyle, cursor: 'pointer' }}>
                <SvgIcon component={PrintIcon} x='990' y='110' width="80px" onClick={() => openPrinterModal(printer.tplinkStampante.id)} />
                <rect x={1040} y={410} width="140px" height="40px" fill="rgba(167,156,156,0.53)" rx="5px" ry="5px" />
                <text x={1050} y={435} fill="black" fontSize="15px">
                  <tspan>{`Power: ${printer.tplinkStampante.power.value !== undefined ? printer.tplinkStampante.power.value : ''} W`}</tspan>
                </text>
              </g>
            ))
          ) : (
            'printerDatas is empty'
          )
        )}
      </svg>

      <ModalLights open={openModalLight} handleClose={() => closeModalLight()} idRoomModal={idRoomModal} lights={lightsDatasArray} fetchLights={fetchLights} />
      <ModalCoffee open={openModalCoffee} handleClose={() => closeCoffeeModal()} idCoffee={idCoffeeModal} />
      <ModalEnergy open={openModalEnergy} handleClose={() => closeEnergyModal()} idEnergy={idEnergyModal} />
      <ModalNiveus open={openModalNiveus} handleClose={() => closeNiveusModal()} idNiveus={idNiveusModal} />
      <ModalPrinter open={openModalPrinter} handleClose={() => closePrinterModal()} idPrinter={idPrinterModal} printerStatus={printerStatus} fetchPrinterStatus={() => fetchPrinterStatus()} />
    </div>
  )
}

export default MainPage
