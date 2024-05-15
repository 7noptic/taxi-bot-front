<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { $API } from 'src/plugins/api';
import TableOrder from 'components/Tables/TableOrder.vue';
import { Order } from 'src/types/order.interface';
import { PaginationType, ResponseType } from 'src/types/query.type';
import TableSkeleton from 'components/Tables/TableSkeleton.vue';

defineOptions({
  name: 'TableComponent',
});

const orders = ref<Order[]>([]);
const pagination = ref<PaginationType>({
  currentPage: 1,
  perPageCount: 10,
  total: 10,
});
const isLoading = ref<boolean>(false);
const isLoadingTable = ref<boolean>(false);

const getOrders = async (currentPage: number) => {
  isLoading.value = true;
  await $API.getOrders(
    {
      currentPage,
    },
    (response: ResponseType<Order[]>) => {
      orders.value = response.data;
      pagination.value = {
        currentPage: response.currentPage,
        perPageCount: response.perPageCount,
        total: response.total,
      };
      isLoadingTable.value = false;
      isLoading.value = false;
    },
    (e: any) => {
      isLoading.value = false;
      console.log(e);
    }
  );
};

onMounted(async () => {
  isLoadingTable.value = true;
  await getOrders(1);
});
</script>

<template>
  <q-page class="row justify-evenly items-start q-pa-lg">
    <TableSkeleton v-if="isLoadingTable" title="Заказы" />
    <TableOrder
      v-else
      :key="pagination"
      :list="orders"
      :loading="isLoading"
      :pagination="pagination"
      @select-page="(page) => getOrders(page)"
    />
    <!--    <TableComponent-->
    <!--      v-else-->
    <!--      :key="pagination"-->
    <!--      :list="orders"-->
    <!--      :loading="isLoading"-->
    <!--      :pagination="pagination"-->
    <!--      @select-page="(page) => getOrders(page)"-->
    <!--    >-->
    <!--      <template v-slot:modal="slotProps">-->
    <!--        {{ slotProps }}-->
    <!--        <ModalOrder-->
    <!--          v-if="slotProps.modal"-->
    <!--          v-model="slotProps.modal"-->
    <!--          :chat-id="slotProps.selectedId"-->
    <!--        />-->
    <!--      </template>-->
    <!--    </TableComponent>-->
  </q-page>
</template>

<style scoped></style>
