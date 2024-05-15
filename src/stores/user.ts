import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { Admin } from 'src/types/admin.interface';

export default defineStore(
  'user',
  () => {
    const userData = ref<Partial<Admin> | null>(null);
    const user = computed<Partial<Admin> | null>(() => userData.value);
    const access_token = ref<string>('');
    const persist = true;
    const setUser = (data: Partial<Admin>) => {
      userData.value = data || {};
    };

    const setAccessToken = (token: string) => {
      access_token.value = token || '';
    };

    return {
      user,
      access_token,
      setAccessToken,
      setUser,
    };
  },
  // @ts-ignore
  { persist: true }
);
