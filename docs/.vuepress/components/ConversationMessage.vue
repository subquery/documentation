<template>
  <div class="conversation-message" ref="messageAreaRef">
    <div
      v-for="(message, index) in property.messages"
      :key="index"
      :class="{
        'conversation-message-item': true,
        'conversation-message-item-lastOne':
          index === property.messages.length - 1 &&
          message.role === 'assistant',
        [answerStatus]:
          index === property.messages.length - 1 &&
          message.role === 'assistant' &&
          !message?.content?.length
            ? true
            : undefined,
        [`conversation-message-item-${message.role}`]: true,
      }"
    >
      <img
        v-if="message.role === 'assistant'"
        src="https://static.subquery.network/logo-with-bg.svg"
        width="40"
        height="40"
      />

      <div class="conversation-message-item-span">
        <div
          class="conversation-message-item-markdown"
          v-html="md.render(message.content as string)"
        ></div>
        <div
          v-if="message.role === 'assistant' && index !== 0 && message?.content"
          class="conversation-message-item-reaction"
        >
          <template v-if="answerReaction === null">
            <ThumbsUpIcon
              @click="
                () =>
                  handleReaction('like', message, property.messages[index - 1])
              "
            ></ThumbsUpIcon>
            <ThumbsDownIcon
              @click="
                () =>
                  handleReaction(
                    'dislike',
                    message,
                    property.messages[index - 1]
                  )
              "
            >
            </ThumbsDownIcon>
          </template>
          <ThumbsUpFilledIcon
            v-if="answerReaction === 'like'"
          ></ThumbsUpFilledIcon>
          <ThumbsDownFilledIcon
            v-if="answerReaction === 'dislike'"
          ></ThumbsDownFilledIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import markdownit from "markdown-it";
import { ref } from "vue";
import ThumbsUpIcon from "./icons/ThumbsUpIcon.vue";
import ThumbsDownIcon from "./icons/ThumbsDownIcon.vue";
import ThumbsDownFilledIcon from "./icons/ThumbsDownFilledIcon.vue";
import ThumbsUpFilledIcon from "./icons/ThumbsUpFilledIcon.vue";

type AiMessageType = "text" | "image_url";

type AiMessageRole = "assistant" | "user" | "system";

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
  type?: "welcome"; // welcome should filter before send
  id?: string;
  conversation_id?: string;
}

enum ChatBotAnswerStatus {
  Empty = "empty",
  Loading = "loading",
  Success = "success",
  Error = "error",
}

defineProps<{
  property: ConversationProperty;
  answerStatus: ChatBotAnswerStatus;
}>();

const emit = defineEmits<{
  (
    e: "reaction",
    reaction: "like" | "dislike",
    message: Message,
    userQuestion: Message
  ): void;
}>();

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
});

const messageAreaRef = ref<HTMLDivElement | null>(null);
const answerReaction = ref<"dislike" | "like" | null>(null);

const handleReaction = (
  reaction: "like" | "dislike",
  message: Message,
  userQuestion: Message
) => {
  answerReaction.value = reaction;
  emit("reaction", reaction, message, userQuestion);
};

const scrollDown = (onlyWhenReachBottom = false) => {
  if (onlyWhenReachBottom && messageAreaRef.value) {
    // If render an image, then not working. TODO: fix it.
    const ifReachBottom =
      messageAreaRef.value?.scrollTop >=
      messageAreaRef.value?.scrollHeight -
        messageAreaRef.value?.clientHeight -
        100;
    if (ifReachBottom) {
      messageAreaRef.value?.scrollTo(0, messageAreaRef.value?.scrollHeight);
    }

    return;
  }
  messageAreaRef.value?.scrollTo(0, messageAreaRef.value?.scrollHeight);
};

defineExpose({
  scrollDown,
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
  box-sizing: border-box;

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

      h1,
      h2,
      h3,
      p {
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

    &-reaction {
      display: flex;
      gap: 8px;
      cursor: pointer;
    }
  }

  &-item-assistant {
    .conversation-message-item-span {
      background: #333;
      font-size: 14px;
      border-top-left-radius: 0;
    }

    &.conversation-message-item-lastOne.loading {
      .conversation-message-item-markdown {
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

@media screen and (max-width: 768px) {
  .conversation-message {
    height: 100%;
  }
}

@keyframes pulseCursor {
  50% {
    opacity: 0;
  }
}
</style>
