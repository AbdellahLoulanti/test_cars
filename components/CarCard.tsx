
import React from 'react';
import { Car } from '../types';
import { SeatIcon, TransmissionIcon, FuelIcon } from './IconComponents';

interface CarCardProps {
  car: Car;
  onSelectCar: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onSelectCar }) => {
  return (
    <div 
      className="bg-brand-gray rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-brand-blue/20 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col"
      onClick={() => onSelectCar(car)}
    >
      <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="w-full h-56 object-cover" />
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-gray-100">{car.make} {car.model}</h3>
          <p className="text-sm text-gray-400 mb-4">{car.year} &bull; {car.type}</p>
          <div className="flex justify-between items-center text-gray-300 text-sm mb-4">
            <span className="flex items-center"><SeatIcon className="w-5 h-5 mr-1.5 text-brand-blue"/>{car.seats} Seats</span>
            <span className="flex items-center"><TransmissionIcon className="w-5 h-5 mr-1.5 text-brand-blue"/>{car.transmission}</span>
            <span className="flex items-center"><FuelIcon className="w-5 h-5 mr-1.5 text-brand-blue"/>{car.fuelType}</span>
          </div>
        </div>
        <div className="border-t border-brand-gray-light my-4"></div>
        <div className="flex justify-between items-center mt-auto">
          <div>
            <span className="text-3xl font-bold text-white">${car.pricePerDay}</span>
            <span className="text-gray-400">/day</span>
          </div>
          <button className="bg-brand-blue text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
