export type Language = "fr" | "en" | "es" | "de" | "pt" | "zh" | "ja";

export interface Stop {
  stop: {
    name: string;
  };
  departureTime: string;
  arrivalTime: string;
}

export interface Bus {
  id: string;
  company: string;
  scheduledTime: string;
  status: StatusType;
  calls: Stop[];
  scheduledDateTime: Date;
  delayedDateTime: Date | null;
  scheduledDateISO: string;
  delayedDateISO: string | null;
  isDelayed: boolean;
  deviation_seconds: number;
  delayMinutes: number;
  companyColor: string;
  lineCode: string;
  destination: string;
  delayedTime?: string | null;
  isTheoretical?: boolean;
}

export type StatusType =
  | "ON_TIME"
  | "DELAYED"
  | "EARLY"
  | "CANCELLED"
  | "PASSED"
  | "UNKNOWN"
  | "PROGRAMMED"
  | "LATE";

export enum ServerStatusEnum {
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
  LOADING = "LOADING",
  UPDATING = "UPDATING",
  ERROR = "ERROR",
}

export interface Company {
  id: string;
  name: string;
  color: string;
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
  theoretical_schedule: TheoreticalSchedule;
}

export interface TheoreticalSchedule {
  is_theoretical: boolean;
  source: "night_data" | null;
  schedule_type: "THEORETICAL" | "REAL_TIME";
  last_updated: string | null;
}

export interface ApiResponse {
  rides: RawBusData[];
  station: {
    id: string;
    name: string;
    timezone: string;
  };
}
