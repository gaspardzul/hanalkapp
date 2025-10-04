import { useEffect, useRef, useState } from 'react';
import { Restaurant } from '@/types/restaurant';
import { RestaurantCard } from './RestaurantCard';
import { Loading } from '@/components/common';

interface RestaurantListProps {
  restaurants: Restaurant[];
  loading?: boolean;
  error?: string | null;
  userLocation?: { lat: number; lng: number };
}

export const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  loading = false,
  error = null,
  userLocation,
}) => {
  const [displayCount, setDisplayCount] = useState(12);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Reset display count when restaurants change
  useEffect(() => {
    setDisplayCount(12);
  }, [restaurants]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayCount < restaurants.length) {
          setDisplayCount((prev) => Math.min(prev + 12, restaurants.length));
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [displayCount, restaurants.length]);
  if (loading) {
    return <Loading size="lg" text="Buscando restaurantes..." />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <span className="text-4xl mb-2 block">😕</span>
        <h3 className="font-semibold text-red-800 mb-1">Error</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="bg-sand-200 rounded-lg p-8 text-center">
        <span className="text-6xl mb-4 block">🔍</span>
        <h3 className="font-semibold text-volcanic-800 mb-2">
          No encontramos restaurantes
        </h3>
        <p className="text-volcanic-600">
          Intenta ajustar tus filtros o buscar en otra ubicación
        </p>
      </div>
    );
  }

  const displayedRestaurants = restaurants.slice(0, displayCount);
  const hasMore = displayCount < restaurants.length;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.place_id}
            restaurant={restaurant}
            userLocation={userLocation}
          />
        ))}
      </div>

      {/* Infinite scroll trigger */}
      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-8">
          <div className="flex items-center gap-2 text-volcanic-600">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-jade"></div>
            <span>Cargando más restaurantes...</span>
          </div>
        </div>
      )}

      {/* Show count */}
      {!hasMore && restaurants.length > 12 && (
        <div className="text-center py-6 text-volcanic-600">
          <p>Mostrando todos los {restaurants.length} restaurantes</p>
        </div>
      )}
    </div>
  );
};
