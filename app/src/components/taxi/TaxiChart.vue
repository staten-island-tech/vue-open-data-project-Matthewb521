<template>
  <div class="flex justify-center items-center relative">
    <div class="w-225 h-225">
      <canvas ref="chartCanvas"></canvas>
    </div>
    <select
      v-model="selectedYear"
      @change="handleYearChange"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 absolute top-10 left-90"
    >
      <option v-for="(url, year) in apiUrls" :key="year" :value="year">
        {{ year }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Chart from 'chart.js/auto'

const chartCanvas = ref(null)
const selectedYear = ref(2018)
const taxiData = ref([])
let chartInstance = null

const apiUrls = {
  2018: 'https://data.cityofnewyork.us/resource/t29m-gskq.json?$limit=1000',
  2019: 'https://data.cityofnewyork.us/resource/2upf-qytp.json?$limit=1000',
  2020: 'https://data.cityofnewyork.us/resource/kxp8-n2sj.json?$limit=1000',
  2021: 'https://data.cityofnewyork.us/resource/m6nq-qud6.json?$limit=1000',
  2022: 'https://data.cityofnewyork.us/resource/qp3b-zxtp.json?$limit=1000',
}

const fetchData = async (year) => {
  try {
    const response = await fetch(apiUrls[year])
    taxiData.value = await response.json()
    updateChart(year)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const processChartData = () => {
  let totalFare = 0,
    totalTip = 0,
    totalTolls = 0,
    totalMtaTax = 0,
    totalSurcharge = 0,
    totalTotalAmount = 0

  taxiData.value.forEach((trip) => {
    totalFare += parseFloat(trip.fare_amount) || 0
    totalTip += parseFloat(trip.tip_amount) || 0
    totalTolls += parseFloat(trip.tolls_amount) || 0
    totalMtaTax += parseFloat(trip.mta_tax) || 0
    totalSurcharge += parseFloat(trip.improvement_surcharge) || 0
    totalTotalAmount += parseFloat(trip.total_amount) || 0
  })

  return {
    labels: ['Fare', 'Tip', 'Tolls', 'MTA Tax', 'Surcharge', 'Total'],
    data: [totalFare, totalTip, totalTolls, totalMtaTax, totalSurcharge, totalTotalAmount],
  }
}

const updateChart = (year) => {
  if (!chartCanvas.value) return

  const { labels, data } = processChartData()

  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Amount (USD)',
          data: data,
          backgroundColor: [
            'rgba(251, 191, 36, 0.5)',
            'rgba(52, 211, 153, 0.5)',
            'rgba(239, 68, 68, 0.5)',
            'rgba(59, 130, 246, 0.5)',
            'rgba(139, 92, 246, 0.5)',
            'rgba(245, 158, 11, 0.5)',
          ],
          borderColor: [
            'rgba(251, 191, 36, 1)',
            'rgba(52, 211, 153, 1)',
            'rgba(239, 68, 68, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(139, 92, 246, 1)',
            'rgba(245, 158, 11, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#000000',
            font: {
              size: 16,
              family: 'Protest Guerrilla',
            },
          },
        },
        title: {
          display: true,
          text: `Total Fare Breakdown (${year})`,
          color: '#000000',
          font: {
            size: 20,
            family: 'Protest Guerrilla',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#000000',
          },
        },
        y: {
          ticks: {
            color: '#000000',
            beginAtZero: true,
          },
        },
      },
    },
  })
}

const handleYearChange = () => {
  fetchData(selectedYear.value)
}

onMounted(() => {
  fetchData(selectedYear.value)
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<style scoped></style>
