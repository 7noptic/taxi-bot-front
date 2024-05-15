import { City } from 'src/types/city.interface';

export interface Passenger {
  username: string;
  phone: string;
  chatId: number;
  first_name: string;
  last_name: string;
  city: City['name'];
  rating: number[];
  isBlocked: boolean;
  address: Address[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  name: string;

  address: string;
}
