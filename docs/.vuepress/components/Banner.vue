<template>
  <div
    class="flex gp24 layout mt140 bannerWithBackground"
    :style="{
      '--background-url': `url('${backgroundUrl}')`,
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
  padding: 40px;
  border-radius: 8px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  background: var(--background-url) no-repeat;
  overflow: hidden;
  &::after {
    display: none;
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: var(--background-url) no-repeat;
    background-size: cover;
    z-index: -1;
    opacity: 0.5;
  }

  p {
    max-width: 551px;
    font-size: 18px;
  }
}

@media screen and (max-width: 768px) {
  .bannerWithBackground {
    padding: 20px;
    background: unset;
    &::after {
      display: block;
    }
  }
}
</style>
