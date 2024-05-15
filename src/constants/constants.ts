import { QTableColumn } from 'quasar';
import { TypeOrder, TypeOrderRus } from 'src/types/type-order.enum';
import { StatusOrder, StatusOrderRus } from 'src/types/status-order.enum';
import { StatusAppeal, StatusAppealRus } from 'src/types/status.appeal.enum';

export const columnsTableOrder = <QTableColumn[]>[
  {
    name: 'createdAt',
    label: 'Дата создания',
    align: 'left',
    field: 'createdAt',
    format: (value) => new Date(value).toLocaleString(),
    sortable: false,
  },
  {
    name: '_id',
    label: '',
    align: 'left',
    field: '_id',
  },
  {
    name: 'numberOrder',
    label: 'Номер заказа',
    align: 'left',
    field: 'numberOrder',
    format: (value: string) => value.split('-')[1],
    sortable: false,
  },
  {
    name: 'TypeOrder',
    label: 'Тип заказа',
    align: 'left',
    field: 'type',
    format: (value: TypeOrder) => TypeOrderRus[value],
    sortable: false,
  },
  // {
  //   name: 'addressFrom',
  //   align: 'center',
  //   label: 'Откуда',
  //   field: 'addressFrom',
  //   sortable: false,
  // },
  // {
  //   name: 'addressTo',
  //   align: 'center',
  //   label: 'Куда',
  //   field: 'addressTo',
  //   sortable: false,
  // },
  // {
  //   name: 'comment',
  //   align: 'center',
  //   label: 'Комментарий',
  //   field: 'comment',
  //   sortable: false,
  // },
  {
    name: 'price',
    align: 'center',
    label: 'Цена',
    field: 'price',
    sortable: false,
  },
  {
    name: 'status',
    align: 'center',
    label: 'Статус',
    field: 'status',
    format: (value: StatusOrder) => StatusOrderRus[value],
    sortable: false,
  },
  {
    name: 'passengerId',
    align: 'center',
    label: 'Id пассажира',
    field: 'passengerId',
    sortable: false,
  },
  {
    name: 'driverId',
    align: 'center',
    label: 'Id водителя',
    field: 'driverId',
    sortable: false,
  },
  {
    name: 'city',
    align: 'center',
    label: 'Город',
    field: 'city',
    sortable: false,
  },
  {
    name: 'commission',
    align: 'center',
    label: 'Коммися (руб.)',
    field: 'commission',
    sortable: false,
  },
];
export const columnsTablePassenger = <QTableColumn[]>[
  {
    name: 'chatId',

    label: 'ID',
    align: 'left',
    field: 'chatId',
    sortable: false,
  },
  {
    name: 'name',

    label: 'Имя',
    align: 'left',
    field: 'first_name',
    sortable: false,
  },
  {
    name: 'username',
    align: 'center',
    label: 'username',
    field: 'username',
    sortable: false,
  },
  {
    name: 'phone',
    align: 'center',
    label: 'Телефон',
    field: 'phone',
    sortable: false,
  },
  {
    name: 'city',
    align: 'center',
    label: 'Город',
    field: 'city',
    sortable: false,
  },
  {
    name: 'rating',
    align: 'center',
    label: 'Рейтинг',
    field: 'rating',
    sortable: false,
    format: (rating: number[] | number) =>
      Array.isArray(rating)
        ? (rating.reduce((curr, acc) => acc + curr, 0) / rating.length)
            .toFixed(2)
            .toString()
        : rating,
  },
];

export const columnsTableAppeal = <QTableColumn[]>[
  {
    name: 'numberAppeal',
    label: 'Номер обращения',
    align: 'left',
    field: 'numberAppeal',
    sortable: false,
    format: (value: string) => value?.split('-')[1],
  },
  {
    name: 'status',
    align: 'center',
    label: 'Статус',
    field: 'status',
    sortable: false,
    format: (statusAppeal: StatusAppeal) => StatusAppealRus[statusAppeal],
  },
];

export const columnsTableDriver = <QTableColumn[]>[
  {
    name: 'chatId',

    label: 'ID',
    align: 'left',
    field: 'chatId',
    sortable: false,
  },
  {
    name: 'name',
    label: 'Имя',
    align: 'left',
    field: 'first_name',
    sortable: false,
  },
  {
    name: 'username',
    align: 'center',
    label: 'username',
    field: 'username',
    sortable: false,
  },
  {
    name: 'phone',
    align: 'center',
    label: 'Телефон',
    field: 'phone',
    sortable: false,
  },
  {
    name: 'city',
    align: 'center',
    label: 'Город',
    field: 'city',
    sortable: false,
  },
  {
    name: 'priority',
    align: 'center',
    label: 'Приоритет',
    field: 'priority',
    sortable: false,
  },
  {
    name: 'rating',
    align: 'center',
    label: 'Рейтинг',
    field: 'rating',
    sortable: false,
    format: (rating: number[] | number) =>
      Array.isArray(rating)
        ? (rating.reduce((curr, acc) => acc + curr, 0) / rating.length)
            .toFixed(2)
            .toString()
        : rating,
  },
];

export const columnsTableCity = <QTableColumn[]>[
  {
    name: '_id',
    label: '_id',
    align: 'left',
    field: '_id',
  },
  {
    name: 'name',
    label: 'Название',
    align: 'left',
    field: 'name',
  },
  {
    name: 'minPrice',
    align: 'center',
    label: 'Минимальная цена',
    field: 'minPrice',
    sortable: false,
  },
  {
    name: 'delete',
    align: 'center',
    label: 'Удалить',
    field: 'delete',
    sortable: false,
  },
];

export const columnsTableAdmin = <QTableColumn[]>[
  {
    name: '_id',
    label: '_id',
    align: 'left',
    field: '_id',
  },
  {
    name: 'name',
    label: 'Имя',
    align: 'left',
    field: 'name',
  },
  {
    name: 'email',
    align: 'center',
    label: 'email',
    field: 'email',
    sortable: false,
  },
  {
    name: 'delete',
    align: 'center',
    label: 'Удалить',
    field: 'delete',
    sortable: false,
  },
];
