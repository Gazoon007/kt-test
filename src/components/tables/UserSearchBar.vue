<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'
import { defineEmits, defineProps, ref } from 'vue'

interface Props {
  initialQuery?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'search', query: string): void
  (e: 'clear'): void
}>()

const searchInput = ref<string>(props.initialQuery ?? '')

const debouncedSearch = useDebounceFn(() => {
  emit('search', searchInput.value)
}, 300)

function handleInput(): void {
  debouncedSearch()
}

function clearSearch(): void {
  searchInput.value = ''
  emit('clear')
}

function performSearch(): void {
  emit('search', searchInput.value)
}
</script>

<template>
  <div>
    <div class="relative flex items-center">
      <input
        v-model="searchInput"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-ellipsis"
        placeholder="Search by name, email, or username..."
        type="text"
        @input="handleInput"
      >
      <button
        v-if="searchInput"
        class="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        @click="clearSearch"
      >
        <font-awesome-icon :icon="['fas', 'circle-xmark']" class="h-5 w-5 text-gray-400" />
      </button>
      <button
        class="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500 hover:text-cyan-700"
        @click="performSearch"
      >
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="h-6 w-6 text-cyan-500" />
      </button>
    </div>
  </div>
</template>
