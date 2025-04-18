import { ApiResponse, Bus, RawBusData, StatusType } from "../types";
import { COMPANY_COLORS } from "../helpers/constants";
import { formatTimeHHMM } from "../helpers/utils";

// @ts-ignore
const baseUrl = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://montpellier-bus-backend.vercel.app";

export const fetchBusData = async (): Promise<ApiResponse> => {
  const now = new Date(new Date().setHours(new Date().getHours() - 5));
  const from = now.toISOString();
  const to = new Date(
    new Date().setHours(new Date().getHours() + 8)
  ).toISOString();

  const apiUrl = `${baseUrl}/api/bus-departures-flixbus?from=${encodeURIComponent(
    from
  )}&to=${encodeURIComponent(to)}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status}`);
  }

  return await response.json();
};

export const fetchBusDataBlablabus = async (): Promise<ApiResponse> => {
  const now = new Date(new Date().setHours(new Date().getHours() - 5));
  const from = now.toISOString();
  const to = new Date(
    new Date().setHours(new Date().getHours() + 8)
  ).toISOString();

  const apiUrl = `${baseUrl}/api/bus-departures-blablabus?from=${encodeURIComponent(
    from
  )}&to=${encodeURIComponent(to)}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status}`);
  }

  return await response.json();
};

export const formatBusData = (
  rides: RawBusData[],
  isFlixBus: boolean = false
): Bus[] => {
  if (!rides) {
    return [];
  }

  return rides.map((ride) => {
    let formatTimeStamp = ride.status.scheduled_timestamp;
    let formatDelayedTimeStamp = ride.status.deviation?.deviation_timestamp;

    if (isFlixBus) {
      formatTimeStamp = formatTimeStamp + "Z";
      if (formatDelayedTimeStamp) {
        formatDelayedTimeStamp = formatDelayedTimeStamp + "Z";
      }
    }

    const destination = ride.calls[ride.calls.length - 1].stop.name;
    const scheduledDateTime = new Date(formatTimeStamp);
    const delayedDateTime = formatDelayedTimeStamp ? new Date(formatDelayedTimeStamp) : null;
    const formattedScheduledTime = formatTimeHHMM(scheduledDateTime);
    const isDelayed = ride.status.deviation?.deviation_class === "LATE";
    const delayedTimeStr = delayedDateTime ? formatTimeHHMM(delayedDateTime) : null;
    const delayMinutes = isDelayed ? Math.floor(ride.status.deviation.deviation_seconds / 60) : 0;
    const company = ride.line.brand?.name || "Autre compagnie";

    return {
      id: ride.id,
      lineCode: ride.line.code,
      company: company,
      companyColor:
        COMPANY_COLORS[company] || COMPANY_COLORS["Autre compagnie"],
      destination: destination,
      scheduledTime: formattedScheduledTime,
      delayedTime: delayedTimeStr,
      deviation_seconds: ride.status.deviation?.deviation_seconds || 0,
      isDelayed: isDelayed,
      delayMinutes: delayMinutes,
      status: ride.status.deviation?.deviation_class as StatusType || "UNKNOWN",
      calls: ride.calls,
      scheduledDateTime: scheduledDateTime,
      delayedDateTime: delayedDateTime,
      scheduledDateISO: scheduledDateTime.toISOString(),
      delayedDateISO: delayedDateTime ? delayedDateTime.toISOString() : null,
      isTheoretical: ride.theoretical_schedule.is_theoretical,
    };
  });
};

export const filterAndSortBuses = (
  buses: Bus[],
  companyFilter: string
): Bus[] => {
  let filteredBuses = buses;
  if (companyFilter !== "all") {
    filteredBuses = buses.filter(
      (bus) => bus.company.toLowerCase() === companyFilter.toLowerCase()
    );
  }
  const now = new Date();

  const timeAgo = new Date(now.getTime() - 45 * 60 * 1000); // 45 minutes
  filteredBuses = filteredBuses.filter((bus) => {
    const effectiveTime = bus.delayedDateTime || bus.scheduledDateTime;
    return effectiveTime >= timeAgo;
  });

  filteredBuses.sort((a, b) => {
    const timeA = a.delayedDateTime || a.scheduledDateTime;
    const timeB = b.delayedDateTime || b.scheduledDateTime;
    return timeA.getTime() - timeB.getTime();
  });

  return filteredBuses;
};