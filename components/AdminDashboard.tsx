import React, { useState, useMemo } from 'react';
import { Booking, Car } from '../types';
import { UsersIcon, CarIcon, StatsIcon, PlusIcon, EditIcon, DeleteIcon } from './IconComponents';

// --- Statistics View ---
const StatisticsView: React.FC<{ bookings: Booking[], cars: Car[] }> = ({ bookings, cars }) => {
    const totalRevenue = useMemo(() => 
        bookings.reduce((sum, booking) => sum + booking.totalPrice, 0),
        [bookings]
    );

    const mostPopularCar = useMemo(() => {
        if (bookings.length === 0) return 'N/A';
        const carCounts = bookings.reduce((acc, booking) => {
            acc[booking.carId] = (acc[booking.carId] || 0) + 1;
            return acc;
        }, {} as Record<number, number>);

        const popularCarId = Object.keys(carCounts).reduce((a, b) => carCounts[+a] > carCounts[+b] ? a : b);
        const car = cars.find(c => c.id === +popularCarId);
        return car ? `${car.make} ${car.model}` : 'N/A';
    }, [bookings, cars]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-brand-gray p-6 rounded-lg">
                <h3 className="text-gray-400 text-sm font-medium">Total Revenue</h3>
                <p className="text-3xl font-bold text-white mt-2">${totalRevenue.toLocaleString()}</p>
            </div>
             <div className="bg-brand-gray p-6 rounded-lg">
                <h3 className="text-gray-400 text-sm font-medium">Total Bookings</h3>
                <p className="text-3xl font-bold text-white mt-2">{bookings.length}</p>
            </div>
             <div className="bg-brand-gray p-6 rounded-lg">
                <h3 className="text-gray-400 text-sm font-medium">Most Popular Car</h3>
                <p className="text-3xl font-bold text-white mt-2">{mostPopularCar}</p>
            </div>
        </div>
    );
};


// --- Booking List View ---
const BookingListView: React.FC<{ bookings: Booking[], cars: Car[] }> = ({ bookings, cars }) => {
    const getCarById = (id: number) => cars.find(car => car.id === id);

    return (
        <div className="bg-brand-gray rounded-lg p-6">
            {bookings.length > 0 ? (
                 <div className="space-y-4">
                    {bookings.map(booking => {
                        const car = getCarById(booking.carId);
                        return (
                            <div key={booking.id} className="bg-brand-gray-dark p-4 rounded-lg flex flex-col md:flex-row gap-4 items-start">
                                <img src={car?.imageUrl} alt={car?.model} className="w-full md:w-40 h-auto rounded-md object-cover"/>
                                <div className="flex-grow">
                                    <h3 className="font-bold text-xl text-white">{car?.make} {car?.model}</h3>
                                    <p className="text-sm text-gray-400 mb-2">{car?.year} &bull; {car?.category}</p>
                                    <div className="border-t border-brand-gray-light my-2"></div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                        <div><strong className="font-semibold text-gray-300">Renter:</strong> {booking.user.fullName}</div>
                                        <div><strong className="font-semibold text-gray-300">Email:</strong> {booking.user.email}</div>
                                        <div><strong className="font-semibold text-gray-300">Start Date:</strong> {booking.startDate}</div>
                                        <div><strong className="font-semibold text-gray-300">End Date:</strong> {booking.endDate}</div>
                                        <div><strong className="font-semibold text-gray-300">Duration:</strong> {booking.days} Day(s)</div>
                                        <div><strong className="font-semibold text-gray-300">Total:</strong> ${booking.totalPrice}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                 </div>
            ) : (
                <p className="text-center text-gray-400 py-8">No bookings have been made yet.</p>
            )}
        </div>
    );
};

// --- Car Management View ---
const CarManagementView: React.FC<{ cars: Car[], onAddCar: () => void, onEditCar: (car: Car) => void, onDeleteCar: (carId: number) => void }> = ({ cars, onAddCar, onEditCar, onDeleteCar }) => {
    return (
        <div className="bg-brand-gray rounded-lg">
            <div className="flex justify-between items-center p-4 border-b border-brand-gray-light">
                <h3 className="text-xl font-semibold">Manage Car Fleet</h3>
                <button onClick={onAddCar} className="flex items-center gap-2 bg-brand-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                    <PlusIcon className="w-5 h-5" />
                    Add New Car
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-gray-400 uppercase bg-brand-gray-dark">
                        <tr>
                            <th scope="col" className="px-6 py-3">Car</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Price/Day</th>
                            <th scope="col" className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(car => (
                            <tr key={car.id} className="border-b border-brand-gray-light hover:bg-brand-gray-dark/50">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    {car.make} {car.model}
                                </th>
                                <td className="px-6 py-4">{car.category}</td>
                                <td className="px-6 py-4">${car.pricePerDay}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => onEditCar(car)} className="p-2 rounded-md hover:bg-brand-gray-light"><EditIcon className="w-5 h-5 text-yellow-400"/></button>
                                    <button onClick={() => onDeleteCar(car.id)} className="p-2 rounded-md hover:bg-brand-gray-light"><DeleteIcon className="w-5 h-5 text-red-500"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// --- Main Admin Dashboard Component ---
interface AdminDashboardProps {
    cars: Car[];
    bookings: Booking[];
    onAddCar: () => void;
    onEditCar: (car: Car) => void;
    onDeleteCar: (carId: number) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ cars, bookings, onAddCar, onEditCar, onDeleteCar }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'bookings' | 'cars'>('stats');

  const TabButton = ({ id, label, icon: Icon }: { id: 'stats' | 'bookings' | 'cars', label: string, icon: React.FC<any> }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        activeTab === id
          ? 'bg-brand-blue text-white'
          : 'text-gray-300 hover:bg-brand-gray-light'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
      <div className="flex space-x-2 p-2 bg-brand-gray rounded-lg self-start">
        <TabButton id="stats" label="Statistics" icon={StatsIcon} />
        <TabButton id="bookings" label={`Bookings (${bookings.length})`} icon={UsersIcon} />
        <TabButton id="cars" label={`Car Fleet (${cars.length})`} icon={CarIcon} />
      </div>
      <div>
        {activeTab === 'stats' && <StatisticsView bookings={bookings} cars={cars} />}
        {activeTab === 'bookings' && <BookingListView bookings={bookings} cars={cars} />}
        {activeTab === 'cars' && <CarManagementView cars={cars} onAddCar={onAddCar} onEditCar={onEditCar} onDeleteCar={onDeleteCar} />}
      </div>
    </div>
  );
};

export default AdminDashboard;