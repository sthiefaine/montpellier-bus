import { useRef, useCallback } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

export function useCacheWithExpiry<T>(
  key: string,
  expiryMinutes: number = 5
) {
  const cacheRef = useRef<Map<string, CacheEntry<T>>>(new Map());

  const get = useCallback((cacheKey: string): T | null => {
    const entry = cacheRef.current.get(cacheKey);
    if (!entry) return null;

    const now = Date.now();
    if (now > entry.timestamp + entry.expiry) {
      cacheRef.current.delete(cacheKey);
      return null;
    }

    return entry.data;
  }, []);

  const set = useCallback((cacheKey: string, data: T): void => {
    const now = Date.now();
    const expiry = expiryMinutes * 60 * 1000; // Convertir en millisecondes
    
    cacheRef.current.set(cacheKey, {
      data,
      timestamp: now,
      expiry
    });
  }, [expiryMinutes]);

  const clear = useCallback((cacheKey?: string): void => {
    if (cacheKey) {
      cacheRef.current.delete(cacheKey);
    } else {
      cacheRef.current.clear();
    }
  }, []);

  return { get, set, clear };
} 