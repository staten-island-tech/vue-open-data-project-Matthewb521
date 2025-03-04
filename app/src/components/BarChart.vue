<template>
  <div class="flex justify-center items-center">
    <div class="w-225 h-225">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const chartCanvas = ref(null)
const taxiData = ref([])

const fetchData = async () => {
  try {
    const response = await fetch(
      'https://data.cityofnewyork.us/resource/t29m-gskq.json?$limit=1000',
    )
    taxiData.value = await response.json()
    createChart(processChartData())
    console.log(taxiData)
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

const createChart = ({ labels, data }) => {
  if (!chartCanvas.value) return

  new Chart(chartCanvas.value, {
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
          text: 'Total Fare Breakdown In 2018 (USD)',
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

onMounted(fetchData)
</script>

<style scoped></style>
