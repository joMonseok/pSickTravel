<script setup lang="ts">
import AppHeader from './components/common/AppHeader.vue'
</script>

<template>
  <div class="app-shell">
    <AppHeader />

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: #ffffff;
}

.app-main {
  min-height: calc(100vh - var(--header-height));
  padding-top: var(--header-height);
}
</style>
