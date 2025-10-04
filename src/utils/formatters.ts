import { PRICE_LEVELS, DAYS_OF_WEEK } from './constants';

/**
 * Format distance from meters to readable string
 */
export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
};

/**
 * Get price level symbol and label
 */
export const getPriceLevel = (level?: number) => {
  if (level === undefined || level < 0 || level > 4) {
    return { symbol: 'N/A', label: 'No disponible' };
  }
  return PRICE_LEVELS[level];
};

/**
 * Format rating to one decimal
 */
export const formatRating = (rating?: number): string => {
  if (!rating) return 'N/A';
  return rating.toFixed(1);
};

/**
 * Get photo URL from Google Places Photo object
 */
export const getPhotoUrl = (photo: google.maps.places.PlacePhoto | any, maxWidth: number = 400): string => {
  if (photo && typeof photo.getUrl === 'function') {
    return photo.getUrl({ maxWidth });
  }
  // Fallback for placeholder
  return '/placeholder-restaurant.jpg';
};

/**
 * Format opening hours for display
 */
export const formatOpeningHours = (weekdayText?: string[]): string[] => {
  if (!weekdayText) return [];
  return weekdayText;
};

/**
 * Check if place is open now based on opening_hours
 * Note: open_now is deprecated, but we use it for list views
 * For accurate status, use PlacesService.getDetails() with isOpen()
 */
export const isOpenNow = (openingHours?: any): boolean => {
  if (!openingHours) return false;
  // Safely access open_now without triggering deprecation warning in types
  try {
    return openingHours.open_now ?? false;
  } catch {
    return false;
  }
};

/**
 * Format time from Google format (e.g., "1430" to "2:30 PM")
 */
export const formatTime = (time: string): string => {
  if (!time || time.length !== 4) return time;

  const hours = parseInt(time.substring(0, 2));
  const minutes = time.substring(2, 4);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${minutes} ${period}`;
};

/**
 * Get day name from day number (0 = Sunday)
 */
export const getDayName = (dayNumber: number): string => {
  if (dayNumber < 0 || dayNumber > 6) return '';
  return DAYS_OF_WEEK[dayNumber];
};

/**
 * Calculate distance between two coordinates using Haversine formula
 */
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

/**
 * Truncate text to specified length with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Format relative time (e.g., "2 days ago")
 */
export const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp * 1000; // Convert to milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `hace ${years} ${years === 1 ? 'año' : 'años'}`;
  if (months > 0) return `hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
  if (weeks > 0) return `hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
  if (days > 0) return `hace ${days} ${days === 1 ? 'día' : 'días'}`;
  if (hours > 0) return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  if (minutes > 0) return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  return 'hace un momento';
};

/**
 * Get initials from name for avatar
 */
export const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
