<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { $API } from 'src/plugins/api';

defineOptions({
  name: 'SettingsImage',
});

interface Props {
  name: string;
}

const $q = useQuasar();
const image = ref<File | null>();
const props = defineProps<Props>();
const uploadImage = async () => {
  if (!image.value) {
    $q.notify({
      type: 'warning',
      message: 'Выберите изображение',
    });
    return;
  }

  const formData = new FormData();
  formData.append('files', image.value, `${props.name}.jpg`); // Переименование файла
  $API.uploadFile(
    formData,
    () => {
      $q.notify({
        type: 'positive',
        message: 'Изображение успешно загружено',
      });
      forceImageReload();
      image.value = null;
    },
    (e: any) => {
      $q.notify({
        type: 'negative',
        message: 'Ошибка при загрузке изображения',
      });
    }
  );
};
const forceImageReload = () => {
  const imgElement = document.querySelector<HTMLImageElement>(
    `.image-item__image--${props.name}`
  );
  if (imgElement) {
    imgElement.src = `${imgElement.src}?${Date.now()}`;
  }
};

onMounted(() => {
  forceImageReload();
});
</script>

<template>
  <div class="image-item">
    <img
      :class="`image-item__image image-item__image--${name}`"
      :src="`http://taxi-bot-backend.ru:3000/static/images/${name}.jpg`"
      alt=""
    />

    <q-file
      v-model="image"
      accept=".jpg"
      dense
      label="Загрузить новое изображение"
      outlined
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
    <q-btn :disable="!image" color="primary" @click="uploadImage"
      >Изменить изображение
    </q-btn>
  </div>
</template>

<style lang="scss" scoped>
.image {
  &-item {
    border: 1px solid $primary;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    &__image {
      max-width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
}
</style>
