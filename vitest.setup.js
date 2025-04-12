// vitest.setup.js
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import 'whatwg-fetch';

// Mock des fonctions du navigateur non disponibles dans l'environnement de test JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(key => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});

// Mock de sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(key => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn()
};

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
  writable: true
});

// Mock de window.scrollTo
window.scrollTo = vi.fn();

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock de fetch
global.fetch = vi.fn();

// Configuration des tests d'API
const setupApiMocks = () => {
  // Mock FlixBus API
  global.fetch.mockImplementation((url) => {
    if (url.includes('/api/bus-departures-flixbus')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          rides: [
            {
              id: "flixbus-123",
              status: {
                scheduled_timestamp: "2025-04-13T15:30:00",
                deviation: {
                  deviation_timestamp: "2025-04-13T15:40:00",
                  deviation_seconds: 600,
                  deviation_class: "LATE",
                  deviation_type: "DEPARTURE",
                  updated_at: "2025-04-13T14:00:00"
                }
              },
              line: {
                code: "F123",
                brand: {
                  id: "flixbus",
                  name: "FlixBus"
                }
              },
              calls: [
                {
                  sequence: 0,
                  stop: {
                    id: "montpellier",
                    name: "Montpellier Sabines"
                  }
                },
                {
                  sequence: 1,
                  stop: {
                    id: "lyon",
                    name: "Lyon Perrache"
                  }
                }
              ]
            }
          ],
          station: {
            id: "montpellier",
            name: "Montpellier Sabines",
            timezone: "Europe/Paris"
          }
        })
      });
    }
    
    // Mock BlaBlaBus API
    if (url.includes('/api/bus-departures-blablabus')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          rides: [
            {
              id: "blablabus-456",
              status: {
                scheduled_timestamp: "2025-04-13T16:00:00",
                deviation: null
              },
              line: {
                code: "B456",
                brand: {
                  id: "blablabus",
                  name: "BlaBlaBus"
                }
              },
              calls: [
                {
                  sequence: 0,
                  stop: {
                    id: "montpellier",
                    name: "Montpellier Sabines"
                  }
                },
                {
                  sequence: 1,
                  stop: {
                    id: "paris",
                    name: "Paris Bercy"
                  }
                }
              ]
            }
          ],
          station: {
            id: "montpellier",
            name: "Montpellier Sabines",
            timezone: "Europe/Paris"
          }
        })
      });
    }
    
    // Mock API health endpoint
    if (url.includes('/api/health')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ status: 'OK' })
      });
    }
    
    // Default response for unmatched URLs
    return Promise.resolve({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: 'Not found' })
    });
  });
};

// Setup des mocks d'API
setupApiMocks();

// Réinitialisations entre les tests
beforeEach(() => {
  // Réinitialisation des mocks
  vi.resetAllMocks();
  
  // Réinitialiser localStorage
  localStorageMock.getItem.mockImplementation(key => null);
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
  
  // Réinitialiser le mock de fetch avec nos implémentations par défaut
  setupApiMocks();
});

// Nettoyage après tous les tests
afterAll(() => {
  vi.restoreAllMocks();
});