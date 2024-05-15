import { Passenger } from 'src/types/passenger.interface';
import { Driver } from 'src/types/driver.interface';
import { Message } from 'src/types/message.interface';
import { StatusAppeal } from 'src/types/status.appeal.enum';

export interface Appeal {
  _id: string;
  messages: Message[];

  numberAppeal: string;

  numberOrder: string;

  status: StatusAppeal;

  from: Passenger['chatId'] | Driver['chatId'];
}
