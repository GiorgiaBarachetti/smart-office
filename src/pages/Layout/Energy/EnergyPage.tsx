import React, { useState, useEffect } from 'react';
import { Energy} from '../../../utils/interfaces/Interfaces';
import TableEnergy from '../../../components/Tables/TableEnergy'
import { baseURL, urlAlhpa } from '../../../utils/fetch/api';

const EnergyPage = () => {
  const [energyStatus, setEnergyStatus] = useState<Energy[]>([]);

  const fetchPrinter = async () => {
    try {
      const response = await fetch(`${baseURL}${urlAlhpa}`);
      const data = await response?.json();
      setEnergyStatus(Array.isArray(data) ? data : [data]);
      console.log(data);
    } catch (error) {
      console.log('not found datas');
    }
  };
  
  useEffect(() => {
    fetchPrinter();
  }, []);

  return (
    <div>
      <TableEnergy energy={energyStatus}/>
    </div>
  )
}

export default EnergyPage
