export enum StatusOrder {
  Created = 'created', // Создан, но не найден водитель
  Wait = 'wait', // Найден водитель и водитель в пути к пассажиру
  InProcess = 'inProcess', // Водитель везет пассажира
  Success = 'success', // Поездка успешно завершена
  CancelDriver = 'cancelDriver', // Поездка отменена водителем
  CancelPassenger = 'cancelPassenger', // Поездка отменена пассажиром
}

export const StatusOrderRus = {
  [StatusOrder.Created]: 'Создан', // Создан, но не найден водитель
  [StatusOrder.Wait]: 'Ожидание водителя', // Найден водитель и водитель в пути к пассажиру
  [StatusOrder.InProcess]: 'В процессе', // Водитель везет пассажира
  [StatusOrder.Success]: '✅ Завершено', // Поездка успешно завершена
  [StatusOrder.CancelDriver]: '❌ Отменено водителем', // Поездка отменена водителем
  [StatusOrder.CancelPassenger]: '❌ Отменено пассажиром', // Поездка отменена пассажиром
};
