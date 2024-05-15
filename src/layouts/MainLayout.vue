<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          aria-label="Menu"
          dense
          flat
          icon="menu"
          round
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Такси бот</q-toolbar-title>
        <q-btn icon="logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered show-if-above>
      <q-list>
        <q-item-label header> Меню</q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/Menu/EssentialLink.vue';
import SocketClient from 'src/plugins/socket';
import useUser from 'stores/user';
import { useRouter } from 'vue-router';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Пассажиры',
    icon: 'face',
    link: '/',
  },
  {
    title: 'Водители',
    icon: 'directions_car',
    link: '/driver',
  },
  {
    title: 'Заказы',
    icon: 'list_alt',
    link: '/order',
  },
  {
    title: 'Поддержка',
    icon: 'help',
    link: '/help',
  },
  {
    title: 'Рассылка',
    icon: 'mail',
    link: '/newsletter',
  },
  {
    title: 'Статистика',
    icon: 'bar_chart',
    link: '/statistic',
  },
  {
    title: 'Настройки',
    icon: 'settings',
    link: '/settings',
  },
  {
    title: 'Администраторы',
    icon: 'admin_panel_settings',
    link: '/admin',
  },
];

const leftDrawerOpen = ref(false);
const authStore = useUser();
const { setAccessToken } = authStore;
const router = useRouter();

const logout = () => {
  setAccessToken('');
  router.push('/auth');
};

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

onMounted(() => {
  SocketClient.connect('');
});
</script>
