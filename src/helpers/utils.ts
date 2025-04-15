import { COMPANY_COLORS } from './constants';

/**
 * Obtient la couleur associée à une compagnie
 * @param company Nom de la compagnie
 * @returns Couleur hexadécimale
 */
export const getCompanyColor = (company: string | undefined): string => {
  if (!company) return COMPANY_COLORS['Autre compagnie'];
  return COMPANY_COLORS[company] || COMPANY_COLORS['Autre compagnie'];
};

/**
 * Formatte une date en heure (HH:MM)
 * @param date Date à formatter
 * @returns Heure au format HH:MM
 */
export const formatTimeHHMM = (date: Date): string => {
  return date.toLocaleTimeString('us-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Paris'
  });
};

/**
 * Formatte une date en heure (HH:MM) avec un fuseau horaire spécifié
 * @param date Date à formatter
 * @param sourceTimezone Fuseau horaire source (par défaut, null)
 * @returns Heure au format HH:MM
 */

export const formatTimeHHMMWithTZ = (date: Date, sourceTimezone: string | null = null): string => {
  if (sourceTimezone) {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Paris'
    });
  } else {
    return formatTimeHHMM(date);
  }
};

/**
 * Formatte une date en français
 * @param date Date à formatter
 * @returns Date au format fr-FR
 */
export const formatTimeFr = (date: Date): string => {
  return date.toLocaleTimeString('fr-FR');
};


/**
 * Calcule le délai en minutes entre deux timestamps
 * @param scheduledTime Timestamp prévu
 * @param actualTime Timestamp réel
 * @returns Nombre de minutes de délai
 */
export const calculateDelayMinutes = (scheduledTime: string, actualTime: string): number => {
  const scheduled = new Date(scheduledTime).getTime();
  const actual = new Date(actualTime).getTime();
  return Math.floor((actual - scheduled) / (60 * 1000));
};

/**
 * Détermine le texte de statut à afficher
 * @param status Code du statut
 * @param delayMinutes Minutes de retard
 * @returns Texte à afficher
 */
export const getStatusText = (status: string, delayMinutes: number): string => {
  switch(status) {
    case 'ON_TIME':
      return 'À l\'heure';
    case 'LATE':
      return `Retard ${delayMinutes} min`;
    case 'EARLY':
      return 'En avance';
    case 'UNKNOWN':
      return 'Programmé';
    default:
      return 'Programmé';
  }
};
