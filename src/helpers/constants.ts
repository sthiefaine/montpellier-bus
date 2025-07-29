import { Company } from '../types';

export const COMPANY_COLORS: Record<string, string> = {
  'FlixBus': '#5AB946',
  'BlaBlaBus': '#0073E5',
  'Autre compagnie': '#6B7280'
};

export const COMPANIES: Company[] = [
  { id: 'all', name: 'Tous', color: COMPANY_COLORS['Autre compagnie'] },
  { id: 'blablabus', name: 'BlaBlaBus', color: COMPANY_COLORS['BlaBlaBus'] },
  { id: 'flixbus', name: 'FlixBus', color: COMPANY_COLORS['FlixBus'] },

];

export const BUS_STATUS = {
  ON_TIME: 'ON_TIME',
  LATE: 'LATE',
  EARLY: 'EARLY'
};

export const UPDATE_INTERVAL = 60000; // 1 minute

// Configuration de l'URL de base
// @ts-ignore
export const BASE_URL = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://montpellier-bus-back.clairdev.com";