<template>
  <div :class="['chatbox', showPopover ? 'open' : '']">
    <Popover v-model:show="showPopover" placement="top-end" :show-arrow="false">
      <div class="content">
        <div class="content-top">
          <div class="content-icon">
            <ChatCloseIcon></ChatCloseIcon>
          </div>
          <Typography tag="h5" type="dark">SubQuery AI</Typography>
          <IoClose
            class="content-close-icon"
            @click="
              () => {
                showPopover = false;
              }
            "
          ></IoClose>
        </div>
        <div class="content-main">
          <ConversationMessage
            :property="currentChat"
            :answerStatus="answerStatus"
            version="chatbox"
            ref="{messageRef}"
          ></ConversationMessage>
        </div>
        <div class="content-bottom">
          <Field
            v-model="inputValue"
            class="content-input"
            placeholder="Ask a question..."
            @keyup.enter="() => sendMessage()"
          >
            <template #right-icon class="input-right">
              <SubmitIcon
                @click="() => sendMessage()"
                style="font-size: 32px; color: #fff"
              ></SubmitIcon>
            </template>
          </Field>
          <Typography size="small" variant="small" type="secondary">
            This AI App is powered by the
            <Typography
              tag="a"
              href="https://academy.subquery.network/ai/welcome.html"
            >
              SubQuery Network AI App Framework
            </Typography>
          </Typography>
        </div>
      </div>
      <template #reference>
        <ChatCloseIcon class="close-icon"></ChatCloseIcon>
        <Icon
          class="open-icon"
          name="arrow-down"
          style="font-size: 32px"
        ></Icon>
      </template>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, Icon, Field } from "vant";
import { ref } from "vue";
import ChatCloseIcon from "./icons/ChatCloseIcon.vue";
import Typography from "./Typography.vue";
import SubmitIcon from "./icons/SubmitIcon.vue";
import ConversationMessage from "./ConversationMessage.vue";

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
}

enum ChatBotAnswerStatus {
  Empty = "empty",
  Loading = "loading",
  Success = "success",
  Error = "error",
}

// const chatUrl = "https://ai.thechaindata.com/v1/chat/completions";
const chatUrl = "https://olla.wk.zohu.vip:8008/v1/chat/completions";
const showPopover = ref(false);
const inputValue = ref("");
const answerStatus = ref(ChatBotAnswerStatus.Loading);
const currentChat = ref<ConversationProperty>({
  messages: [
    {
      role: "assistant",
      content:
        "Hi, I’m SubQuery AI, how can I help? you can ask me anything you want",
      type: "welcome",
    },
  ],
  id: "0",
  name: "SubQuery AI",
  chatUrl,
  prompt: "",
});

const chatWithStream = async (
  url: string,
  body: { messages: Message[]; model?: string }
) => {
  const { model = "gemma2" } = body;
  const res = await fetch(url, {
    headers: {
      accept: "text/event-stream",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      model,
      messages: body.messages,
      stream: true,
    }),
  });
  return res;
};

const pushNewMsgToChat = async (
  newChat: ConversationProperty,
  newMessage: Message
) => {
  currentChat.value = {
    ...newChat,
    messages: [...newChat.messages, newMessage],
  };
};

