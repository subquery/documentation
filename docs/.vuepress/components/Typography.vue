<template>
  <component
    :class="['docsTypography', tag, size, type]"
    :is="tag ? tag : 'span'"
    :style="{
      fontWeight: weight || 500,
      maxWidth: maxWidth + 'px',
      textAlign: center ? 'center' : 'normal',
      fontFamily: !family
        ? '' // invalid value would not set, use the default set by css
        : family === 'heading'
        ? 'var(--font-family-heading)'
        : 'var(--font-family)',
    }"
  >
    <slot></slot>
  </component>
</template>
<script setup lang="ts">
defineProps<{
  maxWidth?: number;
  center?: boolean;
  weight?: number;
  size?: "text" | "large" | "medium" | "small";
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "p";
  type?: "normal" | "secondary";
  family?: "heading" | "body";
}>();
</script>

<style lang="scss">
.docsTypography {
  line-height: 1.2;
  color: #fff;
  margin: 0;
  padding: 0;

  &.h1 {
    font-size: 80px;
    font-family: var(--font-family-heading);
  }

  &.h2 {
    font-size: 80px;
    font-family: var(--font-family-heading);
  }

  &.h3 {
    font-size: 48px;
    font-family: var(--font-family-heading);
  }

  &.h4 {
    font-size: 24px;
    font-family: var(--font-family-heading);
  }

  &.h5 {
    font-size: 20px;
    font-family: var(--font-family);
  }

  &.p {
    font-size: 16px;
    font-family: var(--font-family);
  }

  &.text {
    font-size: 16px;
  }

  &.large {
    font-size: 18px;
  }

  &.medium {
    font-size: 14px;
  }

  &.small {
    font-size: 12px;
  }

  &.secondary {
    color: var(--gray-400);
  }
}
</style>
