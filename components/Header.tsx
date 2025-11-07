import React from 'react';
import { CarIcon } from './IconComponents';

interface HeaderProps {
    isAuthenticated: boolean;
    isAdmin: boolean;
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
    onLogout: () => void;
    onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, isAdmin, setIsAdmin, onLogout, onLoginClick }) => {
  return (
    <header className="bg-brand-gray-dark border-b border-brand-gray-light shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
            <CarIcon className="h-8 w-8 text-brand-blue" />
            <h1 className="text-2xl font-bold ml-3 tracking-wider text-gray-100">LuxeDrive Rentals</h1>
        </div>
        
        <div className="flex items-center space-x-4">
            {isAuthenticated ? (
                <>
                    <button 
                        onClick={() => setIsAdmin(!isAdmin)}
                        className="text-sm font-medium bg-brand-gray px-3 py-2 rounded-md hover:bg-brand-gray-light transition-colors"
                    >
                        Switch to {isAdmin ? 'User View' : 'Admin View'}
                    </button>
                    <button 
                        onClick={onLogout}
                        className="text-sm font-medium text-white bg-red-600 px-3 py-2 rounded-md hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <button 
                    onClick={onLoginClick}
                    className="text-sm font-medium bg-brand-blue px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Admin Login
                </button>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;