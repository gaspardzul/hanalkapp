import { useState, useEffect, useCallback } from 'react';
import { Restaurant } from '@/types/restaurant';
import { useAuth } from './useAuth';
import {
  addFavorite as addFavoriteFirebase,
  removeFavorite as removeFavoriteFirebase,
  getFavorites,
  isFirebaseAvailable,
} from '@/services/firebase';

const FAVORITES_KEY = 'hanalkapp_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, isFirebaseAvailable: firebaseAvailable } = useAuth();

  // Load favorites on mount and when user changes
  useEffect(() => {
    const loadFavorites = async () => {
      if (firebaseAvailable && user) {
        // Load from Firebase
        try {
          setLoading(true);
          setError(null);
          const data = await getFavorites(user.uid);
          setFavorites(data);
          console.log('✅ Loaded favorites from Firebase:', data.length);
        } catch (err: any) {
          console.error('❌ Error loading favorites from Firebase:', err);
          setError(err.message);
          // Fallback to localStorage
          loadFromLocalStorage();
        } finally {
          setLoading(false);
        }
      } else {
        // Load from localStorage
        loadFromLocalStorage();
      }
    };

    loadFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, firebaseAvailable]);

  const loadFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      setFavorites(stored ? JSON.parse(stored) : []);
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      setFavorites([]);
    }
  };

  // Save to localStorage whenever favorites change (fallback)
  useEffect(() => {
    if (!firebaseAvailable || !user) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  }, [favorites, firebaseAvailable, user]);

  const addFavorite = useCallback(async (restaurant: Restaurant) => {
    console.log('➕ Adding favorite:', restaurant.name, { firebaseAvailable, hasUser: !!user });

    if (firebaseAvailable && user) {
      // Add to Firebase
      try {
        setLoading(true);
        setError(null);
        await addFavoriteFirebase(user.uid, restaurant);
        setFavorites((prev) => {
          if (prev.some((r) => r.place_id === restaurant.place_id)) {
            console.log('⚠️ Already in favorites');
            return prev;
          }
          console.log('✅ Added to Firebase favorites');
          return [restaurant, ...prev];
        });
      } catch (err: any) {
        console.error('❌ Error adding favorite:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      // Add to localStorage
      console.log('💾 Adding to localStorage');
      setFavorites((prev) => {
        if (prev.some((r) => r.place_id === restaurant.place_id)) {
          console.log('⚠️ Already in localStorage favorites');
          return prev;
        }
        const updated = [restaurant, ...prev];
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
        console.log('✅ Added to localStorage, total:', updated.length);
        return updated;
      });
    }
  }, [user, firebaseAvailable]);

  const removeFavorite = useCallback(async (placeId: string) => {
    console.log('➖ Removing favorite:', placeId);

    if (firebaseAvailable && user) {
      // Remove from Firebase
      try {
        setLoading(true);
        setError(null);
        await removeFavoriteFirebase(user.uid, placeId);
        setFavorites((prev) => prev.filter((r) => r.place_id !== placeId));
        console.log('✅ Removed from Firebase');
      } catch (err: any) {
        console.error('❌ Error removing favorite:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      // Remove from localStorage
      console.log('💾 Removing from localStorage');
      setFavorites((prev) => {
        const updated = prev.filter((r) => r.place_id !== placeId);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
        console.log('✅ Removed from localStorage, total:', updated.length);
        return updated;
      });
    }
  }, [user, firebaseAvailable]);

  const isFavorite = useCallback(
    (placeId: string): boolean => {
      return favorites.some((r) => r.place_id === placeId);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (restaurant: Restaurant) => {
      const isFav = isFavorite(restaurant.place_id);
      console.log('🔄 Toggle favorite:', restaurant.name, 'isFavorite:', isFav);

      if (isFav) {
        await removeFavorite(restaurant.place_id);
      } else {
        await addFavorite(restaurant);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    loading,
    error,
  };
};
