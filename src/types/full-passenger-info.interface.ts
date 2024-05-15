import { Passenger } from 'src/types/passenger.interface';
import { Order } from 'src/types/order.interface';
import { Review } from 'src/types/review.interface';

export interface FullPassengerInfo extends Passenger {
  reviewFrom: Review[];
  reviewTo: Review[];
  leftReview: number;
  receivedReview: number;
  countOrders: number;
  driveCount: number;
  deliveryCount: number;
  canceledCount: number;
  averageRating: number;
  orders: Order[];
}
