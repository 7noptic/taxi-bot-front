<template>
  <q-page class="row justify-evenly items-start q-pa-lg">
    <q-card class="card">
      <q-card-section>
        <h2 class="card__title" v-text="'Рассылка'" />

        <div class="item">
          <h4 class="item__title" v-text="'Сообщение для пользователей'" />
          <q-select
            v-model="type"
            :options="Object.values(NewsletterType)"
            autogrow
            class="q-mb-sm item__input"
            filled
          >
            <template #selected-item="prop"> {{ labels[prop.opt] }}</template>
          </q-select>
          <q-input
            v-model="message"
            autogrow
            class="q-mb-sm item__input"
            filled
          />
          <q-btn
            :disable="isLoading || !message"
            class="full-width item__button"
            color="primary"
            label="Отправить"
            standout
            unelevated
            @click.stop="senNews"
            @keyup.enter="senNews"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { $API } from 'src/plugins/api';
import { SendNewsDto } from 'src/types/sendNews.dto';
import { NewsletterType } from 'src/types/newsletter.type';

const message = ref<string>('');
const type = ref<string>(NewsletterType.All);
const isLoading = ref<boolean>();
const labels = ref<Record<NewsletterType, string>>({
  [NewsletterType.All]: 'Всем пользователям',
  [NewsletterType.Drivers]: 'Водителям',
  [NewsletterType.Passengers]: 'Пассажирам',
});
const senNews = () => {
  const dto: SendNewsDto = {
    type: type.value,
    message: message.value,
  };

  $API.sendNews(
    dto,
    (data: any) => {
      console.log(data);
    },
    (e: any) => console.log(e)
  );
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;

  &__title {
    font-size: 3.2rem;
    font-weight: 700;
    margin-bottom: 2.4rem;
  }
}

.item {
  max-width: 600px;
}

.admins {
  display: grid;
  grid-template-columns: 0.65fr 0.35fr;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
