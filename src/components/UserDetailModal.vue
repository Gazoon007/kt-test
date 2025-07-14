<script lang="ts" setup>
import type { User } from '@/types/user'
import { useDateFormat } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps<{
  show: boolean
  user: User | null
}>()

const emit = defineEmits(['close'])

const fullName = computed(() => {
  if (!props.user)
    return ''
  return `${props.user.name.title} ${props.user.name.first} ${props.user.name.last}`
})

function closeModal() {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <transition name="modal">
      <div v-if="show" class="fixed inset-0 z-[100] overflow-y-auto" @click.self="closeModal">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-50" />
          </div>

          <div
            class="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full z-[110] relative max-h-[90vh] border-6 border-white"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div class="sm:flex sm:items-center">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-48 w-48 rounded-full sm:mx-0">
                  <img
                    :src="user?.picture.large"
                    :alt="fullName"
                    class="h-full w-full rounded-full object-cover border-4 border-cyan-100"
                  >
                </div>

                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                  <h3 id="modal-headline" class="text-lg leading-6 font-medium text-gray-900">
                    {{ fullName }}
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      {{ user?.email }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="mt-6 border-t border-gray-200">
                <dl class="divide-y divide-gray-200">
                  <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ fullName }}
                    </dd>
                  </div>
                  <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500">
                      Username
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ user?.login.username }}
                    </dd>
                  </div>
                  <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500">
                      Email
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ user?.email }}
                    </dd>
                  </div>
                  <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500">
                      Phone
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ user?.phone }} (main)<br>
                      {{ user?.cell }} (cell)
                    </dd>
                  </div>
                  <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500">
                      Date of birth
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ useDateFormat(user?.dob.date, 'D MMM YYYY').value }} ({{ user?.dob.age }} years old)
                    </dd>
                  </div>
                  <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500">
                      Address
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ user?.location.street.number }} {{ user?.location.street.name }}<br>
                      {{ user?.location.city }}, {{ user?.location.state }}<br>
                      {{ user?.location.country }}, {{ user?.location.postcode }}
                    </dd>
                  </div>
                  <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500">
                      Registered
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ useDateFormat(user?.registered.date, 'D MMM YYYY').value }} ({{ user?.registered.age }} years ago)
                    </dd>
                  </div>
                  <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="text-sm font-medium text-gray-500">
                      ID
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ user?.id.name }}: {{ user?.id.value || 'N/A' }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sticky bottom-0">
              <button
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:ml-3 sm:w-auto sm:text-sm"
                @click="closeModal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
