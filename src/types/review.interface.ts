import { Order } from 'src/types/order.interface';

export interface Review {
  from: number;

  to: number;

  orderId: Order['numberOrder'];

  text: string;
  createdAt: Date;
  updatedAt: Date;
}
