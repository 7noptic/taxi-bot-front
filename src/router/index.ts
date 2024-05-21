import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

import useUser from 'src/stores/user';
import { storeToRefs } from 'pinia';

export default route(function (/* { store, ssrContext } */) {
  const authStore = useUser();
  const { user, access_token } = storeToRefs(authStore);
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to) => {
    if ((!user.value || !access_token.value) && to.path !== '/auth') {
      return '/auth';
    }
    if (user.value && access_token.value && to.path == '/auth') {
      return '/';
    }
  });

  return Router;
});
