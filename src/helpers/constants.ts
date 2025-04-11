import { Company } from '../types';

export const COMPANY_COLORS: Record<string, string> = {
  'FlixBus': '#5AB946',
  'BlaBlaBus': '#0073E5',
  'Autre compagnie': '#6B7280'
};

export const COMPANIES: Company[] = [
  { id: 'all', name: 'Tous', color: COMPANY_COLORS['Autre compagnie'] },
  { id: 'flixbus', name: 'FlixBus', color: COMPANY_COLORS['FlixBus'] },
  { id: 'blablabus', name: 'BlaBlaBus', color: COMPANY_COLORS['BlaBlaBus'] }
];

export const BUS_STATUS = {
  ON_TIME: 'ON_TIME',
  LATE: 'LATE',
  EARLY: 'EARLY'
};

export const UPDATE_INTERVAL = 60000; // 1 minute