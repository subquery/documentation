<template>
  <button :class="['button', type === 'danger' ? 'buttonRed' : '']">
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
defineProps<{
  type?: "normal" | "danger";
}>();
</script>
<style lang="scss">
.button {
  display: flex;
  align-items: center;
  padding: 0 32px;
  height: 48px;
  line-height: 48px;
  border-radius: 48px;
  background: #e968dd;
  font-weight: 400;
  font-size: 16px;
  color: #fff;
  text-decoration: none !important;
  border: none;
  outline: none;
  transition: all 0.2s linear;
  cursor: pointer;
  font-family: var(--font-family);
}
.button img {
  margin-right: 8px;
}
.button:hover {
  opacity: 0.87;
}
.buttonRed {
  background: #e968dd;
}
</style>
