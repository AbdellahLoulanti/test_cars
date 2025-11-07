import React, { useState, useMemo, useEffect } from 'react';
import { Car, FilterState, UserDetails, Booking } from './types';
import { useCars } from './hooks/useCars';
import Header from './components/Header';
import CarList from './components/CarList';
import CarDetailsModal from './components/CarDetailsModal';
import ConfirmationModal from './components/ConfirmationModal';
import AdminDashboard from './components/AdminDashboard';
import LoginScreen from './components/LoginScreen';
import CarFormModal from './components/CarFormModal';
import { login } from './services/authService';

export default function App() {
  const { cars: initialCars } = useCars();
  const [cars, setCars] = useState<Car[]>(initialCars);

  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    category: 'all',
    price: 1000,
  });
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<Booking | null>(null);

  // --- Auth & Admin State ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // --- Car Form Modal State ---
  const [isCarFormModalOpen, setCarFormModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  useEffect(() => {
    // If user logs out, ensure they are not in admin view
    if (!isAuthenticated) {
      setIsAdmin(false);
    }
  }, [isAuthenticated]);


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
  
  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      setIsAuthenticated(true);
      setIsAdmin(true);
      setLoginModalOpen(false);
    } catch (error) {
      // The error will be caught and displayed by the LoginScreen component.
      // We re-throw it so the LoginScreen knows the login failed.
      throw error;
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
  };
  
  // --- CAR CRUD ---
  const handleAddCar = (newCarData: Omit<Car, 'id'>) => {
    const newCar = { ...newCarData, id: Date.now() }; // Simple unique ID
    setCars(prevCars => [newCar, ...prevCars]);
  };
  
  const handleUpdateCar = (updatedCar: Car) => {
    setCars(prevCars => prevCars.map(car => car.id === updatedCar.id ? updatedCar : car));
  };
  
  const handleDeleteCar = (carId: number) => {
    setCars(prevCars => prevCars.filter(car => car.id !== carId));
  };
  
  const openCarFormModal = (car: Car | null) => {
    setEditingCar(car);
    setCarFormModalOpen(true);
  };
  
  const closeCarFormModal = () => {
    setEditingCar(null);
    setCarFormModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-brand-dark font-sans">
      <Header 
        isAdmin={isAdmin} 
        setIsAdmin={setIsAdmin} 
        onLogout={handleLogout} 
        isAuthenticated={isAuthenticated} 
        onLoginClick={() => setLoginModalOpen(true)}
      />
      <main className="container mx-auto px-4 py-8">
        {isAdmin ? (
          <AdminDashboard 
            cars={cars} 
            bookings={bookings} 
            onAddCar={() => openCarFormModal(null)}
            onEditCar={openCarFormModal}
            onDeleteCar={handleDeleteCar}
          />
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
      
      {isLoginModalOpen && <LoginScreen onLogin={handleLogin} onClose={() => setLoginModalOpen(false)} />}

      {selectedCar && (
        <CarDetailsModal
          car={selectedCar}
          onClose={handleCloseModal}
          onBook={handleBooking}
          bookings={bookings}
        />
      )}

      {isCarFormModalOpen && (
        <CarFormModal 
          car={editingCar}
          onClose={closeCarFormModal}
          onSave={editingCar ? handleUpdateCar : handleAddCar}
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
