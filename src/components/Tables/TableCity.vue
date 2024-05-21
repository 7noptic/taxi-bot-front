<script lang="ts" setup>
import { computed, ref } from 'vue';
import { ResponseType } from 'src/types/query.type';
import { $API } from 'src/plugins/api';
import { exportTable } from 'src/helpers/helpers';
import { ModeTable } from 'src/types/mode.table';
import { columnsTableCity as columns } from 'src/constants/constants';
import { TableEmits } from 'src/types/Table/emits.interface';
import { TableProps } from 'src/types/Table';
import { debounce, Notify } from 'quasar';
import { City } from 'src/types/city.interface';

const emit = defineEmits<TableEmits>();
const props = withDefaults(defineProps<TableProps<City[]>>(), {
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

const searchedList = ref<City[]>([]);
const searchedText = ref<string>('');
const lastPage = computed(() =>
  Math.ceil(props.pagination.total / props.pagination.perPageCount)
);
const isLoading = ref<boolean>(false);
const loading = computed(() => isLoading.value || props.loading);
const mode = ref<ModeTable>(props.mode);

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
const getIdInTableProps = (props: any) =>
  props.cols.find(({ name }: any) => name === '_id')?.value;

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

  await $API.findCityByName(
    searchedText.value,
    (response: City[]) => {
      mode.value = ModeTable.All;
      searchedList.value = response;
      isLoading.value = false;
    },
    fail()
  );
}, 700);

const getCities = async () => {
  isLoadingCSV.value = true;
  if (mode.value === ModeTable.All) {
    await exportTable(columns, list.value);
    isLoadingCSV.value = false;
  } else if (mode.value === ModeTable.Page) {
    $API.getAllCities(
      async (response: ResponseType<City[]>) => {
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

const deleteCity = async (id: string) => {
  $API.deleteCityById(
    id,
    async (response: ResponseType<City[]>) => {
      Notify.create({
        message: '☺️ Город успешно удален',
        color: 'positive',
        timeout: 1500,
      });
      emit('update');
    },
    (e: any) => {
      isLoadingCSV.value = false;
      console.log(e);
    }
  );
};

const updateMinPrice = async (id: string, minPrice: number, scope: any) => {
  if (!minPrice || minPrice <= 0 || minPrice > 10_000) return;
  $API.updateCityById(
    id,
    {
      minPrice,
    },
    async (response: ResponseType<City[]>) => {
      emit('update');
      scope?.cancel();
    },
    (e: any) => {
      isLoadingCSV.value = false;
      console.log(e);
    }
  );
};
const updateName = async (id: string, name: string, scope: any) => {
  if (!name) return;

  $API.updateCityById(
    id,
    {
      name,
    },
    async (response: ResponseType<City[]>) => {
      emit('update');
      scope?.cancel();
    },
    (e: any) => {
      isLoadingCSV.value = false;
      console.log(e);
    }
  );
};

const selectPage = (page: number) => {
  emit('selectPage', page);
};

const list = computed(() =>
  !!searchedText.value ? searchedList.value : props.list
);
</script>
<template>
  <div class="container">
    <p class="q-mb-md">
      Чтобы изменить название или стоимость у города, просто кликните по нужному
      полю, введите нужные вам значения и нажмите <code>Enter</code>
    </p>
    <q-table
      :key="pagination"
      :columns="visibleColumns"
      :loading="loading"
      :pagination="pagination"
      :rows="list"
      :rows-per-page-options="
        mode == ModeTable.Page ? [10] : [5, 7, 10, 15, 20, 25, 50, 0]
      "
      class="table-city"
      row-key="name"
      title="Заказы"
    >
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
      <template v-slot:body="props">
        <q-tr :props="props" class="table-city__row">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <template v-if="col.name === 'name'">
              {{ col.value }}
              <q-popup-edit v-slot="scope" v-model="props.row.name">
                <q-input
                  v-model.trim="scope.value"
                  autofocus
                  counter
                  dense
                  @keyup.enter="
                    updateName(getIdInTableProps(props), scope.value, scope)
                  "
                />
              </q-popup-edit>
            </template>
            <template v-else-if="col.name === 'minPrice'">
              {{ col.value }}
              <q-popup-edit v-slot="scope" v-model="props.row.minPrice">
                <q-input
                  v-model.number="scope.value"
                  autofocus
                  counter
                  dense
                  @keyup.enter="
                    updateMinPrice(getIdInTableProps(props), scope.value, scope)
                  "
                />
              </q-popup-edit>
            </template>
            <template v-else-if="col.name === '_id'" />
            <template v-else-if="col.name === 'delete'">
              <q-btn
                class="cursor-pointer"
                color="red"
                dense
                @click="deleteCity(getIdInTableProps(props))"
              >
                <q-icon name="delete" size="xs" />
              </q-btn>
            </template>
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
          @click="getCities"
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
            selectPage(
              scope.pagination.page <= 1 ? 1 : scope.pagination.page - 1
            )
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
  </div>
</template>

<style lang="scss" scoped>
.table-city {
  width: 100%;

  &__row {
    cursor: pointer;
  }

  &:deep(.q-td) {
    max-width: 200px;
    overflow-x: auto;
    scrollbar-gutter: stable;
  }

  &:deep(thead tr th:first-child),
  &:deep(tbody tr td:first-child) {
    display: none !important;
  }
}
</style>
