<script setup lang="ts">
import psickIcon from '../../../psickIcon.png'

const navItems = [
  { label: 'INPUT', to: '/input' },
  { label: 'ROUTES', to: '/courses' },
  { label: 'REPORT', to: '/places/report' },
  { label: 'ME', to: '/mypage', class: 'nav-me' },
]
</script>

<template>
  <header class="app-header">
    <RouterLink class="brand" to="/" aria-label="Psick Travel home">
      <img class="brand-mark" :src="psickIcon" alt="" aria-hidden="true" />
      <span class="brand-name">Psick Travel</span>
    </RouterLink>

    <nav class="nav" aria-label="주요 화면">
      <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" :class="item.class">
        {{ item.label }}
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
  min-height: var(--header-height);
  padding: 0 2.5rem;
  border-bottom: 1px solid rgb(17 17 17 / 10%);
  background: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  flex: 0 0 auto;
  color: var(--color-text-strong);
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
  letter-spacing: 0.02em;
}

.brand-mark {
  display: inline-block;
  width: 3rem;
  height: 3rem;
  object-fit: contain;
}

.brand-name {
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 1.7rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-2);
  min-width: 0;
  overflow-x: auto;
}

.nav a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  min-height: 2.6rem;
  padding: 0.4rem 0.8rem;
  color: rgb(17 17 17 / 45%);
  font-size: 1.12rem;
  font-weight: 800;
  letter-spacing: 0.23em;
  line-height: var(--line-height-tight);
  white-space: nowrap;
  text-transform: uppercase;
  border-bottom: 1px solid transparent;
}

.nav a.router-link-active {
  color: #111111;
  border-bottom-color: #111111;
}

.nav a.nav-me {
  min-width: 3.6rem;
  letter-spacing: 0.2em;
}

@media (max-width: 768px) {
  .app-header {
    align-items: flex-start;
    flex-direction: column;
    gap: var(--space-3);
    padding: 1rem 1rem 1rem;
  }

  .brand {
    font-size: 1.3rem;
  }

  .nav {
    justify-content: flex-start;
    width: 100%;
    overflow-x: auto;
  }
}
</style>
