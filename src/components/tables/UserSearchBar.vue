<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps({
  initialQuery: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['search', 'clear'])

const searchInput = ref(props.initialQuery || '')

const debouncedSearch = useDebounceFn(() => {
  emit('search', searchInput.value)
}, 300)

function handleInput() {
  debouncedSearch()
}

function performSearch() {
  emit('search', searchInput.value)
}

function clearSearch() {
  searchInput.value = ''
  emit('clear')
}
</script>

<template>
  <div>
    <div class="relative">
      <input
        v-model="searchInput"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-ellipsis"
        placeholder="Search by name, email, or username..."
        type="text"
        @input="handleInput"
      >
      <button
        v-if="searchInput"
        class="absolute right-12 top-2.5 text-gray-400 hover:text-gray-600"
        @click="clearSearch"
      >
        <svg
          class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            fill-rule="evenodd"
          />
        </svg>
      </button>
      <button
        class="absolute right-3 top-2 text-cyan-500 hover:text-cyan-700"
        @click="performSearch"
      >
        <svg
          class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
