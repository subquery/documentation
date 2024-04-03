<template>
  <div
    class="textImageSection layout mt140 bannerWithBackground"
    :style="{
      backgroundImage: `url('${backgroundUrl}')`,
    }"
  >
    <div class="ct">
      <component :is="titleTag ? titleTag : 'h3'">{{ title }}</component>
      <p v-if="!Array.isArray(description)">
        {{ description }}
      </p>
      <template v-else>
        <p v-for="desc in description" :key="desc">
          {{ desc }}
        </p>
      </template>
      <router-link class="button" :to="{ path: buttonLink }">{{
        buttonText
      }}</router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  titleTag: String;
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
