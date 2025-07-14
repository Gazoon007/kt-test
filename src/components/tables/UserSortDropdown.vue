<script lang="ts" setup>
import { computed, defineEmits, defineProps } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array as () => { value: string, label: string }[],
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const localValue = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
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
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.1" class="text-cyan-500">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</template>
