// Google Places API Types
export interface PlacePhoto {
  height: number;
  width: number;
  photo_reference: string;
  html_attributions: string[];
}

export interface PlaceGeometry {
  location: {
    lat: number;
    lng: number;
  };
  viewport?: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
}

export interface PlaceOpeningHours {
  open_now?: boolean;
  periods?: {
    close?: {
      day: number;
      time: string;
    };
    open: {
      day: number;
      time: string;
    };
  }[];
  weekday_text?: string[];
}

export interface PlaceReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface PriceLevel {
  level: number;
  symbol: string;
}

// Main Restaurant Type
export interface Restaurant {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: PlaceGeometry;
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  photos?: PlacePhoto[];
  types?: string[];
  opening_hours?: PlaceOpeningHours;
  formatted_phone_number?: string;
  international_phone_number?: string;
  website?: string;
  reviews?: PlaceReview[];
  business_status?: string;
  vicinity?: string;
}

// Cuisine Categories
export type CuisineType =
  | 'mexican'
  | 'italian'
  | 'burgers'
  | 'asian'
  | 'international'
  | 'cafe'
  | 'steakhouse'
  | 'seafood'
  | 'healthy'
  | 'bar'
  | 'fast_food'
  | 'regional';

export interface CuisineCategory {
  id: CuisineType;
  name: string;
  icon: string;
  color: string;
  searchTerms: string[];
}

// Search Filters
export interface SearchFilters {
  query?: string;
  location?: {
    lat: number;
    lng: number;
  };
  radius?: number; // in meters
  cuisine?: CuisineType;
  minRating?: number;
  priceLevel?: number[];
  openNow?: boolean;
  servesVegetarian?: boolean;
  servesVegan?: boolean;
  takeout?: boolean;
  delivery?: boolean;
  dineIn?: boolean;
  reservable?: boolean;
}

// UI State Types
export type ViewMode = 'list' | 'map';

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

// Service availability badges
export interface ServiceBadges {
  takeout: boolean;
  delivery: boolean;
  dineIn: boolean;
  reservable: boolean;
  vegetarian: boolean;
  vegan: boolean;
  wheelchair: boolean;
  wifi: boolean;
  parking: boolean;
  smokeFree: boolean;
}

// Favorite (prepared for Firebase)
export interface Favorite {
  placeId: string;
  savedAt: number;
  placeData: Restaurant;
}
