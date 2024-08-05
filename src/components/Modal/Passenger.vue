<template>
  <q-dialog v-model="modal">
    <q-layout
      v-if="passenger"
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
              {{ passenger.first_name || passenger.username || 'Пользователь' }}
              <b>({{ passenger.chatId }})</b>
            </div>
            <q-btn
              :loading="isLoading"
              class="q-my-sm q-ml-md"
              color="red"
              size="xs"
              @click="deletePassenger"
            >
              Удалить пользователя
            </q-btn>
            <q-space />
            <q-btn v-close-popup dense flat icon="close" round />
          </q-card-section>

          <q-card-section>
            <div v-for="(value, key) in fields" :key="key" class="table-item">
              <template v-if="passenger[key]">
                <b>{{ value }}: </b>
                <span>
                  <template v-if="key === 'averageRating'">
                    {{ passenger[key].toFixed(2) }}
                  </template>
                  <template v-else-if="key === 'createdAt'">
                    {{ new Date(passenger[key]).toLocaleDateString('ru-RU') }}
                  </template>

                  <template v-else-if="key === 'address'">
                    {{ passenger[key].length }}
                    <q-chip
                      v-if="passenger[key].length"
                      clickable
                      color="teal"
                      dense
                      icon="visibility"
                      text-color="white"
                      @click.stop="openDrawer(passenger.address)"
                    >
                      Посмотреть
                    </q-chip>
                  </template>
                  <template v-else-if="key === 'notes'">
                    {{ passenger[key]?.length }}
                    <q-chip
                      v-if="passenger.notes.length"
                      clickable
                      color="teal"
                      dense
                      icon="visibility"
                      text-color="white"
                      @click.stop="openDrawer(passenger.notes)"
                    >
                      Посмотреть
                    </q-chip>
                    <q-chip
                      clickable
                      color="teal"
                      dense
                      icon="edit"
                      text-color="white"
                      @click.stop="isVisibleNoteField = !isVisibleNoteField"
                    >
                      Оставить заметку
                    </q-chip>

                    <div v-if="isVisibleNoteField" style="max-width: 500px">
                      <q-input
                        v-model="note"
                        filled
                        label="Заметка"
                        placeholder="Введите текст заметки"
                        type="textarea"
                      />
                      <q-btn @click="sendNote"> Оставить </q-btn>
                    </div>
                  </template>
                  <template v-else-if="key === 'leftReview'">
                    {{ passenger[key] }}
                    <q-chip
                      v-if="passenger.reviewFrom.length"
                      clickable
                      color="teal"
                      dense
                      icon="visibility"
                      text-color="white"
                      @click.stop="openDrawer(passenger.reviewFrom)"
                    >
                      Посмотреть
                    </q-chip>
                  </template>
                  <template v-else-if="key === 'receivedReview'">
                    {{ passenger[key] }}
                    <q-chip
                      v-if="passenger.reviewTo.length"
                      clickable
                      color="teal"
                      dense
                      icon="visibility"
                      text-color="white"
                      @click.stop="openDrawer(passenger.reviewTo)"
                    >
                      Посмотреть
                    </q-chip>
                  </template>
                  <template v-else>
                    {{ passenger[key] }}
                  </template>
                </span>
              </template>
            </div>

            <q-btn
              :color="passenger.isBlocked ? 'green' : 'red'"
              :loading="isLoadingBlocked"
              class="q-my-sm q-mb-xl"
              @click="toggleBlockedPassenger"
            >
              {{ passenger.isBlocked ? 'Разблокировать' : 'Заблокировать' }}
              <template v-slot:loading> Loading...</template>
            </q-btn>

            <TableOrder
              :hidden-fields="['passengerId', 'city']"
              :list="passenger.orders"
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
import { inject, onMounted, ref, watch } from 'vue';
import { Address, Passenger } from 'src/types/passenger.interface';
import CardSkeleton from 'components/CardSkeleton.vue';
import { $API } from 'src/plugins/api';
import TableOrder from 'components/Tables/TableOrder.vue';
import { FullPassengerInfo } from 'src/types/full-passenger-info.interface';
import { Review } from 'src/types/review.interface';
import { EventBus, Notify } from 'quasar';
import { ModeTable } from 'src/types/mode.table';
import { Note } from 'src/types/note';
import { CreateNoteDto } from 'src/types/create-note.dto';

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
  notes: 'Заметки',
};

const selectedMessageList = ref<Address[] | Review[] | Note[]>([]);
const drawer = ref<boolean>(false);
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  chatId: 0,
});
const isVisibleNoteField = ref<boolean>(false);
const note = ref<string>('');
const emit = defineEmits<Emits>();
defineOptions({
  name: 'ModalPassenger',
});
const passenger = ref<FullPassengerInfo>();
const modal = ref<boolean>(props.modelValue);
const isLoadingBlocked = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const openDrawer = (list: Address[] | Review[]) => {
  selectedMessageList.value = list;
  drawer.value = true;
};
const getTextForMessage = (item: Address | Review | Note) => {
  if ('address' in item) {
    return [`Название: ${item.name}`, `Адрес: ${item.address}`];
  } else if ('orderId' in item) {
    return [`Заказ: ${item.orderId}`, `Текст: ${item.text}`];
  }
  if ('chatId' in item) {
    return [item.text];
  }
};

const sendNote = () => {
  const dto: CreateNoteDto = {
    chatId: passenger.value?.chatId as number,
    text: note.value,
  };

  $API.sendNotes(
    dto,
    (data: any) => {
      console.log(data);
      Notify.create({
        message: 'Заметка успешно отправлена',
        color: 'positive',
        timeout: 1000,
      });
      getFullPassengerInfo();
      isVisibleNoteField.value = false;
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
  () => props.chatId,
  () => getFullPassengerInfo()
);

const toggleBlockedPassenger = async () => {
  isLoadingBlocked.value = true;
  await $API.updatePassenger(
    props.chatId,
    {
      isBlocked: !passenger.value?.isBlocked,
    },
    (data: Passenger) => {
      passenger.value!.isBlocked = data.isBlocked;
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

const getFullPassengerInfo = () => {
  if (props.chatId === 0) return;
  $API.getFullPassengerInfo(
    props.chatId,
    (data: FullPassengerInfo) => {
      passenger.value = data;
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

const bus = <EventBus>inject('bus');

const deletePassenger = () => {
  isLoading.value = true;

  $API.deletePassenger(
    passenger.value?.chatId as number,
    (data: Passenger) => {
      console.log(data);
      if (!!data) {
        bus.emit('update-passengers');
        modal.value = false;
        isLoading.value = false;
        Notify.create({
          message: 'Пользователь успешно удален',
          color: 'positive',
          timeout: 1000,
        });
      } else {
        Notify.create({
          message: 'Что-то пошло не так😞...',
          color: 'negative',
          timeout: 1000,
        });
        isLoading.value = false;
      }
    },
    (e: any) => {
      Notify.create({
        message: 'Что-то пошло не так😞...',
        color: 'negative',
        timeout: 1000,
      });
      console.log(e);
      isLoading.value = false;
    }
  );
};

onMounted(() => {
  getFullPassengerInfo();
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
