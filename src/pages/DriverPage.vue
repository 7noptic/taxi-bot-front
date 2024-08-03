<script lang="ts" setup>
import { inject, onMounted, onUnmounted, ref } from 'vue';
import { $API } from 'src/plugins/api';
import { Driver } from 'src/types/driver.interface';
import TableDriver from 'components/Tables/TableDriver.vue';
import { PaginationType, ResponseType } from 'src/types/query.type';
import TableSkeleton from 'components/Tables/TableSkeleton.vue';
import { EventBus } from 'quasar';

const tab = ref<string>('all');
const bus = <EventBus>inject('bus');

const drivers = ref<Driver[]>([]);
const driversBlocked = ref<Driver[]>([]);
const selectedDriverPage = ref<number>(1);
const selectedBlockedDriverPage = ref<number>(1);
const paginationDriver = ref<PaginationType>({
  currentPage: 1,
  perPageCount: 10,
  total: 10,
});

const paginationBlockedDriver = ref<PaginationType>({
  currentPage: 1,
  perPageCount: 10,
  total: 10,
});

const isLoading = ref<boolean>(false);
const isLoadingTable = ref<boolean>(false);

const getDrivers = async (currentPage: number) => {
  isLoading.value = true;
  $API.getDrivers(
    {
      currentPage,
    },
    (response: ResponseType<Driver[]>) => {
      drivers.value = response.data;
      paginationDriver.value = {
        currentPage: response.currentPage,
        perPageCount: response.perPageCount,
        total: response.total,
      };
      isLoadingTable.value = false;
      isLoading.value = false;
    },
    (e: any) => console.log(e)
  );
};

const getBlockedDrivers = async (currentPage: number) => {
  isLoading.value = true;
  $API.getBlockedDrivers(
    {
      currentPage,
    },
    (response: ResponseType<Driver[]>) => {
      driversBlocked.value = response.data;
      paginationBlockedDriver.value = {
        currentPage: response.currentPage,
        perPageCount: response.perPageCount,
        total: response.total,
      };
      isLoadingTable.value = false;
      isLoading.value = false;
    },
    (e: any) => console.log(e)
  );
};

const selectDriverPage = async (page: number) => {
  selectedDriverPage.value = page;
  await getDrivers(selectedDriverPage.value);
};

const selectBlockedDriverPage = async (page: number) => {
  selectedDriverPage.value = page;
  await getBlockedDrivers(selectedBlockedDriverPage.value);
};

onMounted(async () => {
  isLoadingTable.value = true;
  await getDrivers(selectedDriverPage.value);
  await getBlockedDrivers(selectedBlockedDriverPage.value);
  bus.on('update-drivers', () => getDrivers(selectedDriverPage.value));
  bus.on('update-drivers', () =>
    getBlockedDrivers(selectedBlockedDriverPage.value)
  );
});
onUnmounted(() => {
  bus.off('update-drivers', getDrivers);
  bus.off('update-drivers', getBlockedDrivers);
});
</script>

<template>
  <q-page class="q-pa-lg">
    <div>
      <q-tabs
        v-model="tab"
        align="justify"
        class="text-primary"
        dense
        narrow-indicator
      >
        <q-tab
          :ripple="false"
          icon="group"
          label="Все пользователи"
          name="all"
        />

        <q-tab
          :class="{ 'text-red': driversBlocked.length }"
          :ripple="false"
          icon="block"
          label="Ожидают подтверждения"
          name="blocked"
        />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="all">
          <TableSkeleton v-if="isLoadingTable" title="Водители" />
          <TableDriver
            v-else
            :key="paginationDriver"
            :list="drivers"
            :loading="isLoading"
            :pagination="paginationDriver"
            @select-page="selectDriverPage"
          />
        </q-tab-panel>

        <q-tab-panel name="blocked">
          <TableSkeleton v-if="isLoadingTable" title="Водители" />
          <TableDriver
            v-else
            :key="paginationBlockedDriver"
            :list="driversBlocked"
            :loading="isLoading"
            :pagination="paginationBlockedDriver"
            @select-page="selectBlockedDriverPage"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
