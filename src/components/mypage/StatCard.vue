<script setup lang="ts">
import BaseCard from '../common/BaseCard.vue'

defineProps<{
  label: string
  value: string | number
  description?: string
}>()
</script>

<template>
  <BaseCard>
    <div class="stat-card">
      <p class="label">{{ label }}</p>
      <strong>{{ value }}</strong>
      <p v-if="description" class="description">{{ description }}</p>
    </div>
  </BaseCard>
</template>

<style scoped>
.stat-card {
  display: grid;
  gap: var(--space-2);
}

.label {
  margin: 0;
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
  font-weight: 700;
}

strong {
  color: var(--color-text-strong);
  font-size: var(--font-size-xl);
  line-height: var(--line-height-tight);
}

.description {
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-base);
}
</style>
