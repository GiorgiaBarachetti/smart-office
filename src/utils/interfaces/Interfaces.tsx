export interface Lights {  
  room?: string;
  state: {
    id: number;
    output?: boolean;
    apower?: number;
    voltage?: number;
    current?: number;
    aenergy?: {
      total?: number;
      by_minute?: [number, number, number];
      minute_ts?: number;
    };
    temperature?: {
      tC?: number;
      tF?: number;
    };
  }
}

export interface Printer {
  id: 100
  tplinkStampante: {
        power: {
            value: number,
            unit: "W"
        },
        voltage: {
            value: number,
            unit: "V"
        },
        current: {
            value: number,
            unit: "A"
        },
        total: {
            value: number,
            unit: "kWh"
        }
    }
}

export interface Energy {
  //id setted by me, inexistent in api
    id : 200,
    powerUsed: number,
    averagePowerUsed: number,
    energyUsedF1: number,
    energyUsedF2: number,
    energyUsedF3: number,
    currentHour : number
}

export interface PrinterStatus{
  stato_presa: boolean
}
export interface Coffee {
  id: 100; 
  coffees: {
    accensioni: number;
    coffeeCount: number;
  };
  data: {
    macchinettaCaffe: {
      receivedData: {
        volts: number;
        ampere: number;
        watt: number;
      };
      timestamp: number;
    };
    totalCoffeeToday: number;
    count1: number;
    count2: number;
  };
}
