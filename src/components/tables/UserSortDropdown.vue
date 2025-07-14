<script lang="ts" setup>
import { computed, defineEmits, defineProps } from 'vue'

interface SortOption {
  value: string
  label: string
}

interface Props {
  modelValue: string
  options: SortOption[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const localValue = computed({
  get: (): string => props.modelValue,
  set: (val: string): void => emit('update:modelValue', val),
})
</script>

<template>
  <div class="relative w-full">
    <select
      v-model="localValue"
      class="appearance-none min-w-0 flex-shrink w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 font-italic text-sm md:ml-2 cursor-pointer pr-10"
      @change="$emit('update:modelValue', localValue)"
    >
      <option v-for="opt in options" :key="opt.value" :value="opt.value" class="text-gray-900 font-normal">
        {{ opt.label }}
      </option>
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-1 flex items-center">
      <font-awesome-icon :icon="['fas', 'chevron-down']" class="text-cyan-500 w-4 h-4" />
    </div>
  </div>
</template>
