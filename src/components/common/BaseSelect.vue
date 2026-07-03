<script setup lang="ts">
defineProps<{
  modelValue: string | number
  label?: string
  placeholder?: string
  options: Array<{
    label: string
    value: string | number
  }>
  error?: string
  helperText?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleChange = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <label class="field">
    <span v-if="label" class="field-label">{{ label }}</span>
    <select
      class="field-control"
      :class="{ 'field-control--error': error }"
      :value="modelValue"
      :disabled="disabled"
      @change="handleChange"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <span v-if="error" class="field-message field-message--error">{{ error }}</span>
    <span v-else-if="helperText" class="field-message">{{ helperText }}</span>
  </label>
</template>

<style scoped>
.field {
  display: grid;
  gap: 0.75rem;
}

.field-label {
  color: rgb(17 17 17 / 60%);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.field-control {
  width: 100%;
  min-height: 56px;
  padding: 0 0 0.75rem;
  border: 0;
  border-bottom: 1px solid rgb(17 17 17 / 24%);
  border-radius: 0;
  color: #111111;
  background: transparent;
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  appearance: none;
}

.field-control:focus {
  border-bottom-color: #111111;
  outline: none;
}

.field-control:disabled {
  color: rgb(17 17 17 / 30%);
  background: transparent;
  cursor: not-allowed;
}

.field-control--error {
  border-bottom-color: var(--color-danger);
}

.field-message {
  color: rgb(17 17 17 / 48%);
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  line-height: var(--line-height-base);
}

.field-message--error {
  color: var(--color-danger);
}
</style>
