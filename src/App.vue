<script lang="ts" setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow">
      <div class="max-w-5xl mx-auto px-2 sm:px-4 py-4 flex items-center justify-between">
        <img alt="Kiratech Logo" src="/kiratech-logo.png" class="h-10" />
        <div class="flex items-center gap-4">
          <font-awesome-icon :icon="['fas', 'bell']" class="text-cyan-600 text-xl cursor-pointer" />
          <font-awesome-icon :icon="['fas', 'cog']" class="text-cyan-600 text-xl cursor-pointer" />
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="text-cyan-600 text-xl cursor-pointer" />
        </div>
      </div>
    </nav>

    <main class="pt-4 pb-8">
      <RouterView />
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
