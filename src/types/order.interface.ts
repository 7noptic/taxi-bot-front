import { City } from 'src/types/city.interface';
import { Driver } from 'src/types/driver.interface';
import { Passenger } from 'src/types/passenger.interface';
import { TypeOrder } from 'src/types/type-order.enum';
import { StatusOrder } from 'src/types/status-order.enum';

export interface Order {
  numberOrder: string;

  type: TypeOrder;

  addressFrom: string;

  addressTo: string;

  comment: string;

  price: number;

  status: StatusOrder;

  passengerId: Passenger['chatId'];

  driverId: Driver['chatId'];

  city: City['name'];

  submissionTime: number;

  commission: number;
}
