<template>
  <q-table
    :columns="[]"
    :pagination="{
      rowsPerPage: 10,
    }"
    :rows="[]"
    :title="title"
    class="table-order"
    row-key="name"
  />
</template>

<script lang="ts" setup>
interface Props {
  title: string;
}

withDefaults(defineProps<Props>(), {
  title: '',
});
</script>

<style lang="scss" scoped>
.table-order {
  width: 100%;
}
</style>
