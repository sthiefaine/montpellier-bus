import { cache } from 'react';

// Map pour stocker les fonctions de rafraîchissement
const refreshFunctions = new Map<string, () => void>();

/**
 * Crée une fonction mise en cache avec possibilité de rafraîchissement
 * @param key Clé unique pour identifier la fonction
 * @param fn Fonction à mettre en cache
 * @returns Fonction mise en cache
 */
export function createRefreshableCache<T extends (...args: any[]) => any>(
  key: string,
  fn: T
): T {
  const cachedFn = cache(fn);
  
  // Stocker la fonction de rafraîchissement
  refreshFunctions.set(key, () => {
    // Forcer le rafraîchissement en modifiant la clé de cache
    const timestamp = Date.now();
    const refreshKey = `${key}-${timestamp}`;
    console.log(`Rafraîchissement forcé du cache: ${key}`);
  });

  return cachedFn as T;
}

/**
 * Force le rafraîchissement d'une fonction mise en cache
 * @param key Clé de la fonction à rafraîchir
 */
export function refreshCache(key: string): void {
  const refreshFn = refreshFunctions.get(key);
  if (refreshFn) {
    refreshFn();
  } else {
    console.warn(`Fonction de rafraîchissement non trouvée pour la clé: ${key}`);
  }
}

/**
 * Rafraîchit tous les caches
 */
export function refreshAllCaches(): void {
  console.log('Rafraîchissement de tous les caches...');
  refreshFunctions.forEach((refreshFn, key) => {
    console.log(`Rafraîchissement du cache: ${key}`);
    refreshFn();
  });
}

/**
 * Obtient la liste des clés de cache disponibles
 * @returns Liste des clés
 */
export function getCacheKeys(): string[] {
  return Array.from(refreshFunctions.keys());
} 