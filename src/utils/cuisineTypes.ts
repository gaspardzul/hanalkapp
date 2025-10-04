import { CuisineCategory } from '@/types/restaurant';

export const cuisineCategories: CuisineCategory[] = [
  {
    id: 'mexican',
    name: 'Cocina Mexicana',
    icon: '🌮',
    color: '#D97706',
    searchTerms: ['taco', 'torta', 'quesadilla', 'mexican', 'antojitos', 'tacos'],
  },
  {
    id: 'italian',
    name: 'Italiana',
    icon: '🍕',
    color: '#DC2626',
    searchTerms: ['pizza', 'pasta', 'italian', 'pizzeria', 'trattoria'],
  },
  {
    id: 'burgers',
    name: 'Hamburguesas',
    icon: '🍔',
    color: '#CA8A04',
    searchTerms: ['burger', 'hamburger', 'hamburguesa', 'fast food'],
  },
  {
    id: 'asian',
    name: 'Asiática',
    icon: '🍣',
    color: '#DB2777',
    searchTerms: ['sushi', 'chinese', 'japanese', 'thai', 'asian', 'ramen', 'noodles'],
  },
  {
    id: 'international',
    name: 'Internacional',
    icon: '🥙',
    color: '#7C3AED',
    searchTerms: ['mediterranean', 'middle eastern', 'kebab', 'falafel', 'greek'],
  },
  {
    id: 'cafe',
    name: 'Cafeterías y Postres',
    icon: '☕',
    color: '#92400E',
    searchTerms: ['cafe', 'coffee', 'bakery', 'pastry', 'dessert', 'ice cream', 'cafeteria'],
  },
  {
    id: 'steakhouse',
    name: 'Carnes y Parrillas',
    icon: '🍖',
    color: '#B91C1C',
    searchTerms: ['steakhouse', 'bbq', 'grill', 'parrilla', 'carne asada', 'barbecue'],
  },
  {
    id: 'seafood',
    name: 'Mariscos',
    icon: '🌊',
    color: '#0891B2',
    searchTerms: ['seafood', 'fish', 'mariscos', 'pescado', 'ceviche'],
  },
  {
    id: 'healthy',
    name: 'Saludable',
    icon: '🥗',
    color: '#16A34A',
    searchTerms: ['salad', 'healthy', 'bowl', 'juice', 'smoothie', 'vegetarian', 'ensalada'],
  },
  {
    id: 'bar',
    name: 'Bares y Cantinas',
    icon: '🍺',
    color: '#EA580C',
    searchTerms: ['bar', 'pub', 'cantina', 'brewery', 'cerveza', 'beer'],
  },
  {
    id: 'fast_food',
    name: 'Comida Rápida Regional',
    icon: '🌯',
    color: '#F59E0B',
    searchTerms: ['lonche', 'torta', 'cemita', 'pambazo', 'sandwich'],
  },
  {
    id: 'regional',
    name: 'Cocina Regional',
    icon: '🍜',
    color: '#BE123C',
    searchTerms: ['yucateca', 'oaxaqueña', 'poblana', 'veracruzana', 'regional mexican'],
  },
];

export const getCuisineById = (id: string): CuisineCategory | undefined => {
  return cuisineCategories.find((cuisine) => cuisine.id === id);
};

export const getCuisineBySearchTerm = (term: string): CuisineCategory | undefined => {
  const lowerTerm = term.toLowerCase();
  return cuisineCategories.find((cuisine) =>
    cuisine.searchTerms.some((searchTerm) => searchTerm.includes(lowerTerm))
  );
};
