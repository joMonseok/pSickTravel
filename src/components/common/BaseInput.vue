<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string | number
    label?: string
    placeholder?: string
    type?: string
    inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
    pattern?: string
    error?: string
    helperText?: string
    disabled?: boolean
  }>(),
  {
    type: 'text',
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <label class="field">
    <span v-if="label" class="field-label">{{ label }}</span>
    <input
      class="field-control"
      :class="{ 'field-control--error': error }"
      :value="modelValue"
      :placeholder="placeholder"
      :type="type"
      :inputmode="inputmode"
      :pattern="pattern"
      :disabled="disabled"
      @input="handleInput"
    />
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

.field-control::placeholder {
  color: rgb(17 17 17 / 24%);
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

.field-control[type='number'] {
  -moz-appearance: textfield;
}

.field-control[type='number']::-webkit-outer-spin-button,
.field-control[type='number']::-webkit-inner-spin-button {
  margin: 0;
  appearance: none;
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
