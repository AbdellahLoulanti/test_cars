import React, { useMemo, useState, useEffect } from 'react';
import { Car, FilterState, CarCategory } from '../types';
import CarCard from './CarCard';
import FilterSidebar from './FilterSidebar';

interface CarListProps {
  cars: Car[];
  allCars: Car[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onSelectCar: (car: Car) => void;
}

const CarList: React.FC<CarListProps> = ({ cars, allCars, filters, setFilters, onSelectCar }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide sidebar after scrolling down a bit (e.g., 100px)
      setIsSidebarVisible(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const categories = useMemo(() => {
    // Use allCars to get all possible categories, even if they are filtered out
    const uniqueCategories = [...new Set(allCars.map(car => car.category))];
    const orderedCategories: CarCategory[] = ['Luxury', 'Sport', 'Electric', 'SUV'];
    // Filter and order based on our predefined list
    return orderedCategories.filter(cat => uniqueCategories.includes(cat));
  }, [allCars]);

  const carsByCategory = (category: CarCategory) => {
    return cars.filter(car => car.category === category);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <FilterSidebar filters={filters} setFilters={setFilters} isVisible={isSidebarVisible} />
      <div className="flex-grow transition-all duration-500">
        {cars.length > 0 ? (
          <div className="space-y-12">
            {categories.map(category => {
              const categoryCars = carsByCategory(category);
              if (categoryCars.length === 0) return null;
              return (
                <section key={category}>
                  <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-brand-blue pl-4">{category} Cars</h2>
                  <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-6">
                    {categoryCars.map(car => (
                      <CarCard key={car.id} car={car} onSelectCar={onSelectCar} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 bg-brand-gray rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-400">No Cars Found</h2>
            <p className="text-gray-500 mt-2">Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarList;