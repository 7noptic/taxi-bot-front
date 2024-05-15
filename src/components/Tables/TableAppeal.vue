<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { $API } from 'src/plugins/api';
import { ModeTable } from 'src/types/mode.table';
import { columnsTableAppeal as columns } from 'src/constants/constants';
import { TableEmits } from 'src/types/Table/emits.interface';
import { TableProps } from 'src/types/Table';
import { debounce } from 'quasar';
import { Appeal } from 'src/types/appeal.interface';
import AppealChat from 'components/AppealChat.vue';

const emit = defineEmits<TableEmits>();
const props = withDefaults(defineProps<TableProps<Appeal[]>>(), {
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

const searchedList = ref<Appeal[]>([]);
const searchedText = ref<string>('');
const lastPage = computed(() =>
  Math.ceil(props.pagination.total / props.pagination.perPageCount)
);
const isLoading = ref<boolean>(false);
const loading = computed(() => isLoading.value || props.loading);
const mode = ref<ModeTable>(props.mode);
const selectedAppeal = ref<Appeal>();
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

  await $API.findByNumberAppeal(
    searchedText.value,
    (response: Appeal[]) => {
      mode.value = ModeTable.All;
      searchedList.value = response;
      isLoading.value = false;
    },
    fail()
  );
}, 700);

const selectAppeal = (appeal: Appeal) => {
  selectedAppeal.value = appeal;
};

const selectPage = (page: number) => {
  emit('selectPage', page);
};

const list = computed(() =>
  !!searchedText.value ? searchedList.value : props.list
);

watch(
  () => props.list,
  (list: Appeal[]) => {
    if (selectedAppeal.value) {
      const selectedIndex = list.findIndex(
        (item) => item._id === selectedAppeal.value?._id
      );
      if (selectedIndex > -1) selectedAppeal.value = list[selectedIndex];
    }
  }
);
</script>

<template>
  <q-card class="appeal">
    <q-table
      :key="pagination"
      :columns="visibleColumns"
      :loading="loading"
      :pagination="pagination"
      :rows="list"
      :rows-per-page-options="[10]"
      class="appeal-table"
      row-key="name"
      title="Обращения"
    >
      <template v-slot:top-left>
        <q-input
          :model-value="searchedText"
          debounce="300"
          dense
          outlined
          placeholder="Поиск по ID"
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
          :class="{
            'appeal-table__row--active':
              selectedAppeal?._id === props?.row?._id,
          }"
          :props="props"
          class="appeal-table__row"
          @click="selectAppeal(props.row)"
        >
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
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

    <div class="appeal-chat">
      <AppealChat
        v-model:appeal="selectedAppeal"
        @update:appeal="selectPage(pagination.currentPage)"
      />
    </div>
  </q-card>
</template>

<style lang="scss" scoped>
.appeal {
  display: flex;
  width: 100%;
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
  }

  &-chat {
    width: calc(100% - 250px);
    @media screen and (max-width: 767px) {
      margin-top: 2rem;
      width: 100%;
    }
  }

  &-table {
    width: 250px;
    @media screen and (max-width: 767px) {
      width: 100%;
    }

    &__row {
      cursor: pointer;

      &--active {
        td {
          background-color: rgba($accent, 0.2);
        }
      }
    }
  }
}
</style>
