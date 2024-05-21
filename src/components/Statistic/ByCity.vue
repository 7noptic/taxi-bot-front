<template>
  <div>
    <TableSkeleton v-if="isLoadingTable" title="Статистика" />
    <TableStatisticsByCity v-else :list="cities" :loading="isLoading" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { $API } from 'src/plugins/api';
import { City } from 'src/types/city.interface';
import TableStatisticsByCity from 'components/Tables/TableStatisticsByCity.vue';
import TableSkeleton from 'components/Tables/TableSkeleton.vue';

const cities = ref<Record<City['name'], number>>();
const isLoading = ref<boolean>(false);
const isLoadingTable = ref<boolean>(true);
onMounted(() => {
  $API.getStatisticsByCity(
    (data: any) => {
      cities.value = data;
      isLoadingTable.value = false;
    },
    (e: any) => {
      isLoadingTable.value = false;
    }
  );
});
</script>

<style scoped></style>
