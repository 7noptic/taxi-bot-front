<script lang="ts" setup>
import { computed, ref } from 'vue';
import { TableEmits } from 'src/types/Table/emits.interface';
import { TableProps } from 'src/types/Table';
import { ResultStatisticByCityDto } from 'src/types/result-statistic-by-city.dto';
import { columnsTableStatsByCity as columns } from 'src/constants/constants';
import { exportTable } from 'src/helpers/helpers';

const emit = defineEmits<TableEmits>();
const props = withDefaults(
  defineProps<TableProps<ResultStatisticByCityDto[]>>(),
  {
    loading: false,
    list: () => [],
  }
);

const searchedList = ref<ResultStatisticByCityDto[]>([]);
const searchedText = ref<string>('');

const isLoading = ref<boolean>(false);
const isLoadingCSV = ref<boolean>(false);
const loading = computed(() => isLoading.value || props.loading);

const search = (updatedSearchedText: string) => {
  searchedText.value = updatedSearchedText;

  isLoading.value = true;
  const fail = () => {
    searchedList.value = [];
    isLoading.value = false;
  };

  if (!searchedText.value) {
    fail();
    return;
  }

  searchedList.value = props.list.filter((item) =>
    item.name.toLowerCase().includes(searchedText.value.toLowerCase())
  );
  isLoading.value = false;
};

const exportToCsv = async () => {
  isLoadingCSV.value = true;
  await exportTable(columns, list.value);
  isLoadingCSV.value = false;
};

const list = computed(() =>
  !!searchedText.value ? searchedList.value : props.list
);
</script>

<template>
  <q-table
    :key="pagination"
    :columns="columns"
    :loading="loading"
    :rows="list"
    :rows-per-page-options="[10]"
    class="table"
    row-key="name"
    title="Статистика по городам"
  >
    <template v-slot:body="props">
      <q-tr :props="props" class="table-order__row">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <template
            v-if="col.name === 'totalPrice' || col.name === 'totalCommission'"
          >
            {{ col.value.toLocaleString() }} ₽
          </template>
          <template v-else>
            {{ col.value.toLocaleString() }}
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
        @click="exportToCsv"
      />
    </template>
    <template v-slot:top-left>
      <q-input
        :model-value="searchedText"
        debounce="300"
        dense
        outlined
        placeholder="Поиск по названию города"
        standout
        @update:model-value="search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<style lang="scss" scoped></style>
