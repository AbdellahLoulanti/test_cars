import React from 'react';
import { Booking } from '../types';
import { CloseIcon, CheckCircleIcon } from './IconComponents';

interface ConfirmationModalProps {
  bookingDetails: Booking;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ bookingDetails, onClose }) => {
  const { carId, user, days, totalPrice } = bookingDetails;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-brand-gray-dark rounded-xl shadow-2xl w-full max-w-md text-center p-8 transform scale-95 hover:scale-100 transition-transform duration-300 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <CloseIcon className="w-6 h-6" />
        </button>
        
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500 mb-4">
          <CheckCircleIcon className="h-10 w-10 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
        <p className="text-gray-400 mb-6">Thank you, {user.fullName.split(' ')[0]}. Your luxury experience awaits.</p>

        <div className="bg-brand-gray text-left p-4 rounded-lg mb-6 space-y-2">
            <p><strong className="text-gray-200">Renter:</strong> {user.fullName}</p>
            <p><strong className="text-gray-200">Email:</strong> {user.email}</p>
            <p><strong className="text-gray-200">Duration:</strong> {days} day(s)</p>
            <p><strong className="text-gray-200">Total Price:</strong> ${totalPrice}</p>
        </div>
        
        <button 
          onClick={onClose}
          className="w-full bg-brand-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Great!
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;