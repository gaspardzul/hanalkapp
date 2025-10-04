import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar, FilterPanel, CuisineFilter } from '@/components/search';
import { RestaurantList } from '@/components/restaurants';
import { MapView } from '@/components/map';
import { Button } from '@/components/common';
import { useRestaurants } from '@/hooks/useRestaurants';
import { useGeolocation } from '@/hooks/useGeolocation';
import { SearchFilters, ViewMode } from '@/types/restaurant';
import { cuisineCategories } from '@/utils/cuisineTypes';

export const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { restaurants, loading, error, search } = useRestaurants();
  const { latitude, longitude } = useGeolocation();

  const [filters, setFilters] = useState<SearchFilters>({});
  
  // Get view mode from URL params, default to 'list'
  const viewModeParam = searchParams.get('view') as ViewMode | null;
  const [viewMode, setViewMode] = useState<ViewMode>(viewModeParam || 'list');

  // Sync viewMode with URL params
  useEffect(() => {
    const urlViewMode = searchParams.get('view') as ViewMode | null;
    if (urlViewMode && urlViewMode !== viewMode) {
      setViewMode(urlViewMode);
      console.log('👁️ View mode synced from URL:', urlViewMode);
    }
  }, [searchParams]);

  // Debug: Log view mode changes
  useEffect(() => {
    console.log('👁️ Current view mode:', viewMode);
  }, [viewMode]);

  useEffect(() => {
    // Initialize filters from URL params
    const queryParam = searchParams.get('q');
    const query = queryParam && queryParam.trim() !== '' ? queryParam : undefined;
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const cuisine = searchParams.get('cuisine') || undefined;
    const nearby = searchParams.get('nearby') === 'true';

    console.log('🔄 SearchResults useEffect triggered:', {
      queryParam: `"${queryParam}"`,
      query,
      cuisine,
      lat,
      lng,
      nearby,
      allParams: Object.fromEntries(searchParams.entries())
    });

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
      console.log('🚀 Triggering search with filters:', initialFilters);
      search(initialFilters);
    } else {
      console.log('⚠️ No search triggered - missing query and location');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    
    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.query) params.set('q', newFilters.query);
    if (newFilters.cuisine) params.set('cuisine', newFilters.cuisine);
    if (newFilters.location) {
      params.set('lat', newFilters.location.lat.toString());
      params.set('lng', newFilters.location.lng.toString());
    }
    setSearchParams(params);
  };

  const userLocation =
    filters.location || (latitude && longitude ? { lat: latitude, lng: longitude } : undefined);

  const mapCenter = userLocation || {
    lat: restaurants[0]?.geometry.location.lat || 19.4326,
    lng: restaurants[0]?.geometry.location.lng || -99.1332,
  };

  return (
    <div className="container mx-auto px-3 md:px-4 py-3 md:py-6">
      {/* Search Header */}
      <div className="mb-3 md:mb-6">
        <SearchBar onSearch={handleSearch} initialValue={filters.query} />
      </div>

      {/* Cuisine Filter */}
      <div className="mb-3 md:mb-4">
        <CuisineFilter
          selectedCuisine={filters.cuisine}
          onCuisineChange={(cuisine) => {
            // When a cuisine is selected, also set the query to the first search term
            const cuisineData = cuisine ? cuisineCategories.find(c => c.id === cuisine) : undefined;
            const query = cuisineData ? cuisineData.searchTerms[0] : undefined;
            
            console.log('🔄 Cuisine filter changed:', { cuisine, query });
            handleFiltersChange({ ...filters, cuisine, query });
          }}
        />
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h2 className="text-base md:text-xl font-semibold text-volcanic-800">
          {loading ? 'Buscando...' : `${restaurants.length} ${restaurants.length === 1 ? 'restaurante' : 'restaurantes'}`}
        </h2>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => {
              console.log('🔄 Top buttons - Switching to list view');
              setViewMode('list');
              const params = new URLSearchParams(searchParams);
              params.set('view', 'list');
              setSearchParams(params);
            }}
          >
            📋 Lista
          </Button>
          <Button
            variant={viewMode === 'map' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => {
              console.log('🗺️ Top buttons - Switching to map view');
              setViewMode('map');
              const params = new URLSearchParams(searchParams);
              params.set('view', 'map');
              setSearchParams(params);
            }}
          >
            🗺️ Mapa
          </Button>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'list' ? (
        // List View - Original layout with sidebar
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <RestaurantList
              restaurants={restaurants}
              loading={loading}
              error={error}
              userLocation={userLocation}
            />
          </div>
        </div>
      ) : (
        // Map View - Full width map + list below
        <div className="space-y-4">
          {/* Large Map */}
          <div className="h-[70vh] md:h-[75vh] bg-white rounded-lg shadow-md overflow-hidden sticky top-0 z-10">
            <MapView
              restaurants={restaurants}
              center={mapCenter}
              zoom={13}
              userLocation={userLocation}
            />
          </div>

          {/* Restaurant List Below Map */}
          <div>
            <h3 className="text-lg font-semibold text-volcanic-800 mb-3 px-2">
              📍 Restaurantes en el mapa
            </h3>
            <RestaurantList
              restaurants={restaurants}
              loading={loading}
              error={error}
              userLocation={userLocation}
            />
          </div>
        </div>
      )}
    </div>
  );
};
