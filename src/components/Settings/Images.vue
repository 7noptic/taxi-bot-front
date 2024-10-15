<script lang="ts" setup>
import { ImageType } from 'src/types/image.type';
import SettingsImage from 'src/components/Settings/Image.vue';

defineOptions({
  name: 'SettingsImages',
});
</script>

<template>
  <div class="images">
    <SettingsImage
      v-for="image in Object.values(ImageType)"
      :key="image"
      :name="image"
    />
  </div>
</template>

<style lang="scss" scoped>
.images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media screen and (min-width: 1024px) and (max-width: 1279px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 969px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 699px) {
    grid-template-columns: 1fr;
  }
}
</style>
