import { Link } from 'react-router-dom';
import { Restaurant } from '@/types/restaurant';
import { Card, Badge, StarRating } from '@/components/common';
import { getPhotoUrl, getPriceLevel, formatDistance, calculateDistance, isOpenNow } from '@/utils/formatters';
import { useFavorites } from '@/hooks/useFavorites';

interface RestaurantCardProps {
  restaurant: Restaurant;
  userLocation?: { lat: number; lng: number };
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  userLocation,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const photoUrl = restaurant.photos?.[0]
    ? getPhotoUrl(restaurant.photos[0], 400)
    : '/placeholder-restaurant.jpg';

  const distance = userLocation
    ? calculateDistance(
        userLocation.lat,
        userLocation.lng,
        restaurant.geometry.location.lat,
        restaurant.geometry.location.lng
      )
    : null;

  const priceLevel = getPriceLevel(restaurant.price_level);
  const isOpen = isOpenNow(restaurant.opening_hours);

  return (
    <Card hover padding="none" className="overflow-hidden">
      <Link to={`/restaurant/${restaurant.place_id}`}>
        <div className="relative h-48 bg-volcanic-200">
          <img
            src={photoUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {distance !== null && (
            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium text-volcanic-700">
              📍 {formatDistance(distance)}
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(restaurant);
            }}
            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          >
            <span className="text-xl">
              {isFavorite(restaurant.place_id) ? '❤️' : '🤍'}
            </span>
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-lg text-volcanic-800 line-clamp-1">
              {restaurant.name}
            </h3>
            {restaurant.opening_hours && (
              <Badge variant={isOpen ? 'success' : 'error'} size="sm">
                {isOpen ? 'Abierto' : 'Cerrado'}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 mb-2">
            {restaurant.rating && (
              <StarRating rating={restaurant.rating} showNumber size="sm" />
            )}
            {restaurant.user_ratings_total && (
              <span className="text-xs text-volcanic-500">
                ({restaurant.user_ratings_total})
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gold-600">
              {priceLevel.symbol}
            </span>
            <span className="text-xs text-volcanic-600">{priceLevel.label}</span>
          </div>

          <p className="text-sm text-volcanic-600 line-clamp-2">
            {restaurant.vicinity || restaurant.formatted_address}
          </p>

          {/* Service badges */}
          <div className="flex flex-wrap gap-1 mt-3">
            {restaurant.types?.includes('meal_delivery') && (
              <Badge variant="info" size="sm">
                🛵 Delivery
              </Badge>
            )}
            {restaurant.types?.includes('meal_takeaway') && (
              <Badge variant="info" size="sm">
                🚗 Para llevar
              </Badge>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
};
