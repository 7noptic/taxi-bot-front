import { City } from 'src/types/city.interface';
import { StatusDriver } from 'src/types/status-driver.enum';
import { AccessTypeOrder } from 'src/types/acess-type-order.enum';
import { BlockedType } from 'src/types/blocked-type.interface';

export interface Car {
  carBrand: string;

  carColor: string;

  carNumber: string;
}

export interface Driver {
  username: string;

  phone: string;

  chatId: number;

  first_name: string;

  last_name: string;

  city: City['name'];

  rating: number[];

  status: StatusDriver;

  accessOrderType: typeof AccessTypeOrder;

  commission: number;
  
  commissionExpiryDate: Date;

  priority: number;

  isBlocked: boolean;

  blockedType: BlockedType;

  isBusy: boolean;

  car: Car;
}
