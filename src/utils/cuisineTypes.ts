import { CuisineCategory } from '@/types/restaurant';

export const cuisineCategories: CuisineCategory[] = [
  {
    id: 'mexican',
    name: 'Cocina Mexicana',
    icon: '🌮',
    color: '#D97706',
    searchTerms: ['mexican restaurant', 'tacos', 'tortas', 'quesadillas', 'antojitos mexicanos'],
  },
  {
    id: 'italian',
    name: 'Italiana',
    icon: '🍕',
    color: '#DC2626',
    searchTerms: ['italian restaurant', 'pizza', 'pasta', 'pizzeria', 'trattoria'],
  },
  {
    id: 'burgers',
    name: 'Hamburguesas',
    icon: '🍔',
    color: '#CA8A04',
    searchTerms: ['burger restaurant', 'hamburguesas', 'hamburgers'],
  },
  {
    id: 'asian',
    name: 'Asiática',
    icon: '🍣',
    color: '#DB2777',
    searchTerms: ['asian restaurant', 'sushi', 'chinese food', 'japanese restaurant', 'thai food', 'ramen'],
  },
  {
    id: 'international',
    name: 'Internacional',
    icon: '🥙',
    color: '#7C3AED',
    searchTerms: ['international restaurant', 'mediterranean food', 'middle eastern', 'kebab', 'greek restaurant'],
  },
  {
    id: 'cafe',
    name: 'Cafeterías y Postres',
    icon: '☕',
    color: '#92400E',
    searchTerms: ['cafe', 'coffee shop', 'bakery', 'pastry', 'dessert', 'ice cream', 'cafeteria'],
  },
  {
    id: 'steakhouse',
    name: 'Carnes y Parrillas',
    icon: '🍖',
    color: '#B91C1C',
    searchTerms: ['steakhouse', 'bbq restaurant', 'grill', 'parrilla', 'carne asada', 'barbecue'],
  },
  {
    id: 'seafood',
    name: 'Mariscos',
    icon: '🌊',
    color: '#0891B2',
    searchTerms: ['seafood restaurant', 'mariscos', 'pescado', 'ceviche'],
  },
  {
    id: 'healthy',
    name: 'Saludable',
    icon: '🥗',
    color: '#16A34A',
    searchTerms: ['healthy restaurant', 'salad bar', 'juice bar', 'smoothie', 'vegetarian restaurant', 'vegan restaurant'],
  },
  {
    id: 'bar',
    name: 'Bares y Cantinas',
    icon: '🍺',
    color: '#EA580C',
    searchTerms: ['bar', 'pub', 'cantina', 'brewery', 'sports bar'],
  },
  {
    id: 'fast_food',
    name: 'Comida Rápida Regional',
    icon: '🌯',
    color: '#F59E0B',
    searchTerms: ['tortas', 'lonches', 'cemitas', 'pambazos', 'sandwich shop'],
  },
  {
    id: 'regional',
    name: 'Cocina Regional',
    icon: '🍜',
    color: '#BE123C',
    searchTerms: ['regional mexican restaurant', 'cocina yucateca', 'cocina oaxaqueña', 'cocina poblana'],
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
