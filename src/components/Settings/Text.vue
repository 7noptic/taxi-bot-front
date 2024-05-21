<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { $API } from 'src/plugins/api';
import { Settings } from 'src/types/settings.interface';
import { Notify } from 'quasar';

defineOptions({
  name: 'SettingsText',
});

const settings = ref<Settings>();
const isLoading = ref<boolean>(false);
const updateFaqText = () => {
  if (!settings.value || !settings.value.faqText) return;
  isLoading.value = true;
  $API.updateFaqText(
    {
      faqText: settings.value.faqText,
    },
    (response: Settings) => {
      settings.value = response;
      isLoading.value = false;
      Notify.create({
        message: '☺️ Текст успешно Обновлен',
        color: 'positive',
        timeout: 1500,
      });
    },
    (e: any) => {
      console.log(e);
      isLoading.value = false;
    }
  );
};

const updatePriceText = () => {
  if (!settings.value || !settings.value?.priceText) return;
  isLoading.value = true;
  $API.updatePriceText(
    {
      priceText: settings.value?.priceText,
    },
    (response: Settings) => {
      settings.value = response;
      isLoading.value = false;
      Notify.create({
        message: '☺️ Текст успешно Обновлен',
        color: 'positive',
        timeout: 1500,
      });
    },
    (e: any) => {
      console.log(e);
      isLoading.value = false;
    }
  );
};

const updateSupportText = () => {
  if (!settings.value || !settings.value?.supportText) return;
  isLoading.value = true;
  $API.updateSupportText(
    {
      supportText: settings.value?.supportText,
    },
    (response: Settings) => {
      settings.value = response;
      isLoading.value = false;
      Notify.create({
        message: '☺️ Текст успешно Обновлен',
        color: 'positive',
        timeout: 1500,
      });
    },
    (e: any) => {
      console.log(e);
      isLoading.value = false;
    }
  );
};

const updateAboutText = () => {
  if (!settings.value || !settings.value?.aboutText) return;
  isLoading.value = true;
  $API.updateAboutText(
    {
      aboutText: settings.value?.aboutText,
    },
    (response: Settings) => {
      settings.value = response;
      isLoading.value = false;
      Notify.create({
        message: '☺️ Текст успешно Обновлен',
        color: 'positive',
        timeout: 1500,
      });
    },
    (e: any) => {
      console.log(e);
      isLoading.value = false;
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
  <q-chip class="text q-mb-md">
    Чтобы выделить текст &nbsp;<b>жирным</b> &nbsp;заключите его между
    тегами&nbsp;
    <code>{{ `<b>Ваш текст</b>`}}</code>
  </q-chip>
  <div v-if="!!settings" class="container">
    <div class="item">
      <h4 class="item__title" v-text="'Текст для Вопрос-ответ'" />

      <q-input
        v-model="settings.faqText"
        autogrow
        class="q-mb-sm item__input"
        filled
      />
      <q-btn
        :disable="isLoading || !settings.faqText"
        class="full-width item__button"
        color="primary"
        label="Изменить"
        standout
        unelevated
        @click.stop="updateFaqText"
        @keyup.enter="updateFaqText"
      />
    </div>
    <q-separator class="separator" />
    <div class="item">
      <h4 class="item__title" v-text="'Текст для 💵 Стоимость услуг'" />

      <q-input
        v-model="settings.priceText"
        autogrow
        class="q-mb-sm item__input"
        filled
      />
      <q-btn
        :disable="isLoading || !settings.priceText"
        class="full-width item__button"
        color="primary"
        label="Изменить"
        standout
        unelevated
        @click.stop="updatePriceText"
        @keyup.enter="updatePriceText"
      />
    </div>

    <q-separator class="separator" />
    <div class="item">
      <h4 class="item__title" v-text="'Текст для Обратиться в поддержку'" />

      <q-input
        v-model="settings.supportText"
        autogrow
        class="q-mb-sm item__input"
        filled
      />
      <q-btn
        :disable="isLoading || !settings.supportText"
        class="full-width item__button"
        color="primary"
        label="Изменить"
        standout
        unelevated
        @click.stop="updateSupportText"
        @keyup.enter="updateSupportText"
      />
    </div>

    <q-separator class="separator" />
    <div class="item">
      <h4 class="item__title" v-text="'Текст для ℹ️0 сервисе'" />

      <q-input
        v-model="settings.aboutText"
        autogrow
        class="q-mb-sm item__input"
        filled
      />
      <q-btn
        :disable="isLoading || !settings.aboutText"
        class="full-width item__button"
        color="primary"
        label="Изменить"
        standout
        unelevated
        @click.stop="updateAboutText"
        @keyup.enter="updateAboutText"
      />
    </div>
  </div>
  <q-skeleton v-else height="150px" />
</template>

<style lang="scss" scoped>
.item {
  max-width: 600px;
  margin-bottom: 3rem;
}

.separator {
  margin-bottom: 3rem;
}
</style>
