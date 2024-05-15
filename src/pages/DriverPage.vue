<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { $API } from 'src/plugins/api';
import { Driver } from 'src/types/driver.interface';
import TableDriver from 'components/Tables/TableDriver.vue';
import { PaginationType, ResponseType } from 'src/types/query.type';
import TableSkeleton from 'components/Tables/TableSkeleton.vue';

const passengers = ref<Driver[]>([]);
const pagination = ref<PaginationType>({
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
      passengers.value = response.data;
      pagination.value = {
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

onMounted(async () => {
  isLoadingTable.value = true;
  await getDrivers(1);
});
</script>

<template>
  <q-page class="row justify-evenly items-start q-pa-lg">
    <TableSkeleton v-if="isLoadingTable" title="Заказы" />
    <TableDriver
      v-else
      :key="pagination"
      :list="passengers"
      :loading="isLoading"
      :pagination="pagination"
      @select-page="(page) => getDrivers(page)"
    />
  </q-page>
</template>

<style lang="scss" scoped></style>
