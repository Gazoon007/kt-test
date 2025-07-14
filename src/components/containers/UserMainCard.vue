<script lang="ts" setup>
import type { User } from '@/types/user.ts'
import { useQuery } from '@pinia/colada'
import { computed, ref, watch } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import UserPagination from '@/components/tables/UserPagination.vue'
import UserSearchBar from '@/components/tables/UserSearchBar.vue'
import UserSortDropdown from '@/components/tables/UserSortDropdown.vue'
import UserTable from '@/components/tables/UserTable.vue'
import { useUserStore } from '@/stores/userStore.ts'

const userStore = useUserStore()
const currentPage = ref<number>(1)
const itemsPerPage = ref<number>(10)
const searchQuery = ref<string>('')
const allUsers = ref<User[]>([])
const isClientLoading = ref<boolean>(false)
const clientError = ref<string>('')

const sortOptions = [
  { value: '-', label: 'Sort: None' },
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'date-desc', label: 'Date Newest' },
  { value: 'date-asc', label: 'Date Oldest' },
  { value: 'gender-asc', label: 'Gender A-Z' },
  { value: 'gender-desc', label: 'Gender Z-A' },
  { value: 'country-asc', label: 'Country A-Z' },
  { value: 'country-desc', label: 'Country Z-A' },
]

const { data, isLoading, error, refetch } = useQuery({
  key: () => {
    if (userStore.sortOrder === '-') {
      if (searchQuery.value) {
        return userStore.USER_QUERY_KEYS.search(searchQuery.value, currentPage.value, itemsPerPage.value)
      }
      else {
        return userStore.USER_QUERY_KEYS.byPage(currentPage.value, itemsPerPage.value)
      }
    }
    else {
      return ['client-sort']
    }
  },
  query: () => {
    if (userStore.sortOrder === '-') {
      if (searchQuery.value) {
        return userStore.searchUsers(searchQuery.value, currentPage.value, itemsPerPage.value)
      }
      else {
        return userStore.fetchUsers(currentPage.value, itemsPerPage.value)
      }
    }
    else {
      return Promise.resolve({
        results: [],
        info: {
          seed: '',
          results: 0,
          page: 1,
          version: '',
        },
      })
    }
  },
  placeholderData: previousData => previousData,
  gcTime: 5 * 60 * 1000,
  staleTime: 2 * 60 * 1000,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
})

async function fetchAllUsersForSort(): Promise<void> {
  isClientLoading.value = true
  clientError.value = ''
  try {
    const res = searchQuery.value
      ? await userStore.searchUsers(searchQuery.value, 1, 100)
      : await userStore.fetchUsers(1, 100)
    const seen = new Set()
    allUsers.value = (res.results || []).filter((user) => {
      const key = user.login?.uuid || user.email
      if (seen.has(key))
        return false
      seen.add(key)
      return true
    })
  }
  catch (e) {
    console.error(e)
    clientError.value = 'Failed to fetch users.'
    allUsers.value = []
  }
  finally {
    isClientLoading.value = false
  }
}

watch([() => userStore.sortOrder, searchQuery], ([order, q], [oldOrder, oldQ]) => {
  if (order !== oldOrder || q !== oldQ) {
    currentPage.value = 1
  }
  if (order === '-') {
    userStore.clearCache() // Clear API/user cache when switching back to server-side
    refetch()
  }
  else {
    fetchAllUsersForSort()
  }
})

function clearSearch(): void {
  searchQuery.value = ''
}
function handleSearch(query: string): void {
  searchQuery.value = query
}

const totalResults = computed<number>(() => {
  if (userStore.sortOrder === '-') {
    return data.value?.info?.results || 0
  }
  return allUsers.value.length
})
const totalPages = computed<number>(() => Math.ceil(totalResults.value / itemsPerPage.value) || 1)

function nextPage(): void {
  if (userStore.sortOrder === '-') {
    currentPage.value++
  }
  else {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }
}
function prevPage(): void {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
function goToPage(page: number): void {
  if (userStore.sortOrder === '-') {
    currentPage.value = page
  }
  else {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }
}

const users = computed<User[]>(() => {
  if (userStore.sortOrder === '-') {
    return data.value?.results || []
  }

  const [field, direction] = userStore.sortOrder.split('-')

  function getSortValue(user: User): string {
    switch (field) {
      case 'name':
        return `${user.name.first} ${user.name.last}`.toLowerCase()
      case 'date':
        return user.registered?.date || ''
      case 'gender':
        return user.gender || ''
      case 'country':
        return user.location?.country?.toLowerCase() || ''
      default:
        return ''
    }
  }

  const sorted = [...allUsers.value].sort((a, b) => {
    const valA = getSortValue(a)
    const valB = getSortValue(b)
    if (field === 'date') {
      const dateA = new Date(valA)
      const dateB = new Date(valB)
      return direction === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime()
    }
    return direction === 'asc'
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA)
  })

  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return sorted.slice(start, end)
})
</script>

<template>
  <main class="max-w-5xl mx-auto pb-8 px-2 sm:px-4 w-full mt-[56px] relative z-0">
    <div class="bg-white rounded-2xl shadow-lg px-4 sm:px-8 py-8 h-full w-full">
      <div class="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div class="flex-1 min-w-[8rem] w-full">
          <UserSearchBar :initial-query="searchQuery" @clear="clearSearch" @search="handleSearch" />
        </div>
        <div class="flex min-w-0 flex-shrink items-center gap-2 w-full sm:w-auto">
          <UserSortDropdown v-model="userStore.sortOrder" :options="sortOptions" />
        </div>
      </div>
      <div v-if="users && users.length > 0">
        <div class="relative">
          <div
            class="absolute inset-0 bg-gray-800/20 rounded-lg flex items-center gap-4 justify-center z-10 transition-opacity duration-300 ease-in-out"
            :class="{ 'opacity-0 pointer-events-none': !(isLoading || isClientLoading), 'opacity-100': isLoading || isClientLoading }"
          >
            <LoadingSpinner />
            Fetching users...
          </div>
          <transition name="page" mode="out-in">
            <div :key="currentPage">
              <UserTable :users="users" :is-loading="isLoading || isClientLoading" />
            </div>
          </transition>
        </div>
        <div v-if="!searchQuery" class="mt-4">
          <UserPagination
            :current-page="currentPage"
            :items-per-page="itemsPerPage"
            :total-pages="totalPages"
            :total-results="totalResults"
            @next-page="nextPage"
            @prev-page="prevPage"
            @go-to-page="goToPage"
          />
        </div>
      </div>
      <div
        v-else
        class="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded mb-4 text-center"
      >
        No users found. Please try a different search.
      </div>
      <div
        v-if="error || clientError"
        class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-center"
      >
        {{ error || clientError }}
      </div>
    </div>
  </main>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
