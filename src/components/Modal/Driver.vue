<template>
  <q-dialog v-model="modal">
    <q-layout
      v-if="driver"
      class="bg-white text-dark layout"
      container
      view="lhh lpR fff"
    >
      <q-drawer
        v-model="drawer"
        :breakpoint="10000"
        bordered
        class="bg-grey-3 text-dark q-pa-sm"
        side="right"
      >
        <template
          v-for="(item, index) in selectedMessageList"
          :key="item?.name"
        >
          <q-chat-message
            :bg-color="index % 2 === 0 ? 'blue' : 'green'"
            :stamp="
              item?.createdAt
                ? new Date(item?.createdAt).toLocaleDateString()
                : undefined
            "
            :text="getTextForMessage(item)"
            sent
          />
        </template>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h4">
              {{ driver.first_name || driver.username || 'Пользователь' }}
              <b>({{ driver.chatId }})</b>
              {{ driver.status === StatusDriver.Online ? '🟢' : '🔴' }}
              {{ driver.status }}
            </div>
            <q-space />
            <q-btn v-close-popup dense flat icon="close" round />
          </q-card-section>

          <q-card-section>
            <div v-for="(value, key) in fields" :key="key" class="table-item">
              <template v-if="driver[key]">
                <b>{{ value }}: </b>
                <span>
                  <template v-if="key === 'averageRating'">
                    {{ driver[key].toFixed(2) }}
                  </template>
                  <template v-else-if="key === 'createdAt'">
                    {{ new Date(driver[key]).toLocaleDateString('ru-RU') }}
                  </template>
                  <template v-else-if="key === 'car'">
                    {{ driver.car.carColor }}
                    {{ driver.car.carBrand }}
                    |
                    {{ driver.car.carNumber }}
                  </template>
                  <template v-else-if="key === 'accessOrderType'">
                    {{ accessOrderTypeToRus[driver[key]] }}
                  </template>
                  <template v-else-if="key === 'address'">
                    {{ driver[key].length }}
                    <q-chip
                      v-if="driver[key].length"
                      clickable
                      color="teal"
                      dense
                      icon="visibility"
                      text-color="white"
                      @click.stop="openDrawer(driver.address)"
                    >
                      Посмотреть
                    </q-chip>
                  </template>
                  <template v-else-if="key === 'leftReview'">
                    {{ driver[key] }}
                    <q-chip
                      v-if="driver.reviewFrom.length"
                      clickable
                      color="teal"
                      dense
                      icon="visibility"
                      text-color="white"
                      @click.stop="openDrawer(driver.reviewFrom)"
                    >
                      Посмотреть
                    </q-chip>
                  </template>
                  <template v-else-if="key === 'receivedReview'">
                    {{ driver[key] }}
                    <q-chip
                      v-if="driver.reviewTo.length"
                      clickable
                      color="teal"
                      dense
                      icon="visibility"
                      text-color="white"
                      @click.stop="openDrawer(driver.reviewTo)"
                    >
                      Посмотреть
                    </q-chip>
                  </template>
                  <template v-else>
                    {{ driver[key] }}
                  </template>
                </span>
              </template>
            </div>

            <q-btn
              :color="driver.isBlocked ? 'green' : 'red'"
              :loading="isLoadingBlocked"
              class="q-my-sm q-mb-xl"
              @click="toggleBlockedDriver"
            >
              {{ driver.isBlocked ? 'Разблокировать' : 'Заблокировать' }}
              <template v-slot:loading> Loading...</template>
            </q-btn>

            <TableOrder
              :hidden-fields="['driverId', 'city']"
              :list="driver.orders"
              :mode="ModeTable.All"
            />
          </q-card-section>
        </q-page>
      </q-page-container>
    </q-layout>
    <CardSkeleton v-else />
  </q-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import CardSkeleton from 'components/CardSkeleton.vue';
import { $API } from 'src/plugins/api';
import TableOrder from 'components/Tables/TableOrder.vue';
import { Review } from 'src/types/review.interface';
import { Notify } from 'quasar';
import { ModeTable } from 'src/types/mode.table';
import { FullDriverInfo } from 'src/types/full-driver-info.interface';
import { Driver } from 'src/types/driver.interface';
import { accessOrderTypeToRus } from 'src/types/access-order.type';
import { StatusDriver } from '../../types/status-driver.enum';

interface Props {
  modelValue: boolean;
  chatId: number;
}

interface Emits {
  (event: 'update:modelValue', value: boolean): void;
}

const fields = {
  username: 'Username',
  phone: 'Номер телефона',
  last_name: 'Фамилия',
  city: 'Город',
  address: 'Адреса',
  createdAt: 'Создан',
  leftReview: 'Оставил отзывов',
  countOrders: 'Всего заказов',
  driveCount: 'количество поездок',
  deliveryCount: 'Количество доставок',
  canceledCount: 'Отменено заказов',
  averageRating: 'Рейтинг',
  receivedReview: 'Получил отзывов',
  isBusy: 'На заказе?',
  car: 'Машина',
  priority: 'Приоритет',
  commission: 'Комиссия',
  accessOrderType: 'Тип принимаемых заказов',
  // status: 'Статус',
};

const selectedMessageList = ref<Review[]>([]);
const drawer = ref<boolean>(false);
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  chatId: 0,
});
const emit = defineEmits<Emits>();
defineOptions({
  name: 'ModalDriver',
});
const driver = ref<FullDriverInfo>();
const modal = ref<boolean>(props.modelValue);
const isLoadingBlocked = ref<boolean>(false);
const openDrawer = (list: Review[]) => {
  selectedMessageList.value = list;
  drawer.value = true;
};
const getTextForMessage = (item: Review) => {
  if ('orderId' in item) {
    return [`Заказ: ${item.orderId}`, `Текст: ${item.text}`];
  }
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
  () => props.chatId,
  () => getFullDriverInfo()
);

const toggleBlockedDriver = async () => {
  isLoadingBlocked.value = true;
  await $API.updateDriver(
    props.chatId,
    {
      isBlocked: !driver.value?.isBlocked,
    },
    (data: Driver) => {
      driver.value!.isBlocked = data.isBlocked;
    },
    (e: any) => {
      Notify.create({
        message: 'Что-то пошло не так😞...',
        color: 'negative',
        timeout: 1000,
      });
      console.log(e);
    }
  );

  isLoadingBlocked.value = false;
};

const getFullDriverInfo = () => {
  if (props.chatId === 0) return;
  $API.getFullDriverInfo(
    props.chatId,
    (data: FullDriverInfo) => {
      driver.value = data;
    },
    (e: any) => {
      Notify.create({
        message: 'Что-то пошло не так😞...',
        color: 'negative',
        timeout: 1000,
      });
      console.log(e);
    }
  );
};

onMounted(() => {
  getFullDriverInfo();
});
</script>

<style lang="scss" scoped>
.q-layout-container {
  max-width: 90vw;
}

.layout {
  &:deep(.q-page) {
    min-height: 0 !important;
  }
}
</style>
