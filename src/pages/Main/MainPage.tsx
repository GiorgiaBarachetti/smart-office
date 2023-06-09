import React, { useState, useEffect } from 'react';

import SvgIcon from '@mui/material/SvgIcon';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PrintIcon from '@mui/icons-material/Print';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import BoltIcon from '@mui/icons-material/Bolt';
import AirIcon from '@mui/icons-material/Air';
import { CircularProgress } from '@mui/material';
import planimetry from '../../img/background.png';
import { baseURL, urlShelly, urlCoffee, urlAlhpa, urlTplink, urlNiveus, urlEvents } from '../../utils/fetch/api';
import { Energy, Lights, Printer, PrinterStatus, Niveus, CoffeeConsumes } from '../../utils/interfaces/Interfaces';
import ModalLights from '../../components/ModalsMain/ModalLights';
import ModalPrinter from '../../components/ModalsMain/ModalPrinter';
import ModalCoffee from '../../components/ModalsMain/ModalCoffee';
import ModalEnergy from '../../components/ModalsMain/ModalEnergy';
import ModalNiveus from '../../components/ModalsMain/ModalNiveus';
import SnackbarGeneral from '../../components/Snackbar/SnackbarGeneral';

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
  stroke: "#006dffad"
}

const MainPage = () => {
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setMessage('')
  };

  const [openModalLight, setOpenModalLight] = useState(false)
  const [idRoomModal, setIdRoomModal] = useState<number | undefined>();
  const [openModalCoffee, setOpenModalCoffee] = useState(false)
  const [idCoffeeModal, setIdCoffeeModal] = useState<number | undefined>();
  const [openModalEnergy, setOpenModalEnergy] = useState(false)
  const [idEnergyModal, setIdEnergyModal] = useState<number | undefined>();
  const [openModalNiveus, setOpenModalNiveus] = useState(false)
  const [idNiveusModal, setIdNiveusModal] = useState<number | undefined>();
  const [openModalPrinter, setOpenModalPrinter] = useState(false)
  const [idPrinterModal, setIdPrinterModal] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(false)
  const [lightsDatasArray, setLightsDatasArray] = useState<Lights[]>([]);


  const openModalLights = (id: number) => {
    if (id !== undefined) {
      setIdRoomModal(id);
    }
    setOpenModalLight(true);
  };
  const closeModalLight = () => {
    setOpenModalLight(false)
  }

  const openCoffeeModal = (id: number) => {
    if (id !== undefined) {
      setIdCoffeeModal(id);
    }
    setOpenModalCoffee(true);
  };
  const closeCoffeeModal = () => {
    setOpenModalCoffee(false)
  }

  const openEnergyModal = (id: number) => {
    if (id !== undefined) {
      setIdEnergyModal(id);
    }
    setOpenModalEnergy(true);
  };
  const closeEnergyModal = () => {
    setOpenModalEnergy(false)
  }
  
  const openNiveusModal = (id: number) => {
    if (id !== undefined) {
      setIdNiveusModal(id);
    }
    setOpenModalNiveus(true);
  };
  const closeNiveusModal = () => {
    setOpenModalNiveus(false)
  }
  
  const openPrinterModal = (id: number) => {
    if (id !== undefined) {
      setIdPrinterModal(id);
    }
    setOpenModalPrinter(true);
  };
  const closePrinterModal = () => {
    setOpenModalPrinter(false)
  }

  const fetchLights = async () => {
    try {
      const response = await fetch(`${baseURL}${urlShelly}/all/status`);
      const data = await response?.json();
      setLightsDatasArray(data.data);
      setIsLoading(false);
    } catch (error) {
      setOpen(true)
      setMessage(`Error fetching lights`);
    }
  };


  const [coffeeConsumes, setCoffeeConsumes] = useState<CoffeeConsumes[]>([]);
  const [energyDatas, setEnergyDatas] = useState<Energy[]>([]);
  const [niveusData, setNiveusData] = useState<Niveus[]>([]);
  const [printerDatas, setPrinterDatas] = useState<Printer[]>([]);
  const [printerStatus, setPrinterStatus] = useState<PrinterStatus[]>([]);
  
  const fetchCoffee = async () => {
    try {
      const response = await fetch(`${baseURL}${urlCoffee}/registers`);
      const data = await response?.json();
      //Array.isArray(data) ? data : [data] senno dice che coffeeDatas non è una function
      setCoffeeConsumes(Array.isArray(data) ? data : [data]);
    } catch (error) {
      setOpen(true)
      setMessage(`Error fetching coffee`);
    }
  };

  
  const fetchEnergy = async () => {
    try {
      const response = await fetch(`${baseURL}${urlAlhpa}/registers`);
      const data = await response?.json();
      //Array.isArray(data) ? data : [data] senno dice che coffeeDatas non è una function
      setEnergyDatas(Array.isArray(data) ? data : [data]);
    } catch (error) {
      setOpen(true)
      setMessage(`Error fetching energy`);
    }
  };


  const fetchNiveus = async () => {
    try {
      const response = await fetch(`${baseURL}${urlNiveus}/registers`);
      const data = await response?.json();
      setNiveusData(Array.isArray(data) ? data : [data]);
    } catch (error) {
      setOpen(true)
      setMessage(`Error fetching niveus`);
    }
  };


  const fetchPrinter = async () => {
    try {
      const response = await fetch(`${baseURL}${urlTplink}/data`);
      const data = await response?.json();
      //Array.isArray(data) ? data : [data] senno dice che printerDatas non è una function
      setPrinterDatas(Array.isArray(data) ? data : [data]);
    } catch (error) {
      setOpen(true)
      setMessage(`Error fetching printer datas`);
    }
  };


  const fetchPrinterStatus = async () => {
    try {
      const response = await fetch(`${baseURL}${urlTplink}/status`);
      const data = await response?.json();
      //Array.isArray(data) ? data : [data] senno dice che printerDatas non è una function
      setPrinterStatus(Array.isArray(data) ? data : [data]);
    } catch (error) {
      setOpen(true)
      setMessage(`Error fetching printer status`);
    }
  };

  const [updatedLights, setUpdatedLights] = useState<Lights>();

  useEffect(() => {
    const id = updatedLights?.state?.id
    const output = updatedLights?.state?.output
    const power = updatedLights?.state?.apower

    if (id != undefined && output != undefined && power != undefined) {
      const current_output = lightsDatasArray[id].state.output
      const current_power = lightsDatasArray[id].state.apower

      if (current_output != output && current_power != power && lightsDatasArray != undefined && updatedLights != undefined) {
        const updatedArray = lightsDatasArray.map((c, i) => {
          if (i === id) {
            return updatedLights;
          } else {
            return c;
          }
        });
        setLightsDatasArray(updatedArray);
      }
    }
  }, [updatedLights]);

  useEffect(() => {
    const source = new EventSource(`${baseURL}${urlEvents}`);

    source.onmessage = (event) => {
      if (event.data) {
        const json = JSON.parse(event.data);

        if (json.id === 100 && json) {
          const newData: CoffeeConsumes = {
            ...json
          };
          setCoffeeConsumes(Array.isArray(newData) ? newData : [newData]);
        } else if (json?.tplinkStampante?.id === 300 && json.tplinkStampante) {
          const newData: Printer = {
            ...json
          };
          setPrinterDatas(Array.isArray(newData) ? newData : [newData]);
        } else if (json?.id === 200 && json) {
          const newData: Energy = {
            ...json
          };
          setEnergyDatas(Array.isArray(newData) ? newData : [newData]);
        } else if (json.id === 400 && json.data.receivedData) {
          const { volts, ampere, watt } = json.data.receivedData;
          const newData: Niveus = {
            id: json.id,
            data: {
              receivedData: {
                volts: volts,
                ampere: ampere,
                watt: watt,
              }
            },
          };
          setNiveusData(Array.isArray(newData) ? newData : [newData]);
        } else if (json?.state?.id != undefined && json?.state?.id >= 0 && json?.state?.id <= 7) {
          setUpdatedLights(json)
        }
      }
    }

    source.onerror = () => {
      setOpen(true)
      setMessage(`Error finding new events`);
    };

    return () => {
      source.close();
    };
  }, []);

  useEffect(() => {
    setIsLoading(true)
    fetchLights()
    fetchCoffee()
    fetchEnergy()
    fetchNiveus()
    fetchPrinter()
    fetchPrinterStatus()
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
      // UFFICIO ANDREA
      case 0:
        x = 1000;
        y = -70;
        break;

      // SALA RIUNIONI
      case 1:
        x = 810;
        y = -120;
        break;

      // UFFICIO FLAVIO
      case 2:
        x = 565;
        y = -200;
        break;

      // LABORATORIO
      case 3:
        x = 400;
        y = -245;
        break;

      // CUCINA-RIPOSTIGLIO
      case 4:
        x = 220;
        y = -245;
        break;

      // BREAKTIME SPACE
      case 6:
        x = 280;
        y = -100;
        break;

      // INGRESSO
      case 5:
        x = 585;
        y = 10;
        break;

      // OPEN SPACE
      case 7:
        x = 900;
        y = 120;
        break;

      //COFFEE
      case 100:
        x = 350;
        y = -20;
        break;

      //ENERGY
      case 200:
        x = 530;
        y = 150;
        break;

      //PRINTER
      case 300:
        x = 950;
        y = 250;
        break;

      //NIVEUS
      case 400:
        x = 730;
        y = 50;
        break;

      default:
        break;
    }
    return { x, y };
  };
  
  const { x, y } = getCoordinates(100);

  return (
    <>
      {isLoading && (<CircularProgress sx={{ position: 'absolute', top: 10, right: 10 }} />)}
      <svg viewBox="0 0 1280 780" preserveAspectRatio="xMinYMin meet" >
        <image href={planimetry} height={'100%'} style={{ position: 'relative', top: 0, right: 0 }} />
        {lightsDatasArray && lightsDatasArray.length > 0 ? (
          lightsDatasArray
            .filter((light) => light.state && light.state.id !== 8 && light.state.id !== 9)
            .map((light) => {
              const { x, y } = getCoordinates(light.state.id);
              return (
                <g key={light.state.id} style={{ cursor: 'pointer' }}>
                  <SvgIcon component={LightbulbIcon} x={x} y={y} width="80px" style={lightStyle} onClick={() => openModalLights(light.state.id)} />
                  <rect x={x + 50} y={y + 305} width="145px" height="70px" fill="#ffef3c66" rx="5px" ry="5px" />
                  <text x={x + 60} y={y + 325} fill="black" fontSize="15px">
                    <tspan style={{ fontWeight: 'bold' }}>{`${light.room != undefined ? `${light.room}` : ''}`}</tspan>
                  </text>
                  <text x={x + 60} y={y + 345} fill="black" fontSize="15px">
                    <tspan>{`Power: ${light.state.apower} W`}</tspan>
                  </text>
                  <text x={x + 60} y={y + 365} fill="black" fontSize="15px">
                    <tspan>{`Status: ${light.state.output === true ? 'ON' : 'OFF'}`}</tspan>
                  </text>
                </g>
              );
            })
        ) : (
          'lightsDatasArray is empty'
        )}

        {coffeeConsumes.map((c) =>
          <g key={c.id} style={{ ...coffeeStyle, cursor: 'pointer' }} >
            <SvgIcon component={CoffeeMakerIcon} x={x} y={y} width="80px" onClick={() => openCoffeeModal(100)} />
            <rect x={x + 70} y={y + 340} width="125px" height="40px" fill="rgba(167,156,156,0.53)" rx="5px" ry="5px" />
            <text x={x + 80} y={y + 365} fill="black" fontSize="15px">
              <tspan>{`Power: ${c?.data?.receivedData?.watt !== undefined ? c?.data?.receivedData?.watt : '0'} W`}</tspan>
            </text>
          </g>
        )
        }


        {niveusData.length ? (
          niveusData.map((niveus) => {
            const { x, y } = getCoordinates(niveus.id);
            return (
              <g key={niveus.id} style={{ ...niveusStyle, cursor: 'pointer' }}>
                <SvgIcon component={AirIcon} x={x} y={y} width="80px" onClick={() => openNiveusModal(niveus.id)} />
                <rect x={x + 50} y={y + 335} width="125px" height="40px" fill="rgba(167,156,156,0.53)" rx="5px" ry="5px" />
                <text x={x + 60} y={y + 360} fill="black" fontSize="15px">
                  <tspan>{`Power: ${niveus?.data?.receivedData?.watt !== undefined ? niveus?.data?.receivedData?.watt : '0'} W`}</tspan>
                </text>
              </g>
            )
          })
        ) : ('niveusData is empty')}

        {energyDatas.length ? (
          energyDatas.map((energy) => {
            const { x, y } = getCoordinates(energy.id);
            return (
              <g key={energy.id} style={{ ...boltStyle, cursor: 'pointer' }}>
                <SvgIcon component={BoltIcon} x={x} y={y} width="80px" onClick={() => openEnergyModal(energy.id)} />
                <rect x={x + 50} y={y + 335} width="125px" height="40px" fill="rgba(167,156,156,0.53)" rx="5px" ry="5px" />
                <text x={x + 60} y={y + 360} fill="black" fontSize="15px">
                  <tspan>{`Power: ${energy.powerUsed !== undefined ? energy.powerUsed : '0'} W`}</tspan>
                </text>
              </g>
            )
          })
        ) : (
          'energyDatas is empty'
        )
        }

        {printerDatas.length ? (
          printerDatas.map((printer) => {
            const { x, y } = getCoordinates(printer.tplinkStampante.id);
            return (
              <g key={printer.tplinkStampante.id} style={{ ...printerStyle, cursor: 'pointer' }}>
                <SvgIcon component={PrintIcon} x={x} y={y} width="80px" onClick={() => openPrinterModal(printer.tplinkStampante.id)} />
                <rect x={x + 50} y={y + 325} width="140px" height="60px" fill="rgba(167,156,156,0.53)" rx="5px" ry="5px" />
                <text x={x + 60} y={y + 350} fill="black" fontSize="15px">
                  <tspan>{`Power: ${printer.tplinkStampante.power.value !== undefined ? printer.tplinkStampante.power.value : '0'} W`}</tspan>
                </text>

                <text x={x + 60} y={y + 370} fill="black" fontSize="15px">
                  <tspan>{`Status: ${printerStatus[0]?.stato_presa != undefined && printerStatus[0]?.stato_presa === true ? 'ON' : 'OFF'}`}</tspan>
                </text>

              </g>
            )
          })
        ) : (
          'printerDatas is empty'
        )
        }
      </svg>

      <ModalLights open={openModalLight} handleClose={() => closeModalLight()} idRoomModal={idRoomModal} lights={lightsDatasArray} />
      <ModalCoffee open={openModalCoffee} handleClose={() => closeCoffeeModal()} idCoffee={idCoffeeModal} />
      <ModalEnergy open={openModalEnergy} handleClose={() => closeEnergyModal()} idEnergy={idEnergyModal} />
      <ModalNiveus open={openModalNiveus} handleClose={() => closeNiveusModal()} idNiveus={idNiveusModal} />
      <ModalPrinter open={openModalPrinter} handleClose={() => closePrinterModal()} idPrinter={idPrinterModal} printerStatus={printerStatus} fetchPrinter={() => fetchPrinter()} fetchPrinterStatus={() => fetchPrinterStatus()} />
      {message != '' ? <SnackbarGeneral openSnackbar={open} handleClose={() => handleClose()} message={message} /> : null}
    </>
  )
}

export default MainPage
