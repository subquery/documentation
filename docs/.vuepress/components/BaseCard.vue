<template>
  <div class="card">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
</script>

<style lang="scss">
.card {
  flex: 1;
  background: var(--dark-mode-card);
  border: 1px solid var(--dark-mode-border);
  border-radius: 8px;
  padding: 40px;
  box-sizing: border-box;
  color: #fff;
  transition: all 0.2s linear;
  height: 100%;

  &:hover {
    border: 1px solid #E968DD;
    text-decoration: none;
  }
}
</style>
