import { useState, useCallback } from 'react';
import { Restaurant, SearchFilters } from '@/types/restaurant';
import { searchWithFilters, searchNearbyRestaurants, searchRestaurants } from '@/services/googlePlaces';

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (filters: SearchFilters) => {
    setLoading(true);
    setError(null);

    try {
      const results = await searchWithFilters(filters);
      setRestaurants(results);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al buscar restaurantes';
      setError(errorMessage);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchNearby = useCallback(
    async (location: { lat: number; lng: number }, radius?: number, type?: string) => {
      setLoading(true);
      setError(null);

      try {
        const results = await searchNearbyRestaurants(location, radius, type);
        setRestaurants(results);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al buscar restaurantes cercanos';
        setError(errorMessage);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const searchByText = useCallback(
    async (query: string, location?: { lat: number; lng: number }) => {
      setLoading(true);
      setError(null);

      try {
        const results = await searchRestaurants(query, location);
        setRestaurants(results);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al buscar restaurantes';
        setError(errorMessage);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearResults = useCallback(() => {
    setRestaurants([]);
    setError(null);
  }, []);

  return {
    restaurants,
    loading,
    error,
    search,
    searchNearby,
    searchByText,
    clearResults,
  };
};
