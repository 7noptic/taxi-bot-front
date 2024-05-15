import { TypeOrder } from 'src/types/type-order.enum';

export enum AccessTypeOrder {
  // @ts-ignore
  DELIVERY = TypeOrder.DELIVERY,
  // @ts-ignore
  DRIVE = TypeOrder.DRIVE,
  ALL = 'all',
}

export const accessOrderTypeToRus = {
  [AccessTypeOrder.ALL]: 'Все заказы',
  [AccessTypeOrder.DRIVE]: 'Поездки',
  [AccessTypeOrder.DELIVERY]: 'Доставка',
};
