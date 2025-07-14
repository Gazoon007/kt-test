<template>
  <div class="min-h-full flex flex-col items-center justify-center py-12">
    <div class="text-center">
      <h1 class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Page not
        found
      </h1>
      <p class="mt-4 text-base text-gray-500">
        Sorry, we couldn't find the page you're looking
        for.
      </p>
      <div class="mt-6">
        <router-link class="text-base font-medium text-cyan-600 hover:text-cyan-500" to="/">
          Go back home
          <span aria-hidden="true"> &rarr;</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
