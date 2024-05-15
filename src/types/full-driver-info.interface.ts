import { Order } from 'src/types/order.interface';
import { Review } from 'src/types/review.interface';
import { Driver } from 'src/types/driver.interface';

export interface FullDriverInfo extends Driver {
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
