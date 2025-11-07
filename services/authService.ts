import { findUserByEmail } from './userService';

/**
 * This is a simulated authentication service.
 * In a real-world application, this function would make a network request 
 * to a secure backend server to validate user credentials.
 */

/**
 * Simulates a login request to a backend server.
 * @param email The user's email.
 * @param password The user's password.
 * @returns A promise that resolves on successful login and rejects on failure.
 */
export const login = (email: string, password: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Simulate network latency with a 1-second delay
    setTimeout(() => {
      const user = findUserByEmail(email);

      if (user && user.password === password) {
        // In a real app, the server would return a secure token here.
        resolve();
      } else {
        // The server would return an error for incorrect credentials.
        reject(new Error('Invalid credentials provided.'));
      }
    }, 1000);
  });
};
