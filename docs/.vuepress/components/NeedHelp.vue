<template>
  <div class="help layout mt80 mb80">
    <h3>Need Help?</h3>
    <p>
      The fastest way to get support is by joining our discord and messaging us
      in #technical-support.
    </p>
    <a class="button" href="https://discord.com/invite/subquery" target="_blank"
      ><img src="/assets/img/discord_icon.svg" />Join our Discord</a
    >
  </div>
</template>
<script setup lang="ts"></script>

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
