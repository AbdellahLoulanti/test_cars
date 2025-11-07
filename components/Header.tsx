import React from 'react';
import { CarIcon } from './IconComponents';

interface HeaderProps {
    isAdmin: boolean;
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ isAdmin, setIsAdmin }) => {
  return (
    <header className="bg-brand-gray-dark border-b border-brand-gray-light shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
            <CarIcon className="h-8 w-8 text-brand-blue" />
            <h1 className="text-2xl font-bold ml-3 tracking-wider text-gray-100">LuxeDrive Rentals</h1>
        </div>
        <div className="flex items-center space-x-3">
            <span className={`text-sm font-medium ${!isAdmin ? 'text-brand-blue' : 'text-gray-400'}`}>User</span>
            <label htmlFor="admin-toggle" className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="admin-toggle" className="sr-only peer" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
                <div className="w-11 h-6 bg-brand-gray-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
            </label>
            <span className={`text-sm font-medium ${isAdmin ? 'text-brand-blue' : 'text-gray-400'}`}>Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;