<script lang="ts" setup>
import { Appeal } from 'src/types/appeal.interface';
import { inject, onMounted, ref, watch } from 'vue';
import { $API } from 'src/plugins/api';
import { SendMessageDto } from 'src/plugins/dto/send-message.dto';
import { ResponseType } from 'src/types/query.type';
import CopyText from 'components/CopyText.vue';
import { StatusAppeal } from 'src/types/status.appeal.enum';

interface Props {
  appeal: Appeal | undefined;
}

interface Emit {
  (event: 'update:appeal', appeal: Appeal): void;
}

const bus: any = inject('bus'); // inside setup()
const emit = defineEmits<Emit>();
const props = withDefaults(defineProps<Props>(), {
  appeal: undefined,
});
const chat = ref<HTMLElement | null>(null);
const scrollToBottom = () => {
  setTimeout(() => {
    chat.value = document.querySelector('#chat');
    if (!chat.value) return;
    chat.value.scrollTo({ top: chat.value.scrollHeight });
  }, 10);
};

const sendMessage = () => {
  if (!chat.value || !text.value) return;
  const dto: SendMessageDto = {
    from: 'admin',
    text: text.value,
    chatId: props.appeal!.from,
  };
  $API.sendMessage(
    props.appeal!._id,
    dto,
    (response: ResponseType<Appeal>) => {
      emit('update:appeal', response.data);
      text.value = '';
    },
    (e: any) => {
      console.log(e);
    }
  );
};

const closeAppeal = () => {
  if (!chat.value || props.appeal!.status === StatusAppeal.Close) return;

  $API.closeAppealByChatId(
    props.appeal!.from,
    (response: Appeal) => {
      emit('update:appeal', response);
      text.value = '';
    },
    (e: any) => {
      console.log(e);
    }
  );
};
const text = ref<string>('');
onMounted(() => {
  chat.value = document.getElementById('chat');
  scrollToBottom();
});

watch(
  () => props.appeal,
  () => scrollToBottom()
);
</script>

<template>
  <q-card v-if="appeal" class="chat">
    <q-card-section class="chat-header">
      <div class="chat-header-item">
        <span class="chat-header-item__title" v-text="'Обратился'" />:&nbsp;
        <b class="chat-header-item__text" v-text="appeal.from" />
        <CopyText :text="appeal.from?.toString()" />
      </div>
      <div class="chat-header-item">
        <span class="chat-header-item__title" v-text="'Номер заказа'" />:&nbsp;
        <b class="chat-header-item__text" v-text="appeal.numberOrder" />
        <CopyText :text="appeal.numberOrder?.toString()" />
      </div>
      <q-chip
        :class="{
          'chat-header__success--active': appeal.status == StatusAppeal.Close,
        }"
        :clickable="appeal.status == StatusAppeal.Open"
        class="chat-header__success"
        color="green"
        dense
        text-color="white"
        @click="closeAppeal"
        >✅ Проблема решена
      </q-chip>
    </q-card-section>
    <div id="chat" ref="chat" class="chat-body">
      <template
        v-for="(item, index) in [...appeal?.messages].reverse()"
        :key="index"
      >
        <q-chat-message
          :bg-color="item.from === 'admin' ? 'blue' : 'green'"
          :sent="item.from === 'admin'"
          :stamp="
            item?.date ? new Date(item?.date).toLocaleString() : undefined
          "
          :text="[item.text]"
        />
      </template>
    </div>
    <q-card-section class="chat-footer">
      <q-input
        v-model="text"
        :disable="appeal.status === StatusAppeal.Close"
        :label="
          appeal.status === StatusAppeal.Close
            ? 'Обращение закрыто'
            : 'Введите текст'
        "
        class="chat-footer__input"
        outlined
        @keyup.enter="sendMessage"
      />
      <q-btn
        :disable="appeal.status === StatusAppeal.Close"
        class="chat-footer__button"
        label="Отправить"
        standout
        @click.stop="sendMessage"
        @keyup.enter="sendMessage"
      />
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
$height: 5.6rem;

.chat {
  height: 100%;
  width: 100%;

  &-header {
    height: 7.4rem;
    background-color: rgba(#000, 0.1);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;

    &__success {
      position: absolute;
      right: 0;
      top: 100%;
      opacity: 0.5;
      z-index: 2;

      &:not(.chat-header__success--active) {
        cursor: pointer;
      }

      &--active,
      &:hover {
        opacity: 1;
      }
    }

    &-item {
      margin-right: 1.4rem;
      display: flex;
      align-items: center;
      white-space: nowrap;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &-body {
    height: calc(100% - $height - 7.4rem);
    min-height: 300px;
    overflow: hidden auto;
    max-height: 512px;
    padding: 3rem;

    &::-webkit-scrollbar {
      width: 0.1rem;
    }

    &::-webkit-scrollbar-thumb {
      background: $dark;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }

  &-footer {
    display: flex;
    width: 100%;
    padding: 0;
    height: $height;

    &__input {
      width: 100%;
    }

    &__button {
      width: 150px;
    }
  }
}
</style>
