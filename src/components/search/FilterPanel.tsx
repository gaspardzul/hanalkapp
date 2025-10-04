import { useState } from 'react';
import { SearchFilters } from '@/types/restaurant';
import { Button, Badge } from '@/components/common';
import { PRICE_LEVELS } from '@/utils/constants';

interface FilterPanelProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceLevelToggle = (level: number) => {
    const currentLevels = filters.priceLevel || [];
    const newLevels = currentLevels.includes(level)
      ? currentLevels.filter((l) => l !== level)
      : [...currentLevels, level];

    onFiltersChange({ ...filters, priceLevel: newLevels });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({ ...filters, minRating: rating });
  };

  const clearFilters = () => {
    onFiltersChange({
      query: filters.query,
      location: filters.location,
    });
  };

  const activeFiltersCount = [
    filters.priceLevel?.length,
    filters.minRating,
    filters.openNow,
    filters.takeout,
    filters.delivery,
  ].filter(Boolean).length;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-volcanic-800 flex items-center gap-2">
          <span>🔧</span>
          Filtros
          {activeFiltersCount > 0 && (
            <Badge variant="info" size="sm">
              {activeFiltersCount}
            </Badge>
          )}
        </h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-jade"
        >
          {isOpen ? '▲' : '▼'}
        </button>
      </div>

      <div className={`space-y-4 ${isOpen ? 'block' : 'hidden md:block'}`}>
        {/* Price Level */}
        <div>
          <label className="block text-sm font-medium text-volcanic-700 mb-2">
            Rango de precio
          </label>
          <div className="flex flex-wrap gap-2">
            {PRICE_LEVELS.slice(1).map((price) => (
              <button
                key={price.level}
                onClick={() => handlePriceLevelToggle(price.level)}
                className={`px-3 py-1 rounded-full border-2 transition-colors ${
                  filters.priceLevel?.includes(price.level)
                    ? 'border-jade bg-jade text-white'
                    : 'border-volcanic-300 text-volcanic-700 hover:border-jade'
                }`}
              >
                {price.symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Minimum Rating */}
        <div>
          <label className="block text-sm font-medium text-volcanic-700 mb-2">
            Calificación mínima
          </label>
          <div className="flex gap-2">
            {[3, 3.5, 4, 4.5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`px-3 py-1 rounded-full border-2 transition-colors ${
                  filters.minRating === rating
                    ? 'border-jade bg-jade text-white'
                    : 'border-volcanic-300 text-volcanic-700 hover:border-jade'
                }`}
              >
                {rating}★
              </button>
            ))}
          </div>
        </div>

        {/* Quick Filters */}
        <div>
          <label className="block text-sm font-medium text-volcanic-700 mb-2">
            Opciones
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.openNow || false}
                onChange={(e) =>
                  onFiltersChange({ ...filters, openNow: e.target.checked })
                }
                className="rounded text-jade focus:ring-jade"
              />
              <span className="text-sm text-volcanic-700">Abierto ahora</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.delivery || false}
                onChange={(e) =>
                  onFiltersChange({ ...filters, delivery: e.target.checked })
                }
                className="rounded text-jade focus:ring-jade"
              />
              <span className="text-sm text-volcanic-700">Delivery</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.takeout || false}
                onChange={(e) =>
                  onFiltersChange({ ...filters, takeout: e.target.checked })
                }
                className="rounded text-jade focus:ring-jade"
              />
              <span className="text-sm text-volcanic-700">Para llevar</span>
            </label>
          </div>
        </div>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={clearFilters}
          >
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  );
};
