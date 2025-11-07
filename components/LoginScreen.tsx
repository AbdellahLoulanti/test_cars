import React, { useState } from 'react';
import { CarIcon, CloseIcon } from './IconComponents';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => boolean;
  onClose: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin(email, password);
    if (!success) {
      setError('Incorrect email or password. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
        <div className="relative w-full max-w-sm mx-auto bg-brand-gray rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-brand-gray-light">
                <CloseIcon className="w-6 h-6" />
            </button>
            <div className="px-6 py-8">
                <div className="flex justify-center mx-auto">
                    <CarIcon className="w-12 h-12 text-brand-blue" />
                </div>

                <h2 className="mt-1 text-3xl font-bold text-center text-white">LuxeDrive Rentals</h2>
                <p className="mt-1 text-center text-gray-400">Admin Access</p>

                <form onSubmit={handleSubmit}>
                    <div className="w-full mt-6 space-y-4">
                        <input
                            className="w-full px-4 py-2 text-gray-200 placeholder-gray-400 bg-brand-gray-light border border-transparent rounded-lg focus:ring-2 focus:ring-brand-blue focus:outline-none"
                            type="email"
                            placeholder="Email"
                            aria-label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            className="w-full px-4 py-2 text-gray-200 placeholder-gray-400 bg-brand-gray-light border border-transparent rounded-lg focus:ring-2 focus:ring-brand-blue focus:outline-none"
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-brand-blue rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                {error && <p className="mt-4 text-xs text-center text-red-400">{error}</p>}
            </div>
             <div className="flex items-center justify-center py-4 text-xs text-center bg-brand-gray-dark rounded-b-lg">
                <span className="text-gray-500">Hint: `admin@luxedrive.com` / `admin123`</span>
            </div>
        </div>
    </div>
  );
};

export default LoginScreen;