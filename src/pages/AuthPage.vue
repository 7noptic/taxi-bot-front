<script lang="ts" setup>
import { ref } from 'vue';
import { $API } from 'src/plugins/api';
import { useRouter } from 'vue-router';
import useUser from 'stores/user';

const router = useRouter();
const email = ref<string>('');
const password = ref<string>('');
const isLoading = ref<boolean>(false);
const error = ref<string>('');
const authStore = useUser();
const { setAccessToken, setUser } = authStore;
const login = () => {
  error.value = '';
  if (!email.value || !password.value || isLoading.value) return;
  isLoading.value = true;

  $API.login(
    { email: email.value, password: password.value },
    (data: any) => {
      setAccessToken(data.data.access_token);
      setUser({ email: data.data.email });
      isLoading.value = false;
      router.push('/');
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
  <div class="auth">
    <div class="auth__wrapper">
      <h2 class="text-primary">Авториация</h2>
      <q-input
        v-model.trim="email"
        :disable="isLoading"
        :error="!!error"
        :error-message="error"
        class="add__input"
        dense
        label="Email"
        outlined
      />
      <q-input
        v-model.trim="password"
        :disable="isLoading"
        class="add__input"
        dense
        label="Пароль"
        outlined
        type="password"
        @keyup.enter="login"
      />
      <q-btn
        :disable="isLoading || !email || !password"
        class="add__button full-width q-mt-sm"
        color="primary"
        label="Войти"
        standout
        unelevated
        @click.stop="login"
        @keyup.enter="login"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;

  &__wrapper {
    width: 100%;
    max-width: 40rem;
  }
}
</style>
