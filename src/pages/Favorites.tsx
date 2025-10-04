import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/hooks/useAuth';
import { useGeolocation } from '@/hooks/useGeolocation';
import { RestaurantList } from '@/components/restaurants';
import { Card, Button, Loading } from '@/components/common';
import { Link } from 'react-router-dom';

export const Favorites: React.FC = () => {
  const { favorites, loading: favoritesLoading } = useFavorites();
  const { user, login, loading: authLoading, isFirebaseAvailable } = useAuth();
  const { latitude, longitude } = useGeolocation();

  const userLocation = latitude && longitude ? { lat: latitude, lng: longitude } : undefined;

  // Show sign-in prompt if Firebase is available but user is not logged in
  if (isFirebaseAvailable && !user && !authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-volcanic-800 mb-6">
          ❤️ Mis Favoritos
        </h1>
        <Card className="text-center p-12">
          <span className="text-6xl mb-4 block">🔐</span>
          <h2 className="text-2xl font-semibold text-volcanic-800 mb-2">
            Inicia sesión para ver tus favoritos
          </h2>
          <p className="text-volcanic-600 mb-6">
            Guarda tus restaurantes favoritos y accede a ellos desde cualquier dispositivo
          </p>
          <Button onClick={login}>
            Iniciar sesión con Google
          </Button>
        </Card>
      </div>
    );
  }

  // Show loading state
  if (authLoading || favoritesLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-volcanic-800 mb-6">
          ❤️ Mis Favoritos
        </h1>
        <Loading size="lg" text="Cargando favoritos..." />
      </div>
    );
  }

  // Show empty state
  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-volcanic-800 mb-6">
          ❤️ Mis Favoritos
        </h1>
        <Card className="text-center p-12">
          <span className="text-6xl mb-4 block">💔</span>
          <h2 className="text-2xl font-semibold text-volcanic-800 mb-2">
            Aún no tienes favoritos
          </h2>
          <p className="text-volcanic-600 mb-6">
            Guarda tus restaurantes favoritos para encontrarlos fácilmente más tarde
          </p>
          <Link to="/">
            <Button>Explorar restaurantes</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-volcanic-800">
          ❤️ Mis Favoritos ({favorites.length})
        </h1>
        {isFirebaseAvailable && user && (
          <p className="text-volcanic-600 text-sm">
            Sincronizado con tu cuenta
          </p>
        )}
      </div>
      <RestaurantList restaurants={favorites} userLocation={userLocation} />
    </div>
  );
};
