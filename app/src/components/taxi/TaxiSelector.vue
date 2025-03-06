<template>
  <select
    v-model="selectedYear"
    @change="emitYearChange"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    <option v-for="(url, year) in apiUrls" :key="year" :value="year">
      {{ year }}
    </option>
  </select>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const selectedYear = ref(2018)
const emit = defineEmits(['year-changed'])

const apiUrls = {
  2018: 'https://data.cityofnewyork.us/resource/t29m-gskq.json?$limit=1000',
  2019: 'https://data.cityofnewyork.us/resource/2upf-qytp.json?$limit=1000',
  2020: 'https://data.cityofnewyork.us/resource/kxp8-n2sj.json?$limit=1000',
  2021: 'https://data.cityofnewyork.us/resource/m6nq-qud6.json?$limit=1000',
  2022: 'https://data.cityofnewyork.us/resource/qp3b-zxtp.json?$limit=1000',
}

const emitYearChange = () => {
  emit('year-changed', selectedYear.value)
}
</script>

<style scoped></style>
