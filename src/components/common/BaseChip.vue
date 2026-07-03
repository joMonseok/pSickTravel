<script setup lang="ts">
withDefaults(
  defineProps<{
    selected?: boolean
    disabled?: boolean
  }>(),
  {
    selected: false,
    disabled: false,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    class="base-chip"
    :class="{ 'base-chip--selected': selected }"
    type="button"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-chip {
  min-height: 56px;
  padding: 0 2rem;
  border: 1px solid rgb(17 17 17 / 12%);
  border-radius: 0;
  color: #111111;
  background: transparent;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  letter-spacing: 0.05em;
}

.base-chip:hover:not(:disabled):not(.base-chip--selected) {
  background: rgb(17 17 17 / 4%);
}

.base-chip--selected {
  color: #ffffff;
  border-color: #111111;
  background: #111111;
}

.base-chip--selected:hover:not(:disabled) {
  color: #ffffff;
  border-color: #111111;
  background: #111111;
}

.base-chip:disabled {
  color: rgb(17 17 17 / 30%);
  background: transparent;
  cursor: not-allowed;
}
</style>
