<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Order } from 'src/types/order.interface';
import ModalOrder from 'src/components/Modal/Order.vue';
import CopyText from 'components/CopyText.vue';
import { ResponseType } from 'src/types/query.type';
import { $API } from 'src/plugins/api';
import { exportTable } from 'src/helpers/helpers';
import { ModeTable } from 'src/types/mode.table';
import { columnsTableOrder as columns } from 'src/constants/constants';
import { TableEmits } from 'src/types/Table/emits.interface';
import { TableProps } from 'src/types/Table';
import { debounce } from 'quasar';

const emit = defineEmits<TableEmits>();
const props = withDefaults(defineProps<TableProps<Order[]>>(), {
  loading: false,
  list: () => [],
  hiddenFields: () => [],
  pagination: () => ({
    currentPage: 1,
    perPageCount: 10,
    total: 0,
  }),
  mode: ModeTable.Page,
});

const searchedList = ref<Order[]>([]);
const searchedText = ref<string>('');
const lastPage = computed(() =>
  Math.ceil(props.pagination.total / props.pagination.perPageCount)
);
const isLoading = ref<boolean>(false);
const loading = computed(() => isLoading.value || props.loading);
const mode = ref<ModeTable>(props.mode);
const selectedOrderId = ref<string>('');
const modal = ref<boolean>(false);
const isLoadingCSV = ref<boolean>(false);
const visibleColumns = computed(() =>
  props.hiddenFields.length
    ? columns.filter((item) => !props.hiddenFields.includes(<string>item.field))
    : columns
);
const pagination = computed(() =>
  mode.value == ModeTable.Page
    ? {
        rowsPerPage: props.pagination.perPageCount,
        page: props.pagination.currentPage,
        rowsNumber: Number(props.pagination.total),
      }
    : {
        rowsPerPage: props.pagination.perPageCount,
      }
);

const search = debounce(async (updatedSearchedText: string) => {
  searchedText.value = updatedSearchedText;

  isLoading.value = true;
  const fail = () => {
    searchedList.value = [];
    mode.value = props.mode;
    isLoading.value = false;
  };

  if (!searchedText.value) {
    fail();
    return;
  }
  if (mode.value === ModeTable.All && props.mode == ModeTable.All) {
    searchedList.value = props.list.filter((order) =>
      order.numberOrder.toLowerCase().includes(searchedText.value.toLowerCase())
    );
    isLoading.value = false;
    return;
  }
  await $API.findByNumberOrder(
    searchedText.value,
    (response: Order[]) => {
      mode.value = ModeTable.All;
      searchedList.value = response;
      isLoading.value = false;
    },
    fail()
  );
}, 700);

const getOrders = async () => {
  isLoadingCSV.value = true;
  if (mode.value === ModeTable.All) {
    await exportTable(columns, list.value);
    isLoadingCSV.value = false;
  } else if (mode.value === ModeTable.Page) {
    $API.getAllOrders(
      async (response: ResponseType<Order[]>) => {
        await exportTable(columns, response.data);
        isLoadingCSV.value = false;
      },
      (e: any) => {
        isLoadingCSV.value = false;
        console.log(e);
      }
    );
  }
};
const openModal = (orderId: string) => {
  selectedOrderId.value = orderId;
  modal.value = true;
};
const selectPage = (page: number) => {
  emit('selectPage', page);
};

const list = computed(() =>
  !!searchedText.value ? searchedList.value : props.list
);
</script>
<template>
  <q-table
    :key="pagination"
    :columns="visibleColumns"
    :loading="loading"
    :pagination="pagination"
    :rows="list"
    :rows-per-page-options="
      mode == ModeTable.Page ? [10] : [5, 7, 10, 15, 20, 25, 50, 0]
    "
    class="table-order"
    row-key="name"
    title="Заказы"
  >
    <template v-slot:top-left>
      <q-input
        :model-value="searchedText"
        debounce="300"
        dense
        outlined
        placeholder="Поиск по номеру заказа"
        standout
        @update:model-value="search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:body="props">
      <q-tr
        :props="props"
        class="table-order__row"
        @click="openModal(props.cols.find(({ name }) => name === '_id')?.value)"
      >
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <template
            v-if="
              (col.name === 'numberOrder' ||
                col.name === 'passengerId' ||
                col.name === 'driverId') &&
              !!col.value
            "
          >
            {{ col.value }}
            <CopyText :text="col.value.toString()" />
          </template>
          <template v-else-if="col.name === '_id'" />
          <template v-else>
            {{ col.value }}
          </template>
        </q-td>
      </q-tr>
    </template>
    <template v-slot:top-right>
      <q-btn
        :disable="!list.length"
        :loading="isLoadingCSV"
        color="primary"
        icon-right="archive"
        label="Экспорт в csv"
        no-caps
        @click="getOrders"
      />
    </template>
    <template v-if="mode == ModeTable.Page" v-slot:pagination="scope">
      <b>{{ scope.pagination.page }}</b> &nbsp; из&nbsp;
      <b>{{ scope.pagesNumber }}</b>
      <q-btn
        v-if="scope.pagesNumber > 2"
        :disable="scope.isFirstPage"
        color="grey-8"
        dense
        flat
        icon="first_page"
        round
        @click="selectPage(1)"
      >
      </q-btn>

      <q-btn
        :disable="scope.isFirstPage"
        color="grey-8"
        dense
        flat
        icon="chevron_left"
        round
        @click="
          selectPage(scope.pagination.page <= 1 ? 1 : scope.pagination.page - 1)
        "
      >
      </q-btn>
      <q-btn
        :disable="scope.isLastPage"
        color="grey-8"
        dense
        flat
        icon="chevron_right"
        round
        @click="
          scope.pagination.page >= lastPage
            ? lastPage
            : selectPage(scope.pagination.page + 1)
        "
      >
      </q-btn>

      <q-btn
        v-if="scope.pagesNumber > 2"
        :disable="scope.isLastPage"
        color="grey-8"
        dense
        flat
        icon="last_page"
        round
        @click="selectPage(lastPage)"
      >
      </q-btn>
    </template>
  </q-table>
  <ModalOrder v-if="modal" v-model="modal" :order-id="selectedOrderId" />
</template>

<style lang="scss" scoped>
.table-order {
  width: 100%;

  &__row {
    cursor: pointer;
  }

  &:deep(.q-td) {
    max-width: 200px;
    overflow-x: auto;
    scrollbar-gutter: stable;
  }
}
</style>
