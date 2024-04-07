<template>
  <div
    class="flex gp24 layout mt140 bannerWithBackground"
    :style="{
      backgroundImage: `url('${backgroundUrl}')`,
    }"
  >
    <div class="flexCol gp24">
      <Typography
        :tag="titleTag ? titleTag : 'h35'"
        :font-size="titleFontSize"
        >{{ title }}</Typography
      >
      <Typography
        tag="p"
        v-if="!Array.isArray(description)"
        type="secondary"
        size="large"
        :font-size="descFontSize"
      >
        {{ description }}
      </Typography>
      <template v-else>
        <Typography
          tag="p"
          v-for="desc in description"
          type="secondary"
          :key="desc"
          size="large"
          :font-size="descFontSize"
        >
          {{ desc }}
        </Typography>
      </template>
      <div class="flex">
        <router-link :to="{ path: buttonLink }">
          <Button>
            {{ buttonText }}
          </Button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Typography from "./Typography.vue";
import Button from "./Button.vue";

defineProps<{
  titleFontSize?: number | string;
  descFontSize?: number | string;
  titleTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "p";
  title: string;
  description: string | string[];
  buttonText: string;
  buttonLink: string;
  backgroundUrl: string;
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
