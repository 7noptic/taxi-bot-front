<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { $API } from 'src/plugins/api';
import { Appeal } from 'src/types/appeal.interface';
import TableAppeal from 'components/Tables/TableAppeal.vue';
import { PaginationType, ResponseType } from 'src/types/query.type';
import TableSkeleton from 'components/Tables/TableSkeleton.vue';
import SocketClient from 'src/plugins/socket';

const appeal = ref<Appeal[]>([]);
const pagination = ref<PaginationType>({
  currentPage: 1,
  perPageCount: 10,
  total: 10,
});
const isLoading = ref<boolean>(false);
const isLoadingTable = ref<boolean>(false);
const getAppeals = async (currentPage: number) => {
  isLoading.value = true;
  $API.getAppeals(
    {
      currentPage,
    },
    (response: ResponseType<Appeal[]>) => {
      appeal.value = response.data;
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

  await getAppeals(1);

  SocketClient.client?.on('update-appeal-client', (appeal: Appeal) => {
    getAppeals(pagination.value.currentPage);
  });
});

onUnmounted(() => {
  SocketClient.client?.off('update-appeal-client');
});
</script>

<template>
  <q-page class="row justify-evenly items-start q-pa-lg">
    <TableSkeleton v-if="isLoadingTable" title="Заказы" />
    <TableAppeal
      v-else
      :list="appeal"
      :loading="isLoading"
      :pagination="pagination"
      @select-page="(page) => getAppeals(page)"
    />
  </q-page>
</template>

<style lang="scss" scoped></style>
