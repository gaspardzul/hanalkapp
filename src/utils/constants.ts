// Google Places API Types for food establishments
export const FOOD_ESTABLISHMENT_TYPES = [
  'restaurant',
  'cafe',
  'meal_delivery',
  'meal_takeaway',
  'bakery',
  'bar',
  'food',
];

// Price levels
export const PRICE_LEVELS = [
  { level: 0, symbol: 'Gratis', label: 'Gratis' },
  { level: 1, symbol: '$', label: 'Económico' },
  { level: 2, symbol: '$$', label: 'Moderado' },
  { level: 3, symbol: '$$$', label: 'Caro' },
  { level: 4, symbol: '$$$$', label: 'Muy caro' },
];

// Default search radius in meters
export const DEFAULT_SEARCH_RADIUS = 5000; // 5km
export const MAX_SEARCH_RADIUS = 50000; // 50km

// Map defaults
export const DEFAULT_MAP_CENTER = {
  lat: 19.4326, // Mexico City
  lng: -99.1332,
};

export const DEFAULT_MAP_ZOOM = 13;

// Rating stars
export const MAX_RATING = 5;

// Days of week (for opening hours)
export const DAYS_OF_WEEK = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

// Service badges configuration
export const SERVICE_BADGES = {
  takeout: { label: 'Para llevar', icon: '🚗' },
  delivery: { label: 'Delivery', icon: '🛵' },
  dineIn: { label: 'Comer aquí', icon: '🍽️' },
  reservable: { label: 'Reservaciones', icon: '📅' },
  vegetarian: { label: 'Vegetariano', icon: '🌱' },
  vegan: { label: 'Vegano', icon: '🥬' },
  wheelchair: { label: 'Accesible', icon: '♿' },
  wifi: { label: 'WiFi', icon: '📶' },
  parking: { label: 'Estacionamiento', icon: '🅿️' },
  smokeFree: { label: 'Libre de humo', icon: '🚭' },
};

// Cache duration in milliseconds
export const CACHE_DURATION = {
  PLACES: 1000 * 60 * 60 * 24, // 24 hours
  PHOTOS: 1000 * 60 * 60 * 24 * 7, // 7 days
  DETAILS: 1000 * 60 * 60 * 24, // 24 hours
};

// API limits
export const API_LIMITS = {
  MAX_RESULTS: 20,
  MAX_PHOTOS_PER_PLACE: 10,
  MAX_REVIEWS_DISPLAYED: 10,
};
