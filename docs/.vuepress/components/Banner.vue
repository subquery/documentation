<template>
  <div
    class="flex gp24 layout mt140 bannerWithBackground"
    :style="{
      backgroundImage: `url('${backgroundUrl}')`,
    }"
  >
    <div class="flexCol gp24">
      <Typography :tag="titleTag ? titleTag : 'h35'">{{ title }}</Typography>
      <Typography tag="p" v-if="!Array.isArray(description)" type="secondary">
        {{ description }}
      </Typography>
      <template v-else>
        <Typography
          tag="p"
          v-for="desc in description"
          type="secondary"
          :key="desc"
        >
          {{ desc }}
        </Typography>
      </template>
      <div class="flex">
        <router-link class="button" :to="{ path: buttonLink }">{{
          buttonText
        }}</router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Typography from "./Typography.vue";

defineProps<{
  titleTag: "h1" | "h2" | "h3" | "h4" | "h5" | "p";
  title: String;
  description: String | String[];
  buttonText: String;
  buttonLink: String;
  backgroundUrl: String;
}>();
</script>

<style lang="scss">
.bannerWithBackground {
  background: url("");
  padding: 40px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px;
  box-sizing: border-box;
  p {
    max-width: 551px;
    font-size: 18px;
  }
}
</style>
