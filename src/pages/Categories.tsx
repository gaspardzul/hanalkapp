import { useNavigate } from 'react-router-dom';
import { cuisineCategories } from '@/utils/cuisineTypes';
import { Card } from '@/components/common';
import { useGeolocation } from '@/hooks/useGeolocation';

export const Categories: React.FC = () => {
  const navigate = useNavigate();
  const { latitude, longitude } = useGeolocation();

  const handleCuisineClick = (cuisineId: string) => {
    const cuisine = cuisineCategories.find((c) => c.id === cuisineId);
    if (cuisine) {
      const params = new URLSearchParams();
      params.set('q', cuisine.searchTerms[0]);
      params.set('cuisine', cuisineId);
      if (latitude && longitude) {
        params.set('lat', latitude.toString());
        params.set('lng', longitude.toString());
      }
      navigate(`/search?${params.toString()}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-volcanic-800 mb-2">
          Explora por Categorías
        </h1>
        <p className="text-volcanic-600">
          Encuentra el tipo de comida que se te antoja
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cuisineCategories.map((cuisine) => (
          <Card
            key={cuisine.id}
            hover
            className="cursor-pointer"
            onClick={() => handleCuisineClick(cuisine.id)}
          >
            <div className="text-center">
              <div
                className="text-6xl mb-4 p-4 rounded-full inline-block"
                style={{ backgroundColor: `${cuisine.color}15` }}
              >
                {cuisine.icon}
              </div>
              <h3 className="font-semibold text-xl text-volcanic-800 mb-2">
                {cuisine.name}
              </h3>
              <p className="text-sm text-volcanic-600">
                {cuisine.searchTerms.slice(0, 3).join(', ')}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
