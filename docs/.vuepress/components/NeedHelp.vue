<template>
  <div class="help layout mt80 mb80">
    <Typography tag="h3">Need Help?</Typography>
    <Typography tag="p" type="secondary">
      The fastest way to get support is by joining our discord and messaging us
      in #technical-support.
    </Typography>
    <a href="https://discord.com/invite/subquery" target="_blank">
      <Button>
        <img src="/assets/img/discord_icon.svg" />
        Join our Discord
      </Button>
    </a>
  </div>
</template>
<script setup lang="ts">
import Typography from "./Typography.vue";
import Button from "./Button.vue";
</script>

<style lang="scss">
.help {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background: var(--dark-mode-card);
  border-radius: 20px;
  box-sizing: border-box;
  border: 1px solid var(--dark-mode-border);
}
.dark .help {
  color: #2c3e50;
}
.help h3 {
  margin-bottom: 16px !important;
}
.help p {
  max-width: 678px;
  font-size: 16px !important;
  line-height: 24px !important;
  margin-bottom: 32px !important;
  text-align: center;
}
</style>
