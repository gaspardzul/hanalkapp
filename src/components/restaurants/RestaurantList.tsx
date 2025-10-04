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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.place_id}
          restaurant={restaurant}
          userLocation={userLocation}
        />
      ))}
    </div>
  );
};
