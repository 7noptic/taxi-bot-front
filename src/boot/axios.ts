import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}
console.log(process.env.API_URL);
// const api = axios.create({
//   baseURL: 'http://taxi-bot-backend.ru',
//
//   headers: {
//     Connection: 'keep-alive',
//     'Access-Control-Allow-Origin': '*',
//   },
// });
const api = axios.create({
  baseURL: 'http://taxi-bot-backend.ru:3000',
});
export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

export { api };
