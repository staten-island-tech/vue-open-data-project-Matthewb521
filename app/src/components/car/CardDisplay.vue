<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    <CarCard
      v-for="data in vehicleData"
      :key="data.vehicle_license_number || data.dmv_license_plate_number"
      :datas="data"
    />
  </div>
</template>

<script setup>
import CarCard from './CarCard.vue'
import { ref, onMounted } from 'vue'

const vehicleData = ref([])

async function fetchVehicleData() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/8wbx-tsch.json?$limit=99')
    const data = await response.json()

    if (Array.isArray(data)) {
      vehicleData.value = data
    } else {
      console.error('API response is not an array', data)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(fetchVehicleData)
</script>

<style scoped></style>
