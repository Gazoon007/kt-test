<script lang="ts" setup>
import type { User } from '@/types/user'
import { useDateFormat } from '@vueuse/core'
import { useUserStore } from '@/stores/userStore'
import { toCapitalCase } from '@/utils/stringUtils'

defineProps<{
  users: User[]
  isLoading?: boolean
}>()

const userStore = useUserStore()

const columns = [
  {
    key: 'date',
    label: 'Date',
    class: 'py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 cursor-pointer select-none',
  },
  {
    key: 'name',
    label: 'Name',
    class: 'px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer select-none',
  },
  {
    key: 'gender',
    label: 'Gender',
    class: 'px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer select-none',
  },
  {
    key: 'country',
    label: 'Country',
    class: 'px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer select-none',
  },
]

function getSortState(field: string) {
  if (!userStore.sortOrder || userStore.sortOrder === '-')
    return null
  const [f, dir] = userStore.sortOrder.split('-')
  if (f !== field)
    return null
  return dir // 'asc' or 'desc'
}

function toggleSort(field: string) {
  const state = getSortState(field)
  if (!state) {
    userStore.setSortOrder(`${field}-asc`)
  }
  else if (state === 'asc') {
    userStore.setSortOrder(`${field}-desc`)
  }
  else {
    userStore.setSortOrder('-')
  }
}
</script>

<template>
  <!-- Desktop table -->
  <div class="hidden md:block overflow-hidden shadow sm:rounded-lg">
    <table class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            :class="col.class"
            scope="col"
            @click="toggleSort(col.key)"
          >
            <span class="inline-flex items-center gap-1">
              {{ col.label }}
              <span v-if="getSortState(col.key) === 'asc'" class="ml-1">▲</span>
              <span v-else-if="getSortState(col.key) === 'desc'" class="ml-1">▼</span>
              <span v-else class="ml-1 opacity-30">⇅</span>
            </span>
          </th>
          <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" scope="col">
            Email
          </th>
          <th class="relative py-3.5 pl-3 pr-4 sm:pr-6" scope="col">
            <span class="sr-only">View</span>
          </th>
        </tr>
      </thead>
      <TransitionGroup
        :name="isLoading ? '' : 'list'" tag="tbody"
        class="divide-y divide-gray-200 bg-white"
      >
        <tr
          v-for="user in users"
          :key="user.login.uuid"
          class="hover:bg-gray-50"
        >
          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
            {{ useDateFormat(user.registered.date, 'D MMM YYYY').value }}
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm">
            <div class="flex items-center">
              <div class="h-10 w-10 flex-shrink-0">
                <img
                  :alt="user.name.first" :src="user.picture.thumbnail"
                  class="h-10 w-10 rounded-full"
                >
              </div>
              <div class="ml-4">
                <div class="font-medium text-gray-900">
                  <button
                    class="text-cyan-600 hover:text-cyan-900 cursor-pointer"
                  >
                    {{ user.name.title }}. {{ user.name.first }} {{ user.name.last }}
                  </button>
                </div>
              </div>
            </div>
          </td>
          <td
            v-for="col in ['gender', 'country', 'email']" :key="col"
            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
          >
            <template v-if="col === 'gender'">
              {{ toCapitalCase(user.gender) }}
            </template>
            <template v-else-if="col === 'country'">
              {{ user.location.country }}
            </template>
            <template v-else-if="col === 'email'">
              {{ user.email }}
            </template>
          </td>
          <td
            class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
          >
            <button
              class="text-cyan-600 hover:text-cyan-900 cursor-pointer"
            >
              View<span class="sr-only">, {{ user.name.first }}</span>
            </button>
          </td>
        </tr>
      </TransitionGroup>
    </table>
  </div>

  <!-- Mobile card layout -->
  <div class="md:hidden">
    <TransitionGroup :name="isLoading ? '' : 'list'" tag="div" class="space-y-4">
      <div
        v-for="user in users"
        :key="user.login.uuid"
        class="bg-white rounded-lg shadow p-4"
      >
        <div class="flex items-center space-x-4 mb-3">
          <img :src="user.picture.thumbnail" :alt="user.name.first" class="h-12 w-12 rounded-full">
          <div class="text-ellipsis">
            <div class="w-full">
              <button
                class="text-lg font-medium text-cyan-600 hover:text-cyan-900 truncate w-52 sm:w-auto block text-left"
              >
                {{ user.name.title }}. {{ user.name.first }} {{ user.name.last }}
              </button>
              <p class="text-sm text-gray-500 truncate w-52 sm:w-auto block">
                {{ user.email }}
              </p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <div
            v-for="info in [
              { label: 'Date', value: useDateFormat(user.registered.date, 'D MMM YYYY').value, span: '' },
              { label: 'Gender', value: toCapitalCase(user.gender), span: '' },
              { label: 'Country', value: user.location.country, span: 'col-span-2' },
            ]" :key="info.label" :class="info.span"
          >
            <span class="font-medium text-gray-500">{{ info.label }}:</span>
            <span class="ml-1">{{ info.value }}</span>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style>
