<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'default' | 'interactive'
  }>(),
  {
    variant: 'default',
  },
)
</script>

<template>
  <article class="base-card" :class="{ 'base-card--interactive': variant === 'interactive' }">
    <slot />
  </article>
</template>

<style scoped>
.base-card {
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.base-card--interactive {
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;
}

.base-card--interactive:hover,
.base-card--interactive:focus-within {
  transform: translateY(-1px);
}
</style>
