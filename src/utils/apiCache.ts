interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class ApiCache {
  private cache = new Map<string, CacheEntry<any>>();

  async getOrSet<T>(
    key: string,
    fetchFn: () => Promise<T>,
    expiryMinutes: number = 5
  ): Promise<T> {
    const now = Date.now();
    const entry = this.cache.get(key);

    // Vérifier si l'entrée existe et n'est pas expirée
    if (entry && now < entry.timestamp + entry.expiry) {
      console.log(`Cache hit pour ${key}`);
      return entry.data;
    }

    // Si pas en cache ou expiré, récupérer les données
    console.log(`Cache miss pour ${key}, récupération des données...`);
    const data = await fetchFn();
    
    // Mettre en cache avec expiration
    this.cache.set(key, {
      data,
      timestamp: now,
      expiry: expiryMinutes * 60 * 1000
    });

    return data;
  }

  clear(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  getSize(): number {
    return this.cache.size;
  }

  // Nettoyer les entrées expirées
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.timestamp + entry.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

// Instance singleton
export const apiCache = new ApiCache();

// Fonction utilitaire pour créer une clé de cache basée sur le temps
export const createTimeBasedCacheKey = (baseKey: string, intervalMinutes: number = 5): string => {
  const now = new Date();
  const timeSlot = Math.floor(now.getTime() / (intervalMinutes * 60 * 1000));
  return `${baseKey}-${timeSlot}`;
}; 