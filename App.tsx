import React, { useState, useMemo } from 'react';
import { Car, FilterState, UserDetails, Booking } from './types';
import { useCars } from './hooks/useCars';
import Header from './components/Header';
import CarList from './components/CarList';
import CarDetailsModal from './components/CarDetailsModal';
import ConfirmationModal from './components/ConfirmationModal';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const { cars } = useCars();
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    category: 'all',
    price: 1000,
  });
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<Booking | null>(null);

  // New state for admin mode and bookings list
  const [isAdmin, setIsAdmin] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const searchTermMatch =
        car.make.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const categoryMatch = filters.category === 'all' || car.category === filters.category;
      const priceMatch = car.pricePerDay <= filters.price;
      return searchTermMatch && categoryMatch && priceMatch;
    });
  }, [cars, filters]);

  const handleSelectCar = (car: Car) => {
    setSelectedCar(car);
  };

  const handleCloseModal = () => {
    setSelectedCar(null);
  };

  const handleBooking = (car: Car, startDate: string, endDate: string, userDetails: UserDetails) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    const total = days * car.pricePerDay;

    const newBooking: Booking = {
      id: crypto.randomUUID(),
      carId: car.id,
      user: userDetails,
      startDate,
      endDate,
      totalPrice: total,
      days,
    };

    setBookings(prevBookings => [...prevBookings, newBooking]);
    setBookingDetails(newBooking);
    setSelectedCar(null); // Close details modal
    setConfirmationVisible(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationVisible(false);
    setBookingDetails(null);
  };

  return (
    <div className="min-h-screen bg-brand-dark font-sans">
      <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <main className="container mx-auto px-4 py-8">
        {isAdmin ? (
          <AdminDashboard cars={cars} bookings={bookings} />
        ) : (
          <CarList
            cars={filteredCars}
            allCars={cars}
            filters={filters}
            setFilters={setFilters}
            onSelectCar={handleSelectCar}
          />
        )}
      </main>
      {selectedCar && (
        <CarDetailsModal
          car={selectedCar}
          onClose={handleCloseModal}
          onBook={handleBooking}
          bookings={bookings}
        />
      )}
      {isConfirmationVisible && bookingDetails && (
        <ConfirmationModal
          bookingDetails={bookingDetails}
          onClose={handleCloseConfirmation}
        />
      )}
    </div>
  );
}