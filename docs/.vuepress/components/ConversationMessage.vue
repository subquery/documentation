<template>
  <div class="conversation-message">
    <div v-for="message, index in property.messages" :key="index" :class="{
      'conversation-message-item': true,
      'conversation-message-item-lastOne': index === property.messages.length - 1 && message.role === 'assistant',
      [answerStatus]: index === property.messages.length - 1 && message.role === 'assistant' && !message?.content?.length
        ? true
        : undefined,
      [`conversation-message-item-${message.role}`]: true
    }">
      <img v-if="message.role === 'assistant'" src="https://static.subquery.network/logo-with-bg.svg" width="40"
        height="40"></img>
      <div class="conversation-message-item-span">
        {{ message.content }}
        <!-- <Markdown.Preview>{message.content}</Markdown.Preview> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type AiMessageType = 'text' | 'image_url';

type AiMessageRole = 'assistant' | 'user' | 'system';

interface Content {
  type: AiMessageType;
  text?: string;
  image_url?: string;
}

interface ConversationProperty {
  id: string;
  name: string;
  chatUrl: string;
  messages: Message[];
  prompt: string;
}

interface Message {
  role: AiMessageRole;
  content: string | Content[];
  type?: 'welcome'; // welcome should filter before send
}

enum ChatBotAnswerStatus {
  Empty = 'empty',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

defineProps<{
  property: ConversationProperty;
  answerStatus: ChatBotAnswerStatus;
}>();
</script>

<style lang="scss">
.conversation-message {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: min(480px, calc(100vh - 520px));
  overflow: auto;
  padding: 28px 20px;
  background: #000;

  &-item {
    display: flex;
    gap: 8px;

    &-span {
      padding: 12px;
      border-radius: 8px;
      max-width: 320px;
      color: #fff;
      .subql-markdown-preview {
        display: flex;
        flex-direction: column;
        gap: 1em;

        p {
          margin: 0;
          word-break: break-word;
        }
      }
    }
  }

  &-item-assistant {
    .conversation-message-item-span {
      background: #333;
      font-size: 14px;
      border-top-left-radius: 0;
    }

    /* &--lastOne&--loading {
        .conversation-message-item-span {
          .subql-markdown-preview {
            &::after {
              content: "▍";
              align-self: flex-end;
              margin-left: 8px;
              animation: pulseCursor 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
          }
        }
      } */
  }

  &-item-user {
    justify-content: flex-end;

    .conversation-message-item-span {
      background: #fff;
      font-size: 14px;
      border-bottom-right-radius: 0;
      color: #000;
      .subql-markdown-preview {
        color: #fff;
      }
    }
  }
}
</style>
