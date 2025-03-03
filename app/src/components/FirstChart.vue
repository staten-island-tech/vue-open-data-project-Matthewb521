<template>
  <div></div>
</template>

<script setup>
import Chart from 'chart.js/auto'
import { ref, onMounted } from 'vue'
const taxiData = ref([])

const fetchData = async () => {
  try {
    const response = await fetch(
      'https://data.cityofnewyork.us/resource/t29m-gskq.json?$limit=1000',
    )
    taxiData.value = await response.json()
    console.log(taxiData.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(fetchData)
</script>

<style scoped></style>
