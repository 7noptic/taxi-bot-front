<template>
  <q-icon
    class="cursor-pointer q-pl-sm"
    name="content_copy"
    size="xs"
    @click.stop="copy(text)"
  />
</template>

<script lang="ts" setup>
import { copyToClipboard, Notify } from 'quasar';

interface Props {
  text: string;
}

withDefaults(defineProps<Props>(), {
  text: '',
});

const copy = (text: string) => {
  copyToClipboard(text)
    .then(() => {
      Notify.create({
        message: '☺️ Текст успешно скопирован',
        color: 'positive',
        timeout: 1000,
      });
    })
    .catch(() => {
      Notify.create({
        message: 'Что-то пошло не так😞...',
        color: 'negative',
        timeout: 1000,
      });
    });
};
</script>

<style scoped></style>
