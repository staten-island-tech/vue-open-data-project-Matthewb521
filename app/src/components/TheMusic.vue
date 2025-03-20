<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <button
      @click="toggleDropdown"
      class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
    >
      Select Music 🎵
    </button>

    <div
      v-if="dropdownOpen"
      class="absolute mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 p-2"
    >
      <ul class="py-1">
        <li
          v-for="(track, index) in tracks"
          :key="index"
          @click="playTrack(index)"
          class="px-4 py-2 cursor-pointer text-white hover:bg-gray-700 transition-colors duration-200 rounded-md"
        >
          {{ isPlaying[index] ? `Pause ${index + 1}` : `Play ${index + 1}` }}
        </li>
      </ul>
    </div>
  </div>

  <audio v-for="(track, index) in tracks" :key="index" ref="audioElements" :src="track" loop />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const tracks = ref([
  '/sounds/background-1.mp3',
  '/sounds/background-2.mp3',
  '/sounds/background-3.mp3',
])
const dropdownOpen = ref(false)
const audioElements = ref([])
const isPlaying = ref(new Array(tracks.value.length).fill(false))
const dropdownRef = ref(null)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const playTrack = (index) => {
  audioElements.value.forEach((audio, i) => {
    if (i !== index && isPlaying.value[i]) {
      audio.pause()
      isPlaying.value[i] = false
    }
  })

  if (isPlaying.value[index]) {
    audioElements.value[index].pause()
  } else {
    audioElements.value[index].play()
  }

  isPlaying.value[index] = !isPlaying.value[index]
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.absolute {
  background-color: #1f2937;
  border: 1px solid #374151;
}

.cursor-pointer:hover {
  background-color: #374151;
}
</style>
