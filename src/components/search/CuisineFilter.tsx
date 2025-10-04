import { CuisineType } from '@/types/restaurant';
import { cuisineCategories } from '@/utils/cuisineTypes';

interface CuisineFilterProps {
  selectedCuisine?: CuisineType;
  onCuisineChange: (cuisine?: CuisineType) => void;
}

export const CuisineFilter: React.FC<CuisineFilterProps> = ({
  selectedCuisine,
  onCuisineChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-semibold text-volcanic-800 mb-3 flex items-center gap-2">
        <span>🍽️</span>
        Tipo de cocina
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {cuisineCategories.map((cuisine) => {
          const isSelected = selectedCuisine === cuisine.id;

          return (
            <button
              key={cuisine.id}
              onClick={() => onCuisineChange(isSelected ? undefined : cuisine.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-jade bg-jade-50 shadow-md'
                  : 'border-volcanic-200 hover:border-jade-300 hover:bg-sand-50'
              }`}
            >
              <span className="text-2xl">{cuisine.icon}</span>
              <span className="text-xs text-center font-medium text-volcanic-700">
                {cuisine.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
