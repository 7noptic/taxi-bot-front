<template>
  <q-dialog v-model="modal">
    <q-card
      v-if="order"
      class="bg-white text-dark layout"
      container
      view="Lhh lpR fff"
    >
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h4">
          <b>{{ order.numberOrder }}</b>
          <CopyText :text="order.numberOrder.toString()" />
        </div>
        <q-space />
        <q-btn v-close-popup dense flat icon="close" round />
      </q-card-section>

      <q-card-section>
        <div v-for="(value, key) in fields" :key="key" class="table-item">
          <template v-if="order[key]">
            <b>{{ value }}: </b>
            <span>
              <template v-if="key === 'appeals'">
                <div
                  v-for="{ numberAppeal } in order.appeals"
                  :key="numberAppeal"
                >
                  {{ numberAppeal }}
                  <CopyText :text="numberAppeal.toString()" />
                </div>
              </template>

              <template v-else-if="key === 'reviews'">
                <div v-for="review in order.reviews" :key="review.from">
                  {{
                    order.driverId === review.from
                      ? 'Отзыв водителя'
                      : 'Отзыв пассажира'
                  }}: {{ review.text }}
                </div>
              </template>
              <template v-else-if="key === 'type'">
                {{ TypeOrderRus[order[key]] }}
              </template>
              <template v-else-if="key === 'status'">
                {{ StatusOrderRus[order[key]] }}
              </template>
              <template v-else-if="key === 'price' || key === 'commission'">
                {{ order[key] }} ₽
              </template>
              <template v-else-if="key === 'driverId' || key === 'passengerId'">
                {{ order[key] }}
                <CopyText :text="order[key].toString()" />
              </template>
              <template v-else-if="key === 'submissionTime'">
                {{ order[key] }} мин.
              </template>
              <template v-else-if="key === 'createdAt'">
                {{ new Date(order[key]).toLocaleString('ru-RU') }}
              </template>

              <template v-else>
                {{ order[key] }}
              </template>
            </span>
          </template>
        </div>
      </q-card-section>
    </q-card>
    <CardSkeleton v-else />
  </q-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { $API } from 'src/plugins/api';
import { FullOrderInfo } from 'src/types/full-order-info.interface';
import CopyText from 'components/CopyText.vue';
import { StatusOrderRus } from '../../types/status-order.enum';
import { TypeOrderRus } from '../../types/type-order.enum';
import CardSkeleton from 'components/CardSkeleton.vue';

interface Props {
  modelValue: boolean;
  orderId: string;
}

interface Emits {
  (event: 'update:modelValue', value: boolean): void;
}

const fields = {
  type: 'Тип заказа',
  addressFrom: 'Откуда',
  addressTo: 'Куда',
  comment: 'Комментарий',
  price: 'Цена',
  status: 'Статус',
  passengerId: 'id пассажира',
  driverId: 'id водителя',
  city: 'Город',
  submissionTime: 'Время подачи',
  commission: 'Комиссия сервиса',
  createdAt: 'Дата создания',
  reviews: 'Отзывы',
  appeals: 'Обращения',
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

const emit = defineEmits<Emits>();
defineOptions({
  name: 'ModalOrder',
});
const order = ref<FullOrderInfo>();
const modal = ref<boolean>(props.modelValue);

const getFullOrderInfo = () => {
  if (!props.orderId) return;
  $API.getFullOrderInfo(
    props.orderId,
    (data: FullOrderInfo) => {
      order.value = data;
    },
    (e: any) => console.log(e)
  );
};
watch(
  () => modal.value,
  (value: boolean) => emit('update:modelValue', value)
);
watch(
  () => props.modelValue,
  (value: boolean) => (modal.value = value)
);
watch(
  () => props.orderId,
  (v) => {
    getFullOrderInfo();
  }
);

onMounted(() => {
  getFullOrderInfo();
});
</script>

<style lang="scss" scoped></style>
