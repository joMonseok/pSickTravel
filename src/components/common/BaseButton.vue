<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
  },
)
</script>

<template>
  <button
    class="base-button"
    :class="[`base-button--${variant}`, `base-button--${size}`]"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid rgb(17 17 17 / 16%);
  border-radius: 0;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-weight: 800;
  line-height: var(--line-height-tight);
  cursor: pointer;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    box-shadow 160ms ease;
}

.base-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.base-button:disabled {
  color: var(--color-text-tertiary);
  border-color: var(--color-border);
  background: #f5f5f5;
  cursor: not-allowed;
}

.base-button--primary {
  color: var(--color-primary-text);
  background: var(--color-primary);
}

.base-button--primary:not(:disabled):hover {
  background: var(--color-primary-hover);
}

.base-button--secondary {
  color: var(--color-text-strong);
  border-color: var(--color-border-strong);
  background: #ffffff;
}

.base-button--secondary:not(:disabled):hover {
  border-color: var(--color-primary-hover);
}

.base-button--ghost {
  color: var(--color-text-muted);
  background: transparent;
}

.base-button--ghost:not(:disabled):hover {
  color: var(--color-text-strong);
  background: rgb(17 17 17 / 5%);
}

.base-button--sm {
  min-height: 32px;
  padding: 0 var(--space-3);
  font-size: 0.9rem;
}

.base-button--md {
  min-height: 40px;
  padding: 0 var(--space-4);
  font-size: 1rem;
}

.base-button--lg {
  min-height: 48px;
  padding: 0 var(--space-5);
  font-size: 1.15rem;
}
</style>
