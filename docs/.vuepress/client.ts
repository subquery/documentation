import { defineClientConfig } from "vuepress/client";
import Chatbox from "./components/Chatbox.vue";
import "vant/lib/index.css";

export default defineClientConfig({
  rootComponents: [Chatbox],
  enhance({ app }) {
    // app.component("Popover", Popover);
  },
});
