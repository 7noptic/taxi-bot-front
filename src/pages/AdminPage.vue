<template>
  <q-page class="row justify-evenly items-start q-pa-lg">
    <q-card class="card">
      <q-card-section>
        <h2 class="card__title" v-text="'Админы'" />

        <div class="admins">
          <TableSkeleton v-if="isLoadingTable" title="админы" />
          <TableAdmin
            v-else
            :key="pagination"
            :list="admins"
            :loading="isLoading"
            :pagination="pagination"
            @update="getCities(pagination.currentPage)"
            @select-page="(page) => getCities(page)"
          />
          <AddAdmin @add-admin="getCities(pagination.currentPage)" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { PaginationType, ResponseType } from 'src/types/query.type';
import { $API } from 'src/plugins/api';
import { Admin } from 'src/types/admin.interface';
import TableAdmin from 'components/Tables/TableAdmin.vue';
import TableSkeleton from 'components/Tables/TableSkeleton.vue';
import AddAdmin from 'components/AddAdmin.vue';

const admins = ref<Admin[]>([]);
const pagination = ref<PaginationType>({
  currentPage: 1,
  perPageCount: 10,
  total: 10,
});
const isLoading = ref<boolean>(false);
const isLoadingTable = ref<boolean>(false);

const getCities = async (currentPage: number) => {
  isLoading.value = true;
  await $API.getAdmins(
    {
      currentPage,
    },
    (response: ResponseType<Admin[]>) => {
      admins.value = response.data;
      pagination.value = {
        currentPage: response.currentPage,
        perPageCount: response.perPageCount,
        total: response.total,
      };
      isLoadingTable.value = false;
      isLoading.value = false;
    },
    (e: any) => {
      isLoading.value = false;
      console.log(e);
    }
  );
};

onMounted(async () => {
  isLoadingTable.value = true;
  await getCities(1);
});
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

.admins {
  display: grid;
  grid-template-columns: 0.65fr 0.35fr;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
