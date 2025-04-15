import { ApiResponse, Bus, RawBusData } from "../types";
import { COMPANY_COLORS } from "../helpers/constants";
import { formatTimeHHMM } from "../helpers/utils";

// @ts-ignore
const baseUrl = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://montpellier-bus-backend.vercel.app";

/**
 * @returns Données de l'API FlixBus
 */
export const fetchBusData = async (): Promise<ApiResponse> => {
  const now = new Date(new Date().setHours(new Date().getHours() - 1));
  const from = now.toISOString();
  const to = new Date(
    new Date().setHours(new Date().getHours() + 5)
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

/**
 * @returns Données de l'API Blablabus
 */
export const fetchBusDataBlablabus = async (): Promise<ApiResponse> => {
  const now = new Date(new Date().setHours(new Date().getHours() - 1));
  const from = now.toISOString();
  const to = new Date(
    new Date().setHours(new Date().getHours() + 5)
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

/**
 * Formate les données brutes des bus pour l'affichage
 * @param rides Données brutes des bus
 * @returns Liste des bus formatée
 */
export const formatBusData = (rides: RawBusData[]): Bus[] => {
  if (!rides) {
    return [];
  }

  return rides.map((ride) => {
    const formatTimeStamp =
      ride.line.brand?.id === "flixbus"
        ? ride.status.scheduled_timestamp + "Z"
        : ride.status.scheduled_timestamp;
    const formatDelayedTimeStamp =
      ride.line.brand?.id === "flixbus"
        ? ride.status.deviation?.deviation_timestamp + "Z"
        : ride.status.deviation?.deviation_timestamp;

    const destination = ride.calls[ride.calls.length - 1].stop.name;

    const scheduledDateTime = new Date(formatTimeStamp);
    const delayedDateTime = formatDelayedTimeStamp
      ? new Date(formatDelayedTimeStamp)
      : null;

    const scheduledTime = new Date(formatTimeStamp);
    const formattedScheduledTime = formatTimeHHMM(scheduledTime);

    const isDelayed = ride.status.deviation?.deviation_class === "LATE";
    const delayedTimeStr = ride.status.deviation?.deviation_timestamp
      ? formatTimeHHMM(new Date(formatDelayedTimeStamp))
      : null;
    const delayMinutes = isDelayed
      ? Math.floor(ride.status.deviation.deviation_seconds / 60)
      : 0;

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
      status: ride.status.deviation?.deviation_class || "UNKNOWN",
      calls: ride.calls,
      scheduledDateTime: scheduledDateTime,
      delayedDateTime: delayedDateTime,
      scheduledDateISO: scheduledDateTime.toISOString(),
      delayedDateISO: delayedDateTime ? delayedDateTime.toISOString() : null,
    };
  });
};

/**
 * Filtre et trie les bus selon la compagnie sélectionnée
 * @param buses Liste des bus à filtrer
 * @param companyFilter Identifiant de la compagnie à filtrer
 * @returns Liste des bus filtrée et triée
 */
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

  // Filtrer pour n'afficher que les bus qui ne sont pas encore partis
  // (ou avec un délai pour voir les bus récemment partis)
  const tenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);
  filteredBuses = filteredBuses.filter((bus) => {
    const effectiveTime = bus.delayedDateTime || bus.scheduledDateTime;
    return effectiveTime >= tenMinutesAgo;
  });

  filteredBuses.sort((a, b) => {
    const timeA = a.delayedDateTime || a.scheduledDateTime;
    const timeB = b.delayedDateTime || b.scheduledDateTime;
    return timeA.getTime() - timeB.getTime();
  });

  return filteredBuses;
};
