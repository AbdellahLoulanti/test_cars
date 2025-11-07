/**
 * This is a simulated user service that acts as a mock database.
 * In a real-world application, these functions would query a database.
 */

import { AdminUser } from '../types';

// This array simulates a 'users' table in a database.
const users: AdminUser[] = [
  {
    id: '1',
    email: 'admin@luxedrive.com',
    password: 'admin123', // In a real DB, this would be a hashed password.
    role: 'admin',
  },
];

/**
 * Finds a user by their email address.
 * Simulates a `SELECT * FROM users WHERE email = ?` query.
 * @param email The email to search for.
 * @returns The user object if found, otherwise undefined.
 */
export const findUserByEmail = (email: string): AdminUser | undefined => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};
