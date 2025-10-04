import { Restaurant, SearchFilters } from '@/types/restaurant';
import { DEFAULT_SEARCH_RADIUS } from '@/utils/constants';

const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

let googleMapsLoaded = false;
let placesService: google.maps.places.PlacesService | null = null;

/**
 * Load Google Maps script dynamically
 */
const loadGoogleMapsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (googleMapsLoaded) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      googleMapsLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load Google Maps'));
    document.head.appendChild(script);
  });
};

/**
 * Initialize Google Maps Places Service
 */
const initGoogleMaps = async (): Promise<google.maps.places.PlacesService> => {
  if (placesService) return placesService;

  await loadGoogleMapsScript();

  // Create a dummy div for PlacesService (required by Google)
  const div = document.createElement('div');
  placesService = new google.maps.places.PlacesService(div);
  return placesService;
};

/**
 * Convert Google Places result to our Restaurant type
 */
const convertToRestaurant = (place: google.maps.places.PlaceResult): Restaurant => {
  return {
    place_id: place.place_id || '',
    name: place.name || '',
    formatted_address: place.formatted_address || place.vicinity || '',
    geometry: {
      location: {
        lat: place.geometry?.location?.lat() || 0,
        lng: place.geometry?.location?.lng() || 0,
      },
    },
    rating: place.rating,
    user_ratings_total: place.user_ratings_total,
    price_level: place.price_level,
    photos: place.photos as any, // Google PlacePhoto objects
    types: place.types,
    opening_hours: place.opening_hours as any,
    formatted_phone_number: place.formatted_phone_number,
    international_phone_number: place.international_phone_number,
    website: place.website,
    reviews: place.reviews as any,
    business_status: place.business_status,
    vicinity: place.vicinity,
  };
};

/**
 * Search for restaurants using text query
 */
export const searchRestaurants = async (
  query: string,
  location?: { lat: number; lng: number }
): Promise<Restaurant[]> => {
  try {
    const service = await initGoogleMaps();

    const request: google.maps.places.TextSearchRequest = {
      query: query,
      type: 'restaurant',
    };

    if (location) {
      request.location = new google.maps.LatLng(location.lat, location.lng);
      request.radius = DEFAULT_SEARCH_RADIUS;
    }

    return new Promise((resolve, reject) => {
      service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          resolve(results.map(convertToRestaurant));
        } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          resolve([]);
        } else {
          reject(new Error(`Places API error: ${status}`));
        }
      });
    });
  } catch (error) {
    console.error('Error searching restaurants:', error);
    throw error;
  }
};

/**
 * Search for nearby restaurants
 */
export const searchNearbyRestaurants = async (
  location: { lat: number; lng: number },
  radius: number = DEFAULT_SEARCH_RADIUS,
  type?: string
): Promise<Restaurant[]> => {
  try {
    const service = await initGoogleMaps();

    const request: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(location.lat, location.lng),
      radius: radius,
      type: type || 'restaurant',
    };

    return new Promise((resolve, reject) => {
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          resolve(results.map(convertToRestaurant));
        } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          resolve([]);
        } else {
          reject(new Error(`Places API error: ${status}`));
        }
      });
    });
  } catch (error) {
    console.error('Error searching nearby restaurants:', error);
    throw error;
  }
};

/**
 * Get restaurant details by place_id
 */
export const getRestaurantDetails = async (placeId: string): Promise<Restaurant> => {
  try {
    const service = await initGoogleMaps();

    const request: google.maps.places.PlaceDetailsRequest = {
      placeId: placeId,
      fields: [
        'place_id',
        'name',
        'formatted_address',
        'geometry',
        'rating',
        'user_ratings_total',
        'price_level',
        'photos',
        'types',
        'opening_hours',
        'formatted_phone_number',
        'international_phone_number',
        'website',
        'reviews',
        'business_status',
        'vicinity',
      ],
    };

    return new Promise((resolve, reject) => {
      service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          resolve(convertToRestaurant(place));
        } else {
          reject(new Error(`Places API error: ${status}`));
        }
      });
    });
  } catch (error) {
    console.error('Error getting restaurant details:', error);
    throw error;
  }
};

/**
 * Advanced search with filters
 */
export const searchWithFilters = async (filters: SearchFilters): Promise<Restaurant[]> => {
  try {
    console.log('🔍 searchWithFilters called with:', {
      query: filters.query,
      cuisine: filters.cuisine,
      location: filters.location,
      hasLocation: !!filters.location
    });

    let results: Restaurant[] = [];

    // Build search query combining query and cuisine
    let searchQuery = filters.query || '';
    
    // If there's a cuisine filter but no query, we need to search for restaurants
    // Google Places doesn't filter by cuisine type directly, so we rely on the query
    if (!searchQuery && filters.location) {
      console.log('📍 Using nearby search (no query)');
      // Use nearby search for location-based searches without specific query
      const radius = filters.radius || DEFAULT_SEARCH_RADIUS;
      results = await searchNearbyRestaurants(filters.location, radius);
    } else if (searchQuery) {
      console.log('🔎 Using text search with query:', searchQuery);
      // Use text search with the query
      // The query should already contain cuisine-specific terms from Categories.tsx
      results = await searchRestaurants(searchQuery, filters.location);
    } else {
      console.log('⚠️ No query or location provided');
      return [];
    }

    // Apply client-side filters
    let filtered = results;

    // Filter by minimum rating
    if (filters.minRating) {
      filtered = filtered.filter((r) => (r.rating || 0) >= filters.minRating!);
    }

    // Filter by price level
    if (filters.priceLevel && filters.priceLevel.length > 0) {
      filtered = filtered.filter((r) => {
        if (r.price_level === undefined) return false;
        return filters.priceLevel!.includes(r.price_level);
      });
    }

    // Filter by open now
    // Note: open_now is deprecated. We skip this filter to avoid warnings.
    // To properly implement this, we would need to call PlacesService.getDetails() 
    // for each restaurant and use isOpen() method.
    if (filters.openNow) {
      console.log('⚠️ openNow filter is disabled (open_now is deprecated by Google)');
      // filtered = filtered.filter((r) => {
      //   if (!r.opening_hours) return false;
      //   return (r.opening_hours as any).open_now === true;
      // });
    }

    // Note: Cuisine filtering is handled by the search query itself
    // Google Places API doesn't have a direct cuisine type filter
    // The search terms in cuisineTypes.ts are designed to match restaurant names/types

    console.log('✅ Search completed:', {
      totalResults: results.length,
      filteredResults: filtered.length,
      query: filters.query
    });

    return filtered;
  } catch (error) {
    console.error('Error searching with filters:', error);
    throw error;
  }
};

/**
 * Autocomplete search for places
 */
export const autocompleteSearch = async (
  input: string,
  location?: { lat: number; lng: number }
): Promise<any[]> => {
  // Note: This requires the Google Places Autocomplete API
  // For now, returning empty array as placeholder
  // TODO: Implement Google Places Autocomplete using the new API or google maps JS library
  console.log('Autocomplete search:', input, location);
  return [];
};

/**
 * Get photo URL from photo reference
 */
export const getPhotoUrl = (photo: google.maps.places.PlacePhoto, maxWidth: number = 400): string => {
  return photo.getUrl({ maxWidth });
};

/**
 * Check if food establishment type
 */
export const isFoodEstablishment = (types?: string[]): boolean => {
  if (!types) return false;
  const foodTypes = ['restaurant', 'cafe', 'meal_delivery', 'meal_takeaway', 'bakery', 'bar', 'food'];
  return types.some((type) => foodTypes.includes(type));
};
