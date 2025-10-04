import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Restaurant } from '@/types/restaurant';
import { getRestaurantDetails } from '@/services/googlePlaces';
import { Loading, Button, Badge, StarRating, Card } from '@/components/common';
import { MapView } from '@/components/map';
import {
  getPhotoUrl,
  getPriceLevel,
  formatRelativeTime,
  getInitials,
  isOpenNow,
} from '@/utils/formatters';
import { SERVICE_BADGES } from '@/utils/constants';
import { useFavorites } from '@/hooks/useFavorites';

export const RestaurantDetail: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (!placeId) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getRestaurantDetails(placeId);
        setRestaurant(data);
      } catch (err) {
        setError('Error al cargar los detalles del restaurante');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [placeId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading size="lg" text="Cargando detalles del restaurante..." />
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="text-center p-8">
          <span className="text-6xl mb-4 block">😕</span>
          <h2 className="text-2xl font-bold text-volcanic-800 mb-2">
            No se pudo cargar el restaurante
          </h2>
          <p className="text-volcanic-600 mb-4">{error}</p>
          <Link to="/">
            <Button>Volver al inicio</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const photos = restaurant.photos || [];
  const priceLevel = getPriceLevel(restaurant.price_level);
  const isOpen = isOpenNow(restaurant.opening_hours);

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: restaurant.name,
          text: `Mira este restaurante en HanalKapp: ${restaurant.name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado al portapapeles');
    }
  };

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Photo Gallery */}
      {photos.length > 0 && (
        <div className="bg-volcanic-900">
          <div className="container mx-auto">
            <div className="relative h-64 md:h-96">
              <img
                src={getPhotoUrl(photos[selectedPhoto], 800)}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              {photos.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {photos.slice(0, 5).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPhoto(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        selectedPhoto === index ? 'bg-white w-8' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-volcanic-800 mb-2">
                {restaurant.name}
              </h1>
              {restaurant.types && (
                <p className="text-volcanic-600 mb-3">
                  {restaurant.types
                    .filter((t) => !t.includes('point_of_interest'))
                    .slice(0, 3)
                    .join(' • ')}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleFavorite(restaurant)}
                className="bg-white border-2 border-volcanic-200 hover:border-jade p-3 rounded-lg transition-colors"
              >
                <span className="text-2xl">
                  {isFavorite(restaurant.place_id) ? '❤️' : '🤍'}
                </span>
              </button>
              <button
                onClick={handleShare}
                className="bg-white border-2 border-volcanic-200 hover:border-jade p-3 rounded-lg transition-colors"
              >
                <span className="text-2xl">🔗</span>
              </button>
            </div>
          </div>

          {/* Rating and Status */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {restaurant.rating && (
              <div className="flex items-center gap-2">
                <StarRating rating={restaurant.rating} size="lg" showNumber />
                {restaurant.user_ratings_total && (
                  <span className="text-volcanic-600">
                    ({restaurant.user_ratings_total} reseñas)
                  </span>
                )}
              </div>
            )}
            <Badge variant={isOpen ? 'success' : 'error'} size="md">
              {isOpen ? '✅ Abierto ahora' : '❌ Cerrado'}
            </Badge>
            <span className="text-lg font-semibold text-gold-600">
              {priceLevel.symbol} - {priceLevel.label}
            </span>
          </div>

          {/* Service Badges */}
          <div className="flex flex-wrap gap-2">
            {restaurant.types?.includes('meal_delivery') && (
              <Badge variant="info">{SERVICE_BADGES.delivery.icon} {SERVICE_BADGES.delivery.label}</Badge>
            )}
            {restaurant.types?.includes('meal_takeaway') && (
              <Badge variant="info">{SERVICE_BADGES.takeout.icon} {SERVICE_BADGES.takeout.label}</Badge>
            )}
            {restaurant.types?.includes('restaurant') && (
              <Badge variant="info">{SERVICE_BADGES.dineIn.icon} {SERVICE_BADGES.dineIn.label}</Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info */}
            <Card>
              <h2 className="text-xl font-semibold text-volcanic-800 mb-4">
                📞 Información de contacto
              </h2>
              <div className="space-y-3">
                <div>
                  <strong className="text-volcanic-700">Dirección:</strong>
                  <p className="text-volcanic-600">{restaurant.formatted_address}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      restaurant.formatted_address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-jade hover:text-jade-600 text-sm inline-flex items-center gap-1 mt-1"
                  >
                    🗺️ Cómo llegar
                  </a>
                </div>
                {restaurant.formatted_phone_number && (
                  <div>
                    <strong className="text-volcanic-700">Teléfono:</strong>
                    <p>
                      <a
                        href={`tel:${restaurant.formatted_phone_number}`}
                        className="text-jade hover:text-jade-600"
                      >
                        {restaurant.formatted_phone_number}
                      </a>
                    </p>
                  </div>
                )}
                {restaurant.website && (
                  <div>
                    <strong className="text-volcanic-700">Sitio web:</strong>
                    <p>
                      <a
                        href={restaurant.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-jade hover:text-jade-600 break-all"
                      >
                        {restaurant.website}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Opening Hours */}
            {restaurant.opening_hours?.weekday_text && (
              <Card>
                <h2 className="text-xl font-semibold text-volcanic-800 mb-4">
                  🕒 Horarios de apertura
                </h2>
                <div className="space-y-2">
                  {restaurant.opening_hours.weekday_text.map((day, index) => (
                    <p key={index} className="text-volcanic-700">
                      {day}
                    </p>
                  ))}
                </div>
              </Card>
            )}

            {/* Reviews */}
            {restaurant.reviews && restaurant.reviews.length > 0 && (
              <Card>
                <h2 className="text-xl font-semibold text-volcanic-800 mb-4">
                  ⭐ Reseñas ({restaurant.reviews.length})
                </h2>
                <div className="space-y-4">
                  {restaurant.reviews.map((review, index) => (
                    <div key={index} className="border-b border-volcanic-200 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-jade text-white flex items-center justify-center font-semibold">
                          {review.profile_photo_url ? (
                            <img
                              src={review.profile_photo_url}
                              alt={review.author_name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            getInitials(review.author_name)
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <strong className="text-volcanic-800">
                              {review.author_name}
                            </strong>
                            <span className="text-xs text-volcanic-500">
                              {formatRelativeTime(review.time)}
                            </span>
                          </div>
                          <StarRating rating={review.rating} size="sm" />
                          <p className="text-volcanic-700 mt-2">{review.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Map */}
            <Card padding="none" className="mb-4 overflow-hidden">
              <div className="h-64">
                <MapView
                  restaurants={[restaurant]}
                  center={{
                    lat: restaurant.geometry.location.lat,
                    lng: restaurant.geometry.location.lng,
                  }}
                  zoom={15}
                />
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="font-semibold text-volcanic-800 mb-3">Acciones rápidas</h3>
              <div className="space-y-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    restaurant.formatted_address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" fullWidth>
                    🗺️ Cómo llegar
                  </Button>
                </a>
                {restaurant.formatted_phone_number && (
                  <a href={`tel:${restaurant.formatted_phone_number}`}>
                    <Button variant="outline" fullWidth>
                      📞 Llamar
                    </Button>
                  </a>
                )}
                {restaurant.website && (
                  <a href={restaurant.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" fullWidth>
                      🌐 Sitio web
                    </Button>
                  </a>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
