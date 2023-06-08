import { Lights } from '../../utils/interfaces/Interfaces';
import {useState, useEffect} from 'react'

const Fetch = () => {
    
    const [lightsDatasArray, setLightsDatasArray] = useState<Lights[]>([]);  

    const fetchLights = async () => {
        try {
          const response = await fetch("http://192.168.1.6:3000/api/shelly/relays/all/Datas");
          const data = await response?.json();
          setLightsDatasArray(data);
          console.log(data);
        } catch (error) {
          console.log('nooo');
        }
      };

    useEffect(() => {
        fetchLights();
      }, []);

} 
export default Fetch
