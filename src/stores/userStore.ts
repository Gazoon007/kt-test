import { defineStore } from 'pinia'
import { ref } from 'vue'
import userService from '@/services/userService'

// Define query keys similar to pinia-colada-demo approach by Pinia Creator
export const USER_QUERY_KEYS = {
  root: ['users'],
  search: (searchText: string, page: number, resultsPerPage: number) =>
    USER_QUERY_KEYS.root.concat(['search', searchText, 'page', page.toString(), 'perPage', resultsPerPage.toString()]),
}

export const useUserStore = defineStore('user', () => {
  const seed = ref('kiratech')
  const sortOrder = ref('-')
  const currentUser = ref(null)
  function setSortOrder(order: string) {
    sortOrder.value = order
  }

  return {
    USER_QUERY_KEYS,
    seed,
    sortOrder,
    setSortOrder,
    currentUser,

    clearCache() {
      userService.clearCache()
    },
  }
})
