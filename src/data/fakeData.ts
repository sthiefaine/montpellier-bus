import { Bus } from "../types";

const now = new Date();
const baseTime = new Date(now);
baseTime.setMinutes(baseTime.getMinutes() + 30);

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

const getDelayedTime = (baseDate: Date, delayMinutes: number) => {
  const delayed = new Date(baseDate);
  delayed.setMinutes(delayed.getMinutes() + delayMinutes);
  return delayed;
};

export const fakeBuses: Bus[] = [
  {
    id: "1",
    lineCode: "123",
    company: "autre",
    companyColor: "#8B4513",
    destination: "Paris",
    scheduledTime: formatTime(baseTime),
    delayedTime: formatTime(getDelayedTime(baseTime, 12)),
    isDelayed: true,
    deviation_seconds: 12 * 60,
    delayMinutes: 12,
    status: "LATE",
    calls: [],
    scheduledDateTime: baseTime,
    delayedDateTime: getDelayedTime(baseTime, 12),
    scheduledDateISO: baseTime.toISOString(),
    delayedDateISO: getDelayedTime(baseTime, 12).toISOString(),
  },
  {
    id: "2",
    lineCode: "456",
    company: "autre",
    companyColor: "#8B4513",
    destination: "Lyon",
    scheduledTime: formatTime(baseTime),
    delayedTime: formatTime(getDelayedTime(baseTime, 181)),
    isDelayed: true,
    deviation_seconds: 181 * 60,
    delayMinutes: 181,
    status: "LATE",
    calls: [],
    scheduledDateTime: baseTime,
    delayedDateTime: getDelayedTime(baseTime, 181),
    scheduledDateISO: baseTime.toISOString(),
    delayedDateISO: getDelayedTime(baseTime, 181).toISOString(),
  },
  {
    id: "3",
    lineCode: "789",
    company: "autre",
    companyColor: "#8B4513",
    destination: "Marseille",
    scheduledTime: formatTime(baseTime),
    delayedTime: formatTime(getDelayedTime(baseTime, 72)),
    isDelayed: true,
    deviation_seconds: 72 * 60,
    delayMinutes: 72,
    status: "LATE",
    calls: [],
    scheduledDateTime: baseTime,
    delayedDateTime: getDelayedTime(baseTime, 72),
    scheduledDateISO: baseTime.toISOString(),
    delayedDateISO: getDelayedTime(baseTime, 72).toISOString(),
  },
  {
    id: "4",
    lineCode: "101",
    company: "autre",
    companyColor: "#8B4513",
    destination: "Toulouse",
    scheduledTime: formatTime(baseTime),
    delayedTime: formatTime(getDelayedTime(baseTime, -2)),
    isDelayed: false,
    deviation_seconds: -2 * 60,
    delayMinutes: -2,
    status: "EARLY",
    calls: [],
    scheduledDateTime: baseTime,
    delayedDateTime: getDelayedTime(baseTime, -2),
    scheduledDateISO: baseTime.toISOString(),
    delayedDateISO: getDelayedTime(baseTime, -2).toISOString(),
  },
  {
    id: "5",
    lineCode: "102",
    company: "autre",
    companyColor: "#8B4513",
    destination: "Bordeaux",
    scheduledTime: formatTime(baseTime),
    delayedTime: formatTime(getDelayedTime(baseTime, -61)),
    isDelayed: false,
    deviation_seconds: -61 * 60,
    delayMinutes: -61,
    status: "EARLY",
    calls: [],
    scheduledDateTime: baseTime,
    delayedDateTime: getDelayedTime(baseTime, -61),
    scheduledDateISO: baseTime.toISOString(),
    delayedDateISO: getDelayedTime(baseTime, -61).toISOString(),
  },
  {
    id: "6",
    lineCode: "103",
    company: "autre",
    companyColor: "#8B4513",
    destination: "Nantes",
    scheduledTime: formatTime(baseTime),
    delayedTime: formatTime(getDelayedTime(baseTime, -72)),
    isDelayed: false,
    deviation_seconds: -72 * 60,
    delayMinutes: -72,
    status: "EARLY",
    calls: [],
    scheduledDateTime: baseTime,
    delayedDateTime: getDelayedTime(baseTime, -72),
    scheduledDateISO: baseTime.toISOString(),
    delayedDateISO: getDelayedTime(baseTime, -72).toISOString(),
  },
]; 