import { api } from 'boot/axios';
import { LoginDto } from 'src/plugins/dto/login.dto';
import { Passenger } from 'src/types/passenger.interface';
import { QueryType } from 'src/types/query.type';
import { Driver } from 'src/types/driver.interface';
import { SendMessageDto } from 'src/plugins/dto/send-message.dto';
import { Settings } from 'src/types/settings.interface';
import { City } from 'src/types/city.interface';
import useUser from 'stores/user';
import { storeToRefs } from 'pinia';
import { Admin } from 'src/types/admin.interface';

const authStore = useUser();
const { access_token } = storeToRefs(authStore);
export const $API = {
  /***************************** PASSENGER *****************************/
  getAllPassengers: function <S, F>(promiseFuncSuccess: S, promiseFuncFail: F) {
    this.request(
      'post',
      'passenger/all',
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  getPassengers: function <S, F>(
    data: QueryType,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'get',
      `passenger/getLimitOrder/${data.currentPage}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  getFullPassengerInfo: function <S, F>(
    chatId: number,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'get',
      `passenger/${chatId}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  findPassengerByChatId: function <S, F>(
    chatId: string,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'get',
      `passenger/byChatId/${chatId}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  updatePassenger: function <S, F>(
    chatId: number,
    dto: Partial<Passenger>,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'patch',
      `passenger/${chatId}`,
      dto,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },
  /***************************** Driver *****************************/
  getAllDrivers: function <S, F>(promiseFuncSuccess: S, promiseFuncFail: F) {
    this.request(
      'post',
      'driver/all',
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },
  getDrivers: function <S, F>(
    data: QueryType,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'get',
      `driver/getLimitOrder/${data.currentPage}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  findDriverByChatId: function <S, F>(
    chatId: string,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'get',
      `driver/byChatId/${chatId}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  getFullDriverInfo: function <S, F>(
    chatId: number,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'get',
      `driver/${chatId}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  updateDriver: function <S, F>(
    chatId: number,
    dto: Partial<Driver>,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'patch',
      `driver/${chatId}`,
      dto,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },
  /***************************** Appeal *****************************/
  getAllAppeals: function <S, F>(promiseFuncSuccess: S, promiseFuncFail: F) {
    this.request(
      'post',
      'appeal/all',
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },
  getAppeals: function <S, F>(
    data: QueryType,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'get',
      `appeal/getLimitOrder/${data.currentPage}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  findByNumberAppeal: function <S, F>(
    orderAppeal: string,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'get',
      `appeal/findByNumberAppeal/${orderAppeal}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  sendMessage: function <S, F>(
    id: string,
    dto: SendMessageDto,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'post',
      `appeal/sendMessage/${id}`,
      dto,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },
  closeAppealByChatId: function <S, F>(
    chatId: number,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'patch',
      `appeal/close/${chatId}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  /***************************** Order *****************************/
  getOrders: function <S, F>(
    data: QueryType,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'get',
      `order/getLimitOrder/${data.currentPage}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  getAllOrders: function <S, F>(promiseFuncSuccess: S, promiseFuncFail: F) {
    this.request(
      'post',
      'order/all',
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  findByNumberOrder: function <S, F>(
    orderNumber: string,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'get',
      `order/findByNumberOrder/${orderNumber}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  getFullOrderInfo: function <S, F>(
    orderId: string,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'get',
      `order/fullInfo/${orderId}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  /***************************** admin *****************************/
  getAdmins: function <S, F>(
    data: QueryType,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'get',
      `admin/getLimitOrder/${data.currentPage}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  addAdmin: function <S, F>(
    dto: Admin & { password: string },
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'post',
      'admin/create',
      dto,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  deleteAdminById: function <S, F>(
    id: string,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'delete',
      `admin/byId/${id}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  updateAdminById: function <S, F>(
    id: string,
    dto: Partial<City>,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'patch',
      `admin/byId/${id}`,
      dto,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  getAllAdmins: function <S, F>(promiseFuncSuccess: S, promiseFuncFail: F) {
    this.request(
      'post',
      'admin/all',
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  findAdminByName: function <S, F>(
    name: string,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'get',
      `admin/findByName/${name}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  /***************************** Города *****************************/
  getCities: function <S, F>(
    data: QueryType,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'get',
      `city/getLimitOrder/${data.currentPage}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  addCity: function <S, F>(
    dto: City,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'post',
      'city/create',
      dto,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  deleteCityById: function <S, F>(
    id: string,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'delete',
      `city/byId/${id}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  updateCityById: function <S, F>(
    id: string,
    dto: Partial<City>,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'patch',
      `city/byId/${id}`,
      dto,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  getAllCities: function <S, F>(promiseFuncSuccess: S, promiseFuncFail: F) {
    this.request(
      'post',
      'city/all',
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  findCityByName: function <S, F>(
    name: string,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'get',
      `city/findByName/${name}`,
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },
  /***************************** Settings *****************************/
  getSettings: function <S, F>(promiseFuncSuccess: S, promiseFuncFail: F) {
    this.request(
      'get',
      'settings/',
      false,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  updateCommission: function <S, F>(
    dto: Pick<Settings, 'commission'>,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'patch',
      'settings/updateCommission',
      dto,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  updatePriceText: function <S, F>(
    dto: Pick<Settings, 'priceText'>,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'patch',
      'settings/updatePriceText',
      dto,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  updateFaqText: function <S, F>(
    dto: Pick<Settings, 'faqText'>,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'patch',
      'settings/updateFaqText',
      dto,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  updateSupportText: function <S, F>(
    dto: Pick<Settings, 'supportText'>,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'patch',
      'settings/updateSupportText',
      dto,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  updateAboutText: function <S, F>(
    dto: Pick<Settings, 'aboutText'>,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'patch',
      'settings/updateAboutText',
      dto,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  login: function <S, F>(
    data: LoginDto,
    promiseFuncSuccess: S,
    promiseFuncFail: F
  ) {
    this.request(
      'post',
      'auth/login',
      data,
      promiseFuncSuccess,
      promiseFuncFail
    );
  },

  /** REQUEST ============================================= */
  request: function (
    type: string,
    path: string,
    data: any,
    promiseFuncSuccess: any,
    promiseFuncFail: any
  ) {
    const config = {
      params: {},
      headers: {
        Authorization: 'Bearer ' + access_token.value,
      },
    };

    if (type === 'post') {
      api
        .post(`/api/${path}`, data, config)
        .then((response: any) => {
          if (promiseFuncSuccess) {
            promiseFuncSuccess(response);
          }
        })
        .catch((exceptData: any) => {
          if (exceptData.response) {
            if (promiseFuncFail) {
              promiseFuncFail(exceptData?.response?.data);
            } else {
              console.log('error', exceptData);
            }
          }
        });
    } else if (type === 'get') {
      if (data) {
        config.params = data;
      }
      api
        .get(`/api/${path}`, config)
        .then((response: any) => {
          if (promiseFuncSuccess) {
            promiseFuncSuccess(response.data);
          }
        })
        .catch((exceptData: any) => {
          if (exceptData) {
            if (promiseFuncFail) {
              promiseFuncFail(exceptData?.response?.data);
            } else {
              console.log(exceptData);
            }
          }
        });
    } else if (type === 'patch') {
      api
        .patch(`/api/${path}`, data, config)
        .then((response: any) => {
          if (promiseFuncSuccess) {
            promiseFuncSuccess(response.data);
          }
        })
        .catch((exceptData: any) => {
          if (exceptData.response) {
            if (promiseFuncFail) {
              promiseFuncFail(exceptData?.response?.data);
            } else {
              console.log('error', exceptData);
            }
          }
        });
    } else if (type === 'delete') {
      api
        .delete(`/api/${path}`, config)
        .then((response: any) => {
          if (promiseFuncSuccess) {
            promiseFuncSuccess(response.data);
          }
        })
        .catch((exceptData: any) => {
          if (exceptData.response) {
            if (promiseFuncFail) {
              promiseFuncFail(exceptData?.response?.data);
            } else {
              console.log('error', exceptData);
            }
          }
        });
    }
  },
};
