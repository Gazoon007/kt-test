<script lang="ts" setup>
import { computed, defineEmits, defineProps } from 'vue'
import { useBreakpoints } from '@/composables/useBreakpoints.ts'
import { useUserStore } from '@/stores/userStore.ts'

interface Props {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalResults: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'goToPage', page: number): void
  (e: 'nextPage'): void
  (e: 'prevPage'): void
}>()

const { isMobile } = useBreakpoints()

function setPage(page: number) {
  emit('goToPage', page)
}

function nextPage() {
  emit('nextPage')
}

function prevPage() {
  emit('prevPage')
}

const userStore = useUserStore()

// Always show 7 page numbers with current page in the middle when possible
const paginationNumbers = computed(() => {
  const totalNumbersToShow = isMobile.value ? 3 : 7
  const half = Math.floor(totalNumbersToShow / 2)

  const total = props.totalPages
  const current = props.currentPage
  let start = Math.max(1, current - half)
  let end = start + totalNumbersToShow - 1

  // For client-side, restrict to totalPages
  const isClientSide = userStore.sortOrder !== '-'
  if (isClientSide) {
    end = Math.min(total, end)
    start = Math.max(1, end - totalNumbersToShow + 1)
  }

  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})
</script>

<template>
  <div class="flex items-center justify-center my-4">
    <nav class="flex items-center space-x-2" aria-label="Pagination">
      <button
        :disabled="props.currentPage <= 1"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        @click="prevPage"
      >
        Previous
      </button>

      <template v-for="page in paginationNumbers" :key="page">
        <button
          class="px-4 py-2 text-sm font-medium border rounded-md cursor-pointer"
          :class="[
            props.currentPage === page
              ? 'bg-cyan-500 text-white border-cyan-500'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
          ]"
          @click="setPage(page)"
        >
          {{ page }}
        </button>
      </template>

      <button
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
        @click="nextPage"
      >
        Next
      </button>
    </nav>
  </div>
</template>
