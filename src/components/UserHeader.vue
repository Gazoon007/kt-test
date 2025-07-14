<script lang="ts" setup>
defineProps<{
  name: string
  avatarUrl: string
}>()
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

        <div class="flex flex-shrink-0 items-center gap-2 sm:gap-4">
          <button
            class="inline-flex items-center justify-center rounded-sm border-2 border-transparent md:px-6 md:py-3 px-3 py-1 text-md font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 bg-white text-cyan-500 hover:border-cyan-500 cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"
                 viewBox="0 0 24 24" id="telegram-plane"
                 class="w-6 h-6 mr-2 inline-block align-middle">
              <path fill="#06b6d4"
                    d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693 12.643-7.911c.595-.394 1.136-.176.691.218z" />
            </svg>
            Send Message
          </button>
          <button
            class="blade-hover inline-flex items-center justify-center relative overflow-hidden border-2 border-white md:px-6 md:py-3 px-3 py-1 text-md font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 bg-transparent text-white cursor-pointer"
          >
            <span class="inline-flex items-center">
              <span
                class="text-white pb-1 flex items-center justify-center mr-2 text-2xl font-bold w-6 h-6">+</span>
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
