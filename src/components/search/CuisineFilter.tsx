import { useState } from 'react';
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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 md:p-4 flex items-center justify-between hover:bg-sand-50 transition-colors"
      >
        <h3 className="font-semibold text-volcanic-800 flex items-center gap-2">
          <span>🍽️</span>
          <span className="text-sm md:text-base">Tipo de cocina</span>
          {selectedCuisine && (
            <span className="ml-2 px-2 py-0.5 bg-jade-100 text-jade-700 text-xs rounded-full">
              {cuisineCategories.find(c => c.id === selectedCuisine)?.name}
            </span>
          )}
        </h3>
        <span className="text-volcanic-600 md:hidden">
          {isExpanded ? '▲' : '▼'}
        </span>
      </button>

      {/* Mobile: Horizontal scroll when collapsed, Grid when expanded */}
      <div className="md:block">
        {/* Mobile view */}
        <div className="md:hidden">
          {!isExpanded ? (
            // Horizontal scroll (collapsed)
            <div className="flex gap-2 overflow-x-auto px-3 pb-3 scrollbar-hide">
              {cuisineCategories.map((cuisine) => {
                const isSelected = selectedCuisine === cuisine.id;
                return (
                  <button
                    key={cuisine.id}
                    onClick={() => onCuisineChange(isSelected ? undefined : cuisine.id)}
                    className={`flex-shrink-0 flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all min-w-[80px] ${
                      isSelected
                        ? 'border-jade bg-jade-50 shadow-md'
                        : 'border-volcanic-200 hover:border-jade-300 hover:bg-sand-50'
                    }`}
                  >
                    <span className="text-xl">{cuisine.icon}</span>
                    <span className="text-[10px] text-center font-medium text-volcanic-700 leading-tight">
                      {cuisine.name}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            // Grid (expanded)
            <div className="grid grid-cols-2 gap-2 p-3">
              {cuisineCategories.map((cuisine) => {
                const isSelected = selectedCuisine === cuisine.id;
                return (
                  <button
                    key={cuisine.id}
                    onClick={() => {
                      onCuisineChange(isSelected ? undefined : cuisine.id);
                      setIsExpanded(false); // Close after selection
                    }}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-lg border-2 transition-all ${
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
          )}
        </div>

        {/* Desktop view - Always grid */}
        <div className="hidden md:block p-4">
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
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
      </div>
    </div>
  );
};
