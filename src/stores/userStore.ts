import { defineStore } from 'pinia'
import { ref } from 'vue'
import userService from '@/services/userService'

// Define query keys similar to pinia-colada-demo approach by Pinia Creator
export const USER_QUERY_KEYS = {
  root: ['users'],
  byPage: (page: number, resultsPerPage: number) =>
    USER_QUERY_KEYS.root.concat(['page', page.toString(), 'perPage', resultsPerPage.toString()]),
  search: (searchText: string, page: number, resultsPerPage: number) =>
    USER_QUERY_KEYS.root.concat(['search', searchText, 'page', page.toString(), 'perPage', resultsPerPage.toString()]),
}

export const useUserStore = defineStore('user', () => {
  const seed = ref('kiratech')
  const sortOrder = ref('-')
  const currentUser = ref(null)

  return {
    USER_QUERY_KEYS,
    seed,
    sortOrder,
    currentUser,

    setSortOrder(order: string) {
      sortOrder.value = order
    },
    fetchUsers(page = 1, resultsPerPage = 10) {
      return userService.fetchUsers(page, resultsPerPage, seed.value)
    },
    searchUsers(searchQuery: string, page = 1, resultsPerPage = 10) {
      return userService.searchUsers(searchQuery, page, resultsPerPage, seed.value)
    },
    clearCache() {
      userService.clearCache()
    },
  }
})
