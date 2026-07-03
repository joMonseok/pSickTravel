<template>
  <div class="page-container">
    <slot />
  </div>
</template>

<style scoped>
.page-container {
  width: min(var(--container-max-width), calc(100% - var(--space-6)));
  margin: 0 auto;
  padding: clamp(var(--space-6), 4vw, var(--space-12)) 0;
}

@media (max-width: 768px) {
  .page-container {
    width: min(100% - var(--space-3), var(--container-max-width));
    padding: var(--space-6) 0;
  }
}
</style>
