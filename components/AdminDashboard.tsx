import React, { useState } from 'react';
import { Booking, Car } from '../types';
import { UsersIcon, CarIcon } from './IconComponents';

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

const CarManagementView: React.FC<{ cars: Car[] }> = ({ cars }) => {
    return (
        <div className="bg-brand-gray rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cars.map(car => (
                    <div key={car.id} className="bg-brand-gray-dark p-4 rounded-lg">
                        <h4 className="font-bold text-lg text-white">{car.make} {car.model}</h4>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">{car.category}</p>
                        <p className="text-brand-blue font-semibold mt-2">${car.pricePerDay}/day</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const AdminDashboard: React.FC<{ cars: Car[], bookings: Booking[] }> = ({ cars, bookings }) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'cars'>('bookings');

  const TabButton = ({ id, label, icon: Icon }: { id: 'bookings' | 'cars', label: string, icon: React.FC<any> }) => (
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
        <TabButton id="bookings" label={`Bookings (${bookings.length})`} icon={UsersIcon} />
        <TabButton id="cars" label={`Car Fleet (${cars.length})`} icon={CarIcon} />
      </div>
      <div>
        {activeTab === 'bookings' && <BookingListView bookings={bookings} cars={cars} />}
        {activeTab === 'cars' && <CarManagementView cars={cars} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
