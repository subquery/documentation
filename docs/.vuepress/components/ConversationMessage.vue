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
      <div class="conversation-message-item-span" v-html="md.render(message.content)">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import markdownit from 'markdown-it';
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

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true
});


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
      display: flex;
      flex-direction: column;
      gap: 1em;
      word-break: break-word;

      code {
        background-color: #ffffff1a;
        border: 1px solid #ffffff1a;
        border-radius: 6px;
        padding: 2px 4px;
      }

      pre {
        background-color: rgba(138, 208, 255, 0.1);
        padding: 16px;
        border-radius: 12px;
        overflow: auto;
        code {
          background: transparent;
          border: none;
          padding: 0;
          border-radius: 0;
        }
      }

      h1,h2,h3,p {
        margin: 0;
        word-break: break-word;
      }


      ul {
        margin: 0;
        padding-left: 16px;
        list-style: disc;
      }

      img {
        max-width: 100%;
      }
    }
  }

  &-item-assistant {
    .conversation-message-item-span {
      background: #333;
      font-size: 14px;
      border-top-left-radius: 0;
    }

    &.conversation-message-item-lastOne.loading {
        .conversation-message-item-span {
          &::after {
            content: "▍";
            align-self: flex-end;
            margin-left: 8px;
            animation: pulseCursor 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        }
      }
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

@keyframes pulseCursor {
  50% {
    opacity: 0;
  }
}
</style>
