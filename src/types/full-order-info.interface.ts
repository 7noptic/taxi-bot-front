import { Order } from 'src/types/order.interface';
import { Review } from 'src/types/review.interface';
import { Appeal } from 'src/types/appeal.interface';

export interface FullOrderInfo extends Order {
  reviews: Review[];
  appeals: Appeal[];
}
