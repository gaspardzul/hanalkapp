import { Link } from 'react-router-dom';
import { Restaurant } from '@/types/restaurant';
import { Card, Badge, StarRating } from '@/components/common';
import { getPhotoUrl, getPriceLevel, formatDistance, calculateDistance } from '@/utils/formatters';
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
  
  // Check if restaurant has photos
  const hasPhoto = restaurant.photos && restaurant.photos.length > 0;
  const photoUrl = hasPhoto ? getPhotoUrl(restaurant.photos![0], 400) : undefined;

  const distance = userLocation
    ? calculateDistance(
        userLocation.lat,
        userLocation.lng,
        restaurant.geometry.location.lat,
        restaurant.geometry.location.lng
      )
    : null;

  const priceLevel = getPriceLevel(restaurant.price_level);
  // Note: We don't show open/closed status to avoid deprecated open_now warning
  // To properly check if open, we would need to call PlacesService.getDetails() with isOpen()

  return (
    <Card hover padding="none" className="overflow-hidden">
      <Link to={`/restaurant/${restaurant.place_id}`}>
        <div className="relative h-48 bg-volcanic-200">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={restaurant.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            // Placeholder SVG for restaurants without photos
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-volcanic-100 to-volcanic-200">
              <svg
                className="w-24 h-24 text-volcanic-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
          )}
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
