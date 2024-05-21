<script lang="ts" setup>
import { ref } from 'vue';
import { $API } from 'src/plugins/api';
import { ResponseType } from 'src/types/query.type';
import { City } from 'src/types/city.interface';
import { Notify } from 'quasar';

interface Emit {
  (event: 'add-city'): void;
}

const emit = defineEmits<Emit>();
const name = ref<string>('');
const minPrice = ref<number>(0);
const isLoading = ref<boolean>(false);
const error = ref<string>('');

const addCity = () => {
  error.value = '';
  if (!name.value || !minPrice.value || isLoading.value) return;
  isLoading.value = true;
  $API.addCity(
    {
      name: name.value,
      minPrice: minPrice.value,
    },
    (response: ResponseType<City>) => {
      isLoading.value = false;
      emit('add-city');
      Notify.create({
        message: '☺️ Город успешно добавлен',
        color: 'positive',
        timeout: 1500,
      });
    },
    (e: any) => {
      isLoading.value = false;
      console.log(e);
      error.value =
        e?.message[0] ?? 'Что то пошло не так, проверьте введенные вами данные';
    }
  );
};
</script>

<template>
  <div class="add">
    <p class="add__text">Добавить город</p>
    <q-input
      v-model.trim="name"
      :disable="isLoading"
      :error="!!error"
      :error-message="error"
      class="add__input"
      dense
      label="Название города"
      outlined
    />
    <q-input
      v-model.number="minPrice"
      :disable="isLoading"
      class="add__input"
      dense
      label="Минимальная стоимость"
      outlined
      @keyup.enter="addCity"
    />
    <q-btn
      :disable="isLoading || !name || !minPrice"
      class="add__button full-width q-mt-sm"
      color="primary"
      label="Добавить"
      standout
      unelevated
      @click.stop="addCity"
      @keyup.enter="addCity"
    />
  </div>
</template>

<style lang="scss" scoped>
.add {
  margin-top: 3rem;
}
</style>
