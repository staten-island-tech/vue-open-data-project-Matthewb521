<template>
  <div class="w-full sticky top-0 bg-white z-10">
    <NavBar />
  </div>
  <div>
    <TheHeader>{{ currentTitle }}</TheHeader>
  </div>
  <RouterView />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import TheHeader from './components/TheHeader.vue'

const route = useRoute()
const currentTitle = computed(() => route.meta.title || 'Default Title')
</script>

<style scoped></style>
