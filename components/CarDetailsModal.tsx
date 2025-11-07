import React, { useState, useEffect, useCallback } from 'react';
import { Car, UserDetails, Booking } from '../types';
import { generateCarDescription } from '../services/geminiService';
import { SeatIcon, TransmissionIcon, FuelIcon, CloseIcon, SparklesIcon } from './IconComponents';
import BookingForm from './BookingForm';

interface CarDetailsModalProps {
  car: Car;
  onClose: () => void;
  onBook: (car: Car, startDate: string, endDate: string, userDetails: UserDetails) => void;
  bookings: Booking[];
}

const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ car, onClose, onBook, bookings }) => {
  const [aiDescription, setAiDescription] = useState<string>('');
  const [isLoadingDescription, setIsLoadingDescription] = useState<boolean>(true);

  const fetchDescription = useCallback(async () => {
    setIsLoadingDescription(true);
    try {
      const description = await generateCarDescription(car);
      setAiDescription(description);
    } catch (error) {
      console.error('Failed to generate car description:', error);
      setAiDescription('Could not generate a description at this time. Please enjoy this premium vehicle.');
    } finally {
      setIsLoadingDescription(false);
    }
  }, [car]);

  useEffect(() => {
    fetchDescription();
  }, [fetchDescription]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity" onClick={onClose}>
      <div className="bg-brand-gray-dark rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform scale-95 hover:scale-100 transition-transform duration-300" onClick={(e) => e.stopPropagation()}>
        <div className="p-2 text-right">
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-brand-gray hover:bg-brand-gray-light">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-0 md:gap-8 px-8 pb-8">
          <div>
            <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="w-full h-auto object-cover rounded-lg shadow-lg mb-4" />
            <h2 className="text-3xl font-bold text-white mb-1">{car.make} {car.model}</h2>
            <p className="text-lg text-gray-400 mb-6">{car.year}</p>

            <div className="flex justify-around items-center text-gray-300 text-md bg-brand-gray p-4 rounded-lg mb-6">
                <span className="flex flex-col items-center"><SeatIcon className="w-6 h-6 mb-1 text-brand-blue"/>{car.seats} Seats</span>
                <span className="flex flex-col items-center"><TransmissionIcon className="w-6 h-6 mb-1 text-brand-blue"/>{car.transmission}</span>
                <span className="flex flex-col items-center"><FuelIcon className="w-6 h-6 mb-1 text-brand-blue"/>{car.fuelType}</span>
            </div>

            <div className="bg-brand-gray p-4 rounded-lg">
                <h4 className="font-semibold text-lg text-white mb-3 flex items-center">
                    <SparklesIcon className="w-5 h-5 mr-2 text-yellow-400" />
                    AI Description
                </h4>
                {isLoadingDescription ? (
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-brand-gray-light rounded w-full"></div>
                    <div className="h-4 bg-brand-gray-light rounded w-5/6"></div>
                  </div>
                ) : (
                  <p className="text-gray-300 leading-relaxed">{aiDescription}</p>
                )}
            </div>

          </div>
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">Rental Details</h3>
            <ul className="space-y-2 text-gray-300 mb-6">
                {car.features.map(feature => (
                    <li key={feature} className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        {feature}
                    </li>
                ))}
            </ul>
             <BookingForm car={car} onBook={onBook} bookings={bookings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsModal;