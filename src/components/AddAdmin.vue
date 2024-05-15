<script lang="ts" setup>
import { ref } from 'vue';
import { $API } from 'src/plugins/api';
import { ResponseType } from 'src/types/query.type';
import { City } from 'src/types/city.interface';

interface Emit {
  (event: 'add-admin'): void;
}

const emit = defineEmits<Emit>();
const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const isLoading = ref<boolean>(false);
const error = ref<string>('');

const addCity = () => {
  error.value = '';
  if (!name.value || !email.value || isLoading.value || !password.value) return;
  isLoading.value = true;
  $API.addAdmin(
    {
      name: name.value,
      email: email.value,
      password: password.value,
    },
    (response: ResponseType<City>) => {
      isLoading.value = false;
      emit('add-admin');
      console.log(response);
      name.value = '';
      email.value = '';
      password.value = '';
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
    <p class="add__text">Добавить администратора</p>
    <q-input
      v-model.trim="name"
      :disable="isLoading"
      :error="!!error"
      class="add__input"
      dense
      label="Имя"
      outlined
    />
    <q-input
      v-model.trim="email"
      :disable="isLoading"
      :error="!!error"
      class="add__input"
      dense
      label="Email"
      outlined
      @keyup.enter="addCity"
    />
    <q-input
      v-model.trim="password"
      :disable="isLoading"
      :error="!!error"
      class="add__input"
      dense
      label="Пароль"
      outlined
      type="password"
    />
    <q-btn
      :disable="isLoading || !name || !email || !password"
      class="add__button full-width q-mt-sm"
      color="primary"
      label="Добавить"
      standout
      unelevated
      @click.stop="addCity"
      @keyup.enter="addCity"
    />
    <p class="text-negative" v-text="error" />
  </div>
</template>

<style lang="scss" scoped>
.add {
  margin-top: 3rem;
}
</style>
