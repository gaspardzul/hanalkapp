import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Restaurant } from '@/types/restaurant';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
  restaurants: Restaurant[];
  center: { lat: number; lng: number };
  zoom?: number;
  onRestaurantClick?: (restaurant: Restaurant) => void;
  userLocation?: { lat: number; lng: number };
}

// Component to update map center when it changes
const MapController: React.FC<{ center: { lat: number; lng: number }; zoom: number }> = ({
  center,
  zoom,
}) => {
  const map = useMap();

  useEffect(() => {
    map.setView([center.lat, center.lng], zoom);
  }, [center, zoom, map]);

  return null;
};

export const MapView: React.FC<MapViewProps> = ({
  restaurants,
  center,
  zoom = 13,
  onRestaurantClick,
  userLocation,
}) => {
  const mapRef = useRef<L.Map>(null);

  // Custom icon for user location
  const userIcon = L.icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iOCIgZmlsbD0iIzEzNkY2MyIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjQiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  return (
    <div className="h-full w-full rounded-lg overflow-hidden">
      <MapContainer
        ref={mapRef}
        center={[center.lat, center.lng]}
        zoom={zoom}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <MapController center={center} zoom={zoom} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <div className="text-center">
                <strong>Tu ubicación</strong>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Restaurant markers */}
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.place_id}
            position={[
              restaurant.geometry.location.lat,
              restaurant.geometry.location.lng,
            ]}
            eventHandlers={{
              click: () => onRestaurantClick?.(restaurant),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-semibold text-volcanic-800 mb-1">
                  {restaurant.name}
                </h3>
                {restaurant.rating && (
                  <div className="flex items-center gap-1 text-sm mb-1">
                    <span className="text-gold">★</span>
                    <span>{restaurant.rating.toFixed(1)}</span>
                    {restaurant.user_ratings_total && (
                      <span className="text-volcanic-500">
                        ({restaurant.user_ratings_total})
                      </span>
                    )}
                  </div>
                )}
                <p className="text-xs text-volcanic-600">
                  {restaurant.vicinity || restaurant.formatted_address}
                </p>
                {onRestaurantClick && (
                  <button
                    onClick={() => onRestaurantClick(restaurant)}
                    className="mt-2 w-full bg-jade text-white py-1 px-3 rounded text-sm hover:bg-jade-600 transition-colors"
                  >
                    Ver detalles
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
