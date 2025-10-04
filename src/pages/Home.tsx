import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '@/components/search';
import { Button } from '@/components/common';
import { cuisineCategories } from '@/utils/cuisineTypes';
import { useGeolocation } from '@/hooks/useGeolocation';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { latitude, longitude } = useGeolocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const params = new URLSearchParams();
    params.set('q', query);
    if (latitude && longitude) {
      params.set('lat', latitude.toString());
      params.set('lng', longitude.toString());
    }
    navigate(`/search?${params.toString()}`);
  };

  const handleCuisineClick = (cuisineId: string) => {
    const cuisine = cuisineCategories.find((c) => c.id === cuisineId);
    if (cuisine) {
      console.log('🏠 Home - Category clicked:', {
        cuisineId,
        searchTerm: cuisine.searchTerms[0],
        hasLocation: !!(latitude && longitude)
      });
      
      const params = new URLSearchParams();
      params.set('q', cuisine.searchTerms[0]);
      params.set('cuisine', cuisineId);
      if (latitude && longitude) {
        params.set('lat', latitude.toString());
        params.set('lng', longitude.toString());
      }
      
      console.log('🏠 Home - Navigating to:', `/search?${params.toString()}`);
      navigate(`/search?${params.toString()}`);
    }
  };

  const handleNearbySearch = () => {
    if (latitude && longitude) {
      const params = new URLSearchParams();
      params.set('lat', latitude.toString());
      params.set('lng', longitude.toString());
      params.set('nearby', 'true');
      navigate(`/search?${params.toString()}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-jade to-jade-700 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <span className="text-5xl">🍽️</span>
            HanalKapp
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-sand-50">
            Descubre los mejores restaurantes cerca de ti
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant="secondary"
              onClick={handleNearbySearch}
              disabled={!latitude || !longitude}
            >
              📍 Restaurantes cercanos
            </Button>
            <Button variant="outline" onClick={() => navigate('/categories')}>
              🍽️ Explorar categorías
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-volcanic-800 mb-6 text-center">
            Categorías populares
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cuisineCategories.slice(0, 8).map((cuisine) => (
              <button
                key={cuisine.id}
                onClick={() => handleCuisineClick(cuisine.id)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 flex flex-col items-center gap-3 border-2 border-transparent hover:border-jade"
                style={{ borderColor: `${cuisine.color}20` }}
              >
                <span className="text-4xl">{cuisine.icon}</span>
                <span className="font-semibold text-volcanic-800 text-center">
                  {cuisine.name}
                </span>
              </button>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => navigate('/categories')}>
              Ver todas las categorías →
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-sand-200 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-volcanic-800 mb-8 text-center">
            ¿Por qué usar HanalKapp?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <span className="text-5xl mb-4 block">🗺️</span>
              <h3 className="font-semibold text-xl text-volcanic-800 mb-2">
                Encuentra cerca
              </h3>
              <p className="text-volcanic-600">
                Descubre restaurantes cercanos con geolocalización en tiempo real
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <span className="text-5xl mb-4 block">⭐</span>
              <h3 className="font-semibold text-xl text-volcanic-800 mb-2">
                Reseñas reales
              </h3>
              <p className="text-volcanic-600">
                Lee opiniones de otros comensales antes de decidir
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <span className="text-5xl mb-4 block">❤️</span>
              <h3 className="font-semibold text-xl text-volcanic-800 mb-2">
                Tus favoritos
              </h3>
              <p className="text-volcanic-600">
                Guarda tus lugares preferidos para volver fácilmente
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
