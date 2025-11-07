import React, { useState, useMemo } from 'react';
import { Car, Booking, UserDetails } from '../types';

interface BookingFormProps {
  car: Car;
  onBook: (car: Car, startDate: string, endDate: string, userDetails: UserDetails) => void;
  bookings: Booking[];
}

const BookingForm: React.FC<BookingFormProps> = ({ car, onBook, bookings }) => {
  const today = new Date();
  today.setHours(0,0,0,0);
  const todayString = today.toISOString().split('T')[0];
  
  const [startDate, setStartDate] = useState(todayString);
  const [endDate, setEndDate] = useState(todayString);
  
  const [userDetails, setUserDetails] = useState<UserDetails>({
    fullName: '',
    email: '',
    phone: '',
  });

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({...prev, [name]: value}));
  };

  const days = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) return 0;
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  }, [startDate, endDate]);

  const isAvailable = useMemo(() => {
    const start = new Date(startDate);
    start.setHours(0,0,0,0);
    const end = new Date(endDate);
    end.setHours(0,0,0,0);

    if (end < start) return false;

    const carBookings = bookings.filter(b => b.carId === car.id);

    return !carBookings.some(booking => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      // Overlap condition: (StartA <= EndB) and (EndA >= StartB)
      return start <= bookingEnd && end >= bookingStart;
    });
  }, [startDate, endDate, car.id, bookings]);

  const totalPrice = car.pricePerDay * days;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (days > 0 && isAvailable) {
      onBook(car, startDate, endDate, userDetails);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-brand-gray p-6 rounded-lg shadow-inner">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
          <input 
            type="date" 
            id="startDate" 
            value={startDate}
            min={todayString}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-brand-gray-light border-brand-gray-light rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-brand-blue focus:outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
          <input 
            type="date" 
            id="endDate" 
            value={endDate}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-brand-gray-light border-brand-gray-light rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-brand-blue focus:outline-none"
            required
          />
        </div>
      </div>
      
      <div>
        <h4 className="text-md font-semibold text-gray-200 mb-2">Your Information</h4>
        <div className="space-y-3">
          <input type="text" name="fullName" placeholder="Full Name" value={userDetails.fullName} onChange={handleUserInputChange} className="w-full bg-brand-gray-light border-brand-gray-light rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-brand-blue focus:outline-none" required />
          <input type="email" name="email" placeholder="Email Address" value={userDetails.email} onChange={handleUserInputChange} className="w-full bg-brand-gray-light border-brand-gray-light rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-brand-blue focus:outline-none" required />
          <input type="tel" name="phone" placeholder="Phone Number" value={userDetails.phone} onChange={handleUserInputChange} className="w-full bg-brand-gray-light border-brand-gray-light rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-brand-blue focus:outline-none" />
        </div>
      </div>

      {!isAvailable && days > 0 && (
          <div className="text-center text-yellow-400 bg-yellow-900/50 p-3 rounded-lg my-4 text-sm">
            This vehicle is unavailable for the selected dates.
          </div>
        )}

      <div className="bg-brand-gray-dark p-4 rounded-lg my-6">
        <div className="flex justify-between items-center text-gray-400 mb-2">
          <span>${car.pricePerDay} x {days} day(s)</span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between items-center text-white font-bold text-xl">
          <span>Total Price</span>
          <span>${totalPrice}</span>
        </div>
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-brand-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
        disabled={days <= 0 || !isAvailable || !userDetails.fullName || !userDetails.email}
      >
        {isAvailable ? 'Confirm Booking' : 'Unavailable'}
      </button>
    </form>
  );
};

export default BookingForm;