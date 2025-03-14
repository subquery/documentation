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
      fontSize: fontSize ? fontSize + 'px' : '',
    }"
    :href="href"
  >
    <slot></slot>
  </component>
</template>
<script setup lang="ts">
defineProps<{
  maxWidth?: number | string;
  center?: boolean;
  weight?: number | string;
  size?: "text" | "large" | "medium" | "small";
  tag?: "h1" | "h2" | "h3" | "h35" | "h4" | "h5" | "p" | "a";
  type?: "normal" | "secondary" | "dark";
  family?: "heading" | "body";
  fontSize?: number | string;
  href?: string;
}>();
</script>

<style lang="scss">
.docsTypography {
  line-height: 1.2;
  color: #fff;
  margin: 0;
  padding: 0;
  border: 0;
  transition: all 0.2s linear;
  &.a {
    &:hover {
      color: var(--primary);
    }
    text-decoration: none;
  }

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

  &.h35 {
    font-size: 32px;
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

  &.dark {
    color: #000;
  }
}

@media screen and (max-width: 768px) {
  .docsTypography {
    max-width: 100% !important;
    &.h1 {
      font-size: 40px;
    }

    &.h2 {
      font-size: 40px;
    }

    &.h3 {
      font-size: 36px;
    }
  }
}
</style>
