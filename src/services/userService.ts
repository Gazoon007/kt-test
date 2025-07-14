import type { ApiResponse, User } from '@/types/user'

interface Cache {
  [key: string]: ApiResponse
}

const cache: Cache = {}

/**
 * User Service - Handles API calls to randomuser.me API
 */
export default {
  /**
   * Fetch users with pagination
   *
   * @param page - Page number for pagination
   * @param resultsPerPage - Number of results per page
   * @param seed - Seed for consistent random data
   */
  async fetchUsers(
    page: number = 1,
    resultsPerPage: number = 10,
    seed: string = 'kiratech',
  ): Promise<ApiResponse> {
    const cacheKey = `${page}-${resultsPerPage}-${seed}`

    if (cache[cacheKey]) {
      return cache[cacheKey]
    }

    const url = new URL('https://randomuser.me/api/')
    url.searchParams.append('page', page.toString())
    url.searchParams.append('results', resultsPerPage.toString())
    url.searchParams.append('seed', seed)

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch users from randomuser.me API')
    }

    const data = await response.json() as ApiResponse

    cache[cacheKey] = data

    return data
  },

  /**
   * Search users by query
   *
   * @param searchQuery - Search query to filter users
   * @param page - Page number for pagination
   * @param resultsPerPage - Number of results per page
   * @param seed - Seed for consistent random data
   */
  async searchUsers(
    searchQuery: string,
    page: number = 1,
    resultsPerPage: number = 10,
    seed: string = 'kiratech',
  ): Promise<ApiResponse> {
    if (!searchQuery.trim()) {
      return this.fetchUsers(page, resultsPerPage, seed)
    }

    const cacheKey = `${page}-${resultsPerPage}-${seed}`
    if (!cache[cacheKey]) {
      await this.fetchUsers(page, resultsPerPage, seed)
    }

    const currentPageData = cache[cacheKey]

    const query = searchQuery.toLowerCase()
    let allFilteredResults: User[] = []

    if (Object.keys(cache).length === 0) {
      await this.fetchUsers(page, resultsPerPage, seed)
    }

    Object.values(cache).forEach((pageData) => {
      const pageResults = pageData.results.filter((user) => {
        const fullName = `${user.name.first} ${user.name.last}`.toLowerCase()
        const email = user.email.toLowerCase()
        const username = user.login.username.toLowerCase()

        return (
          fullName.includes(query)
          || email.includes(query)
          || username.includes(query)
        )
      })

      allFilteredResults = [...allFilteredResults, ...pageResults]
    })

    if (allFilteredResults.length > 0) {
      const startIndex = (page - 1) * resultsPerPage
      const paginatedResults = allFilteredResults.slice(startIndex, startIndex + resultsPerPage)

      return {
        ...currentPageData,
        results: paginatedResults,
        info: {
          ...currentPageData.info,
          results: allFilteredResults.length,
          page,
        },
      }
    }

    // TODO: API search with name parameter doesn't support this mechanism
    // If no local results, try API search with name parameter
    // try {
    //   const url = new URL('https://randomuser.me/api/')
    //   url.searchParams.append('page', page.toString())
    //   url.searchParams.append('results', resultsPerPage.toString())
    //   url.searchParams.append('seed', seed)
    //   url.searchParams.append('name', searchQuery) // Add name parameter for API search
    //
    //   const response = await fetch(url)
    //   if (!response.ok) {
    //     throw new Error('Failed to fetch from API with name parameter')
    //   }
    //
    //   const apiData = await response.json() as ApiResponse
    //
    //   if (apiData.results.length > 0) {
    //     console.log(`Found ${apiData.results.length} API results for name: ${searchQuery}`)
    //     return apiData
    //   }
    // } catch (error) {
    //   console.error('Error fetching from API with name parameter:', error)
    // }

    return {
      ...currentPageData,
      results: [],
      info: {
        ...currentPageData.info,
        results: 0,
      },
    }
  },

  clearCache() {
    Object.keys(cache).forEach(key => delete cache[key])
  },
}
