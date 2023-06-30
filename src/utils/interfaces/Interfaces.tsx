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
  tplinkStampante: {
    id: number
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
  id: number,
  powerUsed: number,
  averagePowerUsed: number,
  energyUsedF1: number,
  energyUsedF2: number,
  energyUsedF3: number,
  currentHour: number
}

export interface PrinterStatus {
  stato_presa: boolean
}
export interface Coffee {
  id: number
  data: {
    UNCaffe: number;
    DUECaffe: number;
    accensione: number;
    spegnimento: number;
  }
}

export interface Niveus {
  id: number,
  data: {
    receivedData?: {
      volts: number,
      ampere: number,
      watt: number
    },
    timestamp: string
  }
}
