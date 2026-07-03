<script setup lang="ts">
import BaseButton from './BaseButton.vue'

defineProps<{
  title: string
  description?: string
  actionLabel?: string
}>()

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="empty-state">
    <div class="empty-state__mark" aria-hidden="true" />
    <h2>{{ title }}</h2>
    <p v-if="description">{{ description }}</p>
    <BaseButton v-if="actionLabel" variant="secondary" @click="emit('action')">
      {{ actionLabel }}
    </BaseButton>
  </div>
</template>

<style scoped>
.empty-state {
  display: grid;
  justify-items: center;
  gap: var(--space-3);
  padding: var(--space-8);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  text-align: center;
}

.empty-state__mark {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--color-surface-muted);
}

.empty-state h2 {
  margin: 0;
  color: var(--color-text-strong);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-tight);
}

.empty-state p {
  max-width: 420px;
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-loose);
}
</style>
