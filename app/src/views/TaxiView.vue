<template>
  <TaxiSelector @year-changed="updateYear" class="" />
  <TaxiChart :year="selectedYear" :apiUrl="apiUrls[selectedYear]" />
</template>

<script setup>
import { ref } from 'vue'
import TaxiSelector from '@/components/taxi/TaxiSelector.vue'
import TaxiChart from '@/components/taxi/TaxiChart.vue'

const selectedYear = ref(2018)

const apiUrls = {
  2018: 'https://data.cityofnewyork.us/resource/t29m-gskq.json?$limit=1000',
  2019: 'https://data.cityofnewyork.us/resource/2upf-qytp.json?$limit=1000',
  2020: 'https://data.cityofnewyork.us/resource/kxp8-n2sj.json?$limit=1000',
  2021: 'https://data.cityofnewyork.us/resource/m6nq-qud6.json?$limit=1000',
  2022: 'https://data.cityofnewyork.us/resource/qp3b-zxtp.json?$limit=1000',
}

const updateYear = (year) => {
  selectedYear.value = year
}
</script>

<style scoped></style>
