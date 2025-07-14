<script lang="ts" setup>
interface Props {
  name: string
  avatarUrl: string
}

defineProps<Props>()
</script>

<template>
  <header class="bg-cyan-500 p-4 sm:p-6 lg:p-8 mb-10">
    <div class="max-w-5xl mx-auto md:h-[100px] sm:h-auto px-2 sm:px-4">
      <div class="flex flex-col sm:flex-row items-center gap-6">
        <img
          :src="avatarUrl"
          alt="avatar"
          class="h-40 w-40 rounded-md border-6 border-white shadow-lg object-cover md:translate-y-4"
        >
        <div class="flex flex-col">
          <span class="text-2xl sm:text-3xl font-bold text-white">{{ name }}</span>
          <p class="text-sm text-white">
            Last Online: 2 days ago
          </p>
        </div>

        <div class="flex flex-shrink-0 items-center gap-4 sm:gap-4">
          <button
            class="inline-flex items-center justify-center rounded-sm border-2 border-transparent md:px-6 md:py-3 px-3 py-1 text-md font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 bg-white text-cyan-500 hover:border-cyan-500 cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <span class="flex items-center gap-2">
              <font-awesome-icon :icon="['fas', 'paper-plane']" />
              <span>Send Message</span>
            </span>
          </button>
          <button
            class="blade-hover inline-flex items-center justify-center relative overflow-hidden border-2 border-white md:px-6 md:py-3 px-3 py-1 text-md font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 bg-transparent text-white cursor-pointer"
          >
            <span class="inline-flex items-center">
              <span class="mr-2 flex items-center justify-center">
                <font-awesome-icon :icon="['fas', 'plus']" />
              </span>
              Add Friend
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.blade-hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(120deg, transparent 0%, #67e8f9 50%, transparent 100%);
  opacity: 0.5;
  transform: skewX(-20deg);
  transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.blade-hover:hover::before {
  left: 120%;
}
</style>
