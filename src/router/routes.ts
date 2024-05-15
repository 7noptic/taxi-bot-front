import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/driver',
        component: () => import('pages/DriverPage.vue'),
      },
      {
        path: '/order',
        component: () => import('pages/OrderPage.vue'),
      },
      {
        path: '/help',
        component: () => import('pages/HelpPage.vue'),
      },
      {
        path: '/newsletter',
        component: () => import('pages/NewsLetterPage.vue'),
      },
      {
        path: '/statistic',
        component: () => import('pages/StatisticPage.vue'),
      },
      {
        path: '/settings',
        component: () => import('pages/SettingsPage.vue'),
      },
      {
        path: '/admin',
        component: () => import('pages/AdminPage.vue'),
      },
    ],
  },

  {
    name: 'auth',
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '/auth', component: () => import('pages/AuthPage.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
