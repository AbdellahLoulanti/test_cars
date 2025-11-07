export type CarType = 'SUV' | 'Sedan' | 'Hatchback' | 'Coupe' | 'Convertible';
export type CarCategory = 'Luxury' | 'Sport' | 'Electric' | 'SUV';

export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  type: CarType;
  category: CarCategory;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Gasoline' | 'Electric' | 'Hybrid';
  pricePerDay: number;
  imageUrl: string;
  features: string[];
}

export interface FilterState {
  searchTerm: string;
  category: CarCategory | 'all';
  price: number;
}

export interface UserDetails {
    fullName: string;
    email: string;
    phone: string;
}

export interface Booking {
    id: string;
    carId: number;
    user: UserDetails;
    startDate: string;
    endDate: string;
    totalPrice: number;
    days: number;
}