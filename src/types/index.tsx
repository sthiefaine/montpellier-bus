export interface Bus {
  id: string;
  lineCode: string;
  company: string;
  companyColor: string;
  destination: string;
  scheduledTime: string;
  delayedTime: string | null;
  isDelayed: boolean;
  deviation_seconds: number;
  delayMinutes: number;
  status: string;
  calls: Stop[];

  scheduledDateTime: Date;
  delayedDateTime: Date | null; 
  scheduledDateISO: string; 
  delayedDateISO: string | null;
}

export interface Company {
  id: string;
  name: string;
  color: string;
}

export interface Stop {
  sequence: number;
  stop: {
    id: string;
    name: string;
  };
}

export interface RawBusData {
  id: string;
  status: {
    scheduled_timestamp: string;
    deviation: {
      deviation_timestamp: string;
      deviation_seconds: number;
      deviation_class: string;
      deviation_type: string;
      updated_at: string;
    };
  };
  line: {
    code: string;
    brand?: {
      id: string;
      name: string;
    };
  };
  calls: Stop[];
}

export interface ApiResponse {
  rides: RawBusData[];
  station: {
    id: string;
    name: string;
    timezone: string;
  };
}

export enum ServerStatusEnum {
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
  LOADING = "loading",
}
