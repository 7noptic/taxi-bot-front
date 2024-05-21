<script lang="ts" setup>
import { ref } from 'vue';
import ByCity from 'components/Statistic/ByCity.vue';
import AllStatistic from 'components/Statistic/AllStatistic.vue';

defineOptions({
  name: 'StatisticComponent',
});

const isLoading = ref<boolean>(false);
</script>

<template>
  <q-card class="card">
    <q-card-section>
      <h2 class="card__title" v-text="'Статистика'" />

      <AllStatistic />

      <ByCity />
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
