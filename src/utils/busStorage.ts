import { Bus } from "../types";

/**
 * Utilitaire pour sauvegarder et récupérer les horaires de bus en localStorage
 * Permet de conserver les données même après fermeture du navigateur
 */
export const BusStorage = {
  /**
   * Clé utilisée pour le stockage des bus dans localStorage
   */
  STORAGE_KEY: "bus_schedules_cache",

  /**
   * Clé pour stocker le timestamp de la dernière mise à jour
   */
  TIMESTAMP_KEY: "bus_schedules_timestamp",

  /**
   * Sauvegarde les horaires de bus en localStorage
   */
  saveBusSchedules: (busSchedules: Bus[]): void => {
    try {
      localStorage.setItem(
        BusStorage.STORAGE_KEY,
        JSON.stringify(busSchedules)
      );

      localStorage.setItem(BusStorage.TIMESTAMP_KEY, Date.now().toString());

      console.log(`Sauvegarde de ${busSchedules.length} bus en cache local`);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des bus en cache:", error);
    }
  },

  /**
   * Récupère les horaires de bus depuis localStorage
   */
  loadBusSchedules: (): { buses: Bus[]; timestamp: Date | null } => {
    try {
      const storedBuses = localStorage.getItem(BusStorage.STORAGE_KEY);

      const timestampStr = localStorage.getItem(BusStorage.TIMESTAMP_KEY);
      const timestamp = timestampStr ? new Date(parseInt(timestampStr)) : null;

      if (!storedBuses) {
        return { buses: [], timestamp };
      }

      const buses = JSON.parse(storedBuses) as Bus[];
      console.log(
        `Chargement de ${buses.length} bus depuis le cache local (${
          timestamp?.toLocaleString() || "date inconnue"
        })`
      );

      return { buses, timestamp };
    } catch (error) {
      console.error(
        "Erreur lors du chargement des bus depuis le cache:",
        error
      );
      return { buses: [], timestamp: null };
    }
  },

  /**
   * Vérifie si le cache est périmé (plus de 24h)
   */
  isCacheExpired: (): boolean => {
    const timestampStr = localStorage.getItem(BusStorage.TIMESTAMP_KEY);
    if (!timestampStr) return true;

    const timestamp = parseInt(timestampStr);
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24h en millisecondes

    return now - timestamp > twentyFourHours;
  },

  /**
   * Obtient l'âge du cache en minutes
   */
  getCacheAge: (): number | null => {
    const timestampStr = localStorage.getItem(BusStorage.TIMESTAMP_KEY);
    if (!timestampStr) return null;

    const timestamp = parseInt(timestampStr);
    const now = Date.now();
    const ageInMs = now - timestamp;
    const ageInMinutes = Math.floor(ageInMs / (60 * 1000));

    return ageInMinutes;
  },
};

export default BusStorage;
