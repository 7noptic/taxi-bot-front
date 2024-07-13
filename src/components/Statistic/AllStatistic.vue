<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { $API } from 'src/plugins/api';
import { ResultStatisticAllDto } from 'src/types/result-statistic-all.dto';

const stats = ref<ResultStatisticAllDto>();

const titles = <Record<string, string>>{
  totalOrders: 'Всего заказов',
  totalCancelOrders: 'Отмененных заказов',
  totalSuccess: 'Успешных заказов',
  totalDriverOrders: 'Всего поездок',
  totalDeliveryOrders: 'Всего доставок',
  totalPrice: 'Стоимость всех поездок',
  totalCommission: 'Заработано',
};

const periods = <Record<keyof ResultStatisticAllDto, string>>{
  all: 'За все время',
  month: 'За месяц',
  today: 'За сегодня',
  week: 'За неделю',
};

onMounted(() => {
  $API.getAllStatistic(
    (data: ResultStatisticAllDto) => {
      console.log(data);
      stats.value = data;
    },
    (e: any) => {
      console.log(e);
    }
  );
});
</script>

<template>
  <div class="stats">
    <div v-for="(value, key) in stats" :key="key" class="stats-block">
      <h4 class="text-uppercase text-primary">
        <b>{{ periods[key] }}</b>
      </h4>
      <div v-for="(value, key) in value" :key="key" class="stats-item">
        <b>{{ titles[key] }}</b>
        : {{ value.toLocaleString() }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
  }
}
</style>
