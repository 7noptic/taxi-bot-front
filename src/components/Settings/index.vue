<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import SettingsCommission from 'src/components/Settings/Commission.vue';
import SettingsText from 'src/components/Settings/Text.vue';
import SettingsImages from 'src/components/Settings/Images.vue';
import TableCity from 'components/Tables/TableCity.vue';
import { PaginationType, ResponseType } from 'src/types/query.type';
import { $API } from 'src/plugins/api';
import { City } from 'src/types/city.interface';
import TableSkeleton from 'components/Tables/TableSkeleton.vue';
import AddCity from 'components/AddCity.vue';

defineOptions({
  name: 'SettingsComponent',
});

enum Tabs {
  City = 'city',
  Text = 'text',
  Commission = 'commission',
  Images = 'images',
}

const tab = ref<Tabs>(Tabs.City);

const cities = ref<City[]>([]);
const pagination = ref<PaginationType>({
  currentPage: 1,
  perPageCount: 10,
  total: 10,
});
const isLoading = ref<boolean>(false);
const isLoadingTable = ref<boolean>(false);

const getCities = async (currentPage: number) => {
  isLoading.value = true;
  await $API.getCities(
    {
      currentPage,
    },
    (response: ResponseType<City[]>) => {
      cities.value = response.data;
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
  await getCities(1);
});
</script>

<template>
  <q-card class="card">
    <q-card-section>
      <h2 class="card__title" v-text="'Настройки'" />
      <q-tabs
        v-model="tab"
        active-color="primary"
        align="left"
        class="shadow-2 text-grey"
        dense
        indicator-color="primary"
        inline-label
        mobile-arrows
        narrow-indicator
        outside-arrows
      >
        <q-tab :name="Tabs.City" icon="apartment" label="Города" />
        <q-tab :name="Tabs.Commission" icon="payments" label="Комиссия" />
        <q-tab :name="Tabs.Text" icon="description" label="Текста" />
        <q-tab :name="Tabs.Images" icon="image" label="Изображения" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel :name="Tabs.City" class="q-px-none">
          <div class="cities">
            <TableSkeleton v-if="isLoadingTable" title="Заказы" />
            <TableCity
              v-else
              :key="pagination"
              :list="cities"
              :loading="isLoading"
              :pagination="pagination"
              @update="getCities(pagination.currentPage)"
              @select-page="(page) => getCities(page)"
            />
            <AddCity @add-city="getCities(pagination.currentPage)" />
          </div>
        </q-tab-panel>

        <q-tab-panel :name="Tabs.Commission" class="q-px-none">
          <SettingsCommission />
        </q-tab-panel>

        <q-tab-panel :name="Tabs.Text" class="q-px-none">
          <SettingsText />
        </q-tab-panel>

        <q-tab-panel :name="Tabs.Images" class="q-px-none">
          <SettingsImages />
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;

  &__title {
    font-size: 3.2rem;
    font-weight: 700;
    margin-bottom: 2.4rem;
  }
}

.cities {
  display: grid;
  grid-template-columns: 0.65fr 0.35fr;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
