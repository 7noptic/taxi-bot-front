<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Settings } from 'src/types/settings.interface';
import { $API } from 'src/plugins/api';
import { Notify } from 'quasar';

defineOptions({
  name: 'SettingsCommission',
});

const settings = ref<Settings>();
const commission = ref<Settings['commission']>();
const isLoading = ref<boolean>(false);
const error = ref<string>('');
const hintText = ref<string>('Комиссия указывается в рублях.');

const setSettings = () => {
  error.value = '';

  if (!commission.value || commission.value > 100 || commission.value < 0) {
    error.value = 'Проверьте введенные вами данные';
    return;
  }

  $API.updateCommission(
    { commission: commission.value },

    (response: Settings) => {
      settings.value = response;
      Notify.create({
        message: '☺️ Комиссия успешно обновлена',
        color: 'positive',
        timeout: 1500,
      });
    },
    (e: any) => {
      error.value = 'Что-то пошло не так(((';
      console.log(e);
    }
  );
};

onMounted(() => {
  $API.getSettings(
    (response: Settings) => {
      settings.value = response;
    },
    (e: any) => {
      console.log(e);
    }
  );
});
</script>

<template>
  <div v-if="settings" class="commission flex items-start">
    <p class="commission__text">
      В данный момент размер комиссии составляет
      <b>{{ settings.commission }} руб.</b>
    </p>
    <q-input
      v-model.number="commission"
      :disable="isLoading"
      :error="!!error"
      :error-message="error"
      :hint="hintText"
      class="commission__input"
      dense
      label="Комиссия (руб.)"
      outlined
      @keyup.enter="setSettings"
    />
    <q-btn
      :disable="isLoading || !commission"
      class="commission__button"
      color="primary"
      label="Изменить"
      standout
      unelevated
      @click.stop="setSettings"
      @keyup.enter="setSettings"
    />
  </div>
  <q-skeleton v-else height="150px" />
</template>

<style lang="scss" scoped>
.commission {
  max-width: 600px;

  &__input {
    width: calc(100% - 150px);
  }

  &__button {
    width: 150px;
    height: 40px;
  }
}
</style>
