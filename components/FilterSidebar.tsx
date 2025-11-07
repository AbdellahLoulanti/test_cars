import React from 'react';
import { FilterState, CarCategory } from '../types';
import { SearchIcon, CarTypeIcon, PriceIcon } from './IconComponents';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isVisible: boolean;
}

const carCategories: (CarCategory | 'all')[] = ['all', 'Luxury', 'Sport', 'Electric', 'SUV'];

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, isVisible }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleCategoryChange = (category: CarCategory | 'all') => {
    setFilters((prev) => ({ ...prev, category }));
  };

  return (
    <aside className={`
      lg:w-72 xl:w-80 flex-shrink-0 bg-brand-gray rounded-lg p-6 space-y-8 self-start top-24 sticky
      transform transition-all duration-500 ease-in-out
      ${isVisible 
        ? 'opacity-100 translate-x-0' 
        : 'opacity-0 -translate-x-full w-0 p-0 overflow-hidden'
      }
    `}>
      <div>
        <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
          <SearchIcon className="w-5 h-5 mr-2 text-brand-blue" />
          Search
        </h3>
        <input
          type="text"
          name="searchTerm"
          placeholder="e.g., Porsche 911"
          value={filters.searchTerm}
          onChange={handleInputChange}
          className="w-full bg-brand-gray-light border border-brand-gray-light rounded-md px-4 py-2 text-gray-200 focus:ring-2 focus:ring-brand-blue focus:outline-none transition"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
          <CarTypeIcon className="w-5 h-5 mr-2 text-brand-blue" />
          Category
        </h3>
        <div className="flex flex-wrap gap-2">
          {carCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full capitalize transition ${
                filters.category === category
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'bg-brand-gray-light text-gray-300 hover:bg-brand-gray-light/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
          <PriceIcon className="w-5 h-5 mr-2 text-brand-blue" />
          Max Price
        </h3>
        <div className="flex flex-col">
          <input
            type="range"
            name="price"
            min="100"
            max="1000"
            step="50"
            value={filters.price}
            onChange={handleInputChange}
            className="w-full h-2 bg-brand-gray-light rounded-lg appearance-none cursor-pointer accent-brand-blue"
          />
          <div className="text-center text-gray-300 font-medium mt-2">
            Up to ${filters.price} / day
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;