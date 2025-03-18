<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <img
            class="h-8 w-auto"
            src="https://th.bing.com/th/id/OIP._nGpGbEThgyxBDCw9X-CnAHaEK?w=302&h=180&c=7&r=0&o=5&pid=1.7"
            alt="Logo"
          />
        </div>
        <div class="flex space-x-4">
          <RouterLink to="/" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
            >Home</RouterLink
          >
          <RouterLink
            to="/taxi"
            class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
            >Taxi Data</RouterLink
          >
          <RouterLink
            to="/bus"
            class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
            >Bus Data</RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped></style>