const sendMessage = async () => {
  answerStatus.value = ChatBotAnswerStatus.Loading;
  const curChat = currentChat.value;
  try {
    const newMessage = {
      role: "user" as const,
      content: inputValue.value,
    };

    const newChat = {
      ...curChat,
      messages: [...curChat.messages, newMessage].filter((i) => i.content),
      name: curChat.messages.length
        ? curChat.name
        : inputValue.value.slice(0, 40),
    };
    newChat.chatUrl =
      newChat.messages.length - 1 > 0 ? newChat.chatUrl : chatUrl;
    newChat.prompt = newChat.prompt || "";

    const robotAnswer: Message = {
      role: "assistant" as const,
      content: "",
    };

    inputValue.value = "";
    await pushNewMsgToChat(newChat, robotAnswer);
    // messageRef.current?.scrollToBottom();
    // set user's message first, then get the response
    const res = await chatWithStream(newChat.chatUrl, {
      messages: newChat.prompt
        ? [
            { role: "system" as const, content: newChat.prompt },
            ...newChat.messages,
          ]
        : newChat.messages,
    });

    if (res.status === 200 && res.body) {
      const decoder = new TextDecoder();
      const reader = res.body.getReader();
      let invalidJson = "";

      while (true) {
        const { value, done } = await reader.read();
        const chunkValue = decoder.decode(value);

        if (done || !chunkValue) {
          break;
        }

        const parts = chunkValue.split("\n\n");
        for (const part of parts) {
          if (invalidJson) {
            try {
              invalidJson += part;
              const parsed: { choices: { delta: { content: string } }[] } =
                JSON.parse(invalidJson);
              robotAnswer.content += parsed?.choices?.[0]?.delta?.content;
              await pushNewMsgToChat(newChat, robotAnswer);
              // messageRef.current?.scrollToBottom(true);
              invalidJson = "";
            } catch (e) {
              // handle it until
            }
            continue;
          }

          const partWithHandle = part.startsWith("data: ")
            ? part.slice(6, part.length).trim()
            : part;

          if (partWithHandle) {
            try {
              const parsed: { choices: { delta: { content: string } }[] } =
                JSON.parse(partWithHandle);
              robotAnswer.content += parsed?.choices?.[0]?.delta?.content;

              await pushNewMsgToChat(newChat, robotAnswer);
              // messageRef.current?.scrollToBottom(true);
            } catch (e) {
              invalidJson += partWithHandle;
            }
          }
        }
      }

      if (invalidJson) {
        try {
          const parsed: { choices: { delta: { content: string } }[] } =
            JSON.parse(invalidJson);
          robotAnswer.content += parsed?.choices?.[0]?.delta?.content;

          await pushNewMsgToChat(newChat, robotAnswer);
        } catch (e) {
          console.warn("Reach this code", invalidJson);
          // to reach this code, it means the response is not valid or the code have something wrong.
        }
      }
    } else {
      robotAnswer.content = "Sorry, The Server is not available now.";
      await pushNewMsgToChat(newChat, robotAnswer);

      // setAnswerStatus(ChatBotAnswerStatus.Error);
      answerStatus.value = ChatBotAnswerStatus.Error;
    }
    // inputRef.current?.focus();
    answerStatus.value = ChatBotAnswerStatus.Success;
  } catch (e) {
    console.error(e);
    // inputRef.current?.focus();
    answerStatus.value = ChatBotAnswerStatus.Error;
  }
};
</script>

<style lang="scss">
.chatbox {
  .van-popover__wrapper {
    position: fixed;
    right: 1rem;
    bottom: 8rem;
    background: #fff;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    filter: contrast(20);

    &:hover {
      box-shadow: 0px 0px 20px 0px #e968ddb2;
    }

    .open-icon,
    .close-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      will-change: filter;
      transition: all 0.4s ease-in-out;
      filter: blur(0px);
      color: #000;
    }

    .open-icon {
      filter: blur(5px);
    }
  }
}

.open.chatbox {
  .van-popover__wrapper {
    .open-icon {
      filter: blur(0px);
    }
    .close-icon {
      filter: blur(5px);
    }
  }
}

.content {
  width: 480px;
  display: flex;
  flex-direction: column;
  &-top {
    padding: 22px;
    background: #eb72e0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    position: relative;
    box-sizing: border-box;
  }

  &-icon {
    width: 60px;
    height: 60px;
    background: #000;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-close-icon {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 32px;
    color: #000;
    cursor: pointer;
  }

  &-input.content-input {
    height: 48px;
    border-radius: 48px;
    font-size: 16px;
    color: #fff;
    background: #333;
    padding: 12px;
    border-color: var(--sq-gray300);

    &::after {
      display: none;
    }

    .van-cell__value {
      height: 24px;

      .van-field__body {
        height: 100%;
      }

      .van-field__right-icon {
        height: 32px;
      }
    }

    .van-field__control {
      color: #fff;
    }
  }

  &-bottom {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    background: #000;
  }
}
</style>
