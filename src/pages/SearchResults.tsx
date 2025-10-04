import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar, FilterPanel, CuisineFilter } from '@/components/search';
import { RestaurantList } from '@/components/restaurants';
import { MapView } from '@/components/map';
import { Button } from '@/components/common';
import { useRestaurants } from '@/hooks/useRestaurants';
import { useGeolocation } from '@/hooks/useGeolocation';
import { SearchFilters, ViewMode } from '@/types/restaurant';

export const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { restaurants, loading, error, search } = useRestaurants();
  const { latitude, longitude } = useGeolocation();

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [filters, setFilters] = useState<SearchFilters>({});

  useEffect(() => {
    // Initialize filters from URL params
    const query = searchParams.get('q') || undefined;
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const cuisine = searchParams.get('cuisine') || undefined;
    const nearby = searchParams.get('nearby') === 'true';

    const initialFilters: SearchFilters = {
      query,
      location:
        lat && lng
          ? { lat: parseFloat(lat), lng: parseFloat(lng) }
          : latitude && longitude
          ? { lat: latitude, lng: longitude }
          : undefined,
      cuisine: cuisine as any,
    };

    setFilters(initialFilters);

    // Perform search if we have query or location
    if (query || initialFilters.location || nearby) {
      search(initialFilters);
    }
  }, [searchParams, latitude, longitude]);

  const handleSearch = (query: string) => {
    const newFilters = { ...filters, query };
    setFilters(newFilters);
    search(newFilters);

    // Update URL
    const params = new URLSearchParams();
    params.set('q', query);
    if (filters.location) {
      params.set('lat', filters.location.lat.toString());
      params.set('lng', filters.location.lng.toString());
    }
    setSearchParams(params);
  };

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    search(newFilters);
  };

  const userLocation =
    filters.location || (latitude && longitude ? { lat: latitude, lng: longitude } : undefined);

  const mapCenter = userLocation || {
    lat: restaurants[0]?.geometry.location.lat || 19.4326,
    lng: restaurants[0]?.geometry.location.lng || -99.1332,
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Search Header */}
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} initialValue={filters.query} />
      </div>

      {/* Cuisine Filter */}
      <div className="mb-4">
        <CuisineFilter
          selectedCuisine={filters.cuisine}
          onCuisineChange={(cuisine) => handleFiltersChange({ ...filters, cuisine })}
        />
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-volcanic-800">
          {loading ? 'Buscando...' : `${restaurants.length} restaurantes encontrados`}
        </h2>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            📋 Lista
          </Button>
          <Button
            variant={viewMode === 'map' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('map')}
          >
            🗺️ Mapa
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {viewMode === 'list' ? (
            <RestaurantList
              restaurants={restaurants}
              loading={loading}
              error={error}
              userLocation={userLocation}
            />
          ) : (
            <div className="h-[600px] bg-white rounded-lg shadow-md overflow-hidden">
              <MapView
                restaurants={restaurants}
                center={mapCenter}
                zoom={13}
                userLocation={userLocation}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
