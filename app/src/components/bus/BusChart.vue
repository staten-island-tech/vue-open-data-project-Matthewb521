<template>
  <div class="flex justify-center items-center">
    <div class="w-225 h-225">
      <canvas id="myChart" ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(PieController, ArcElement, Tooltip, Legend)

async function createChart() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/ez4e-fazm.json')
    const busData = await response.json()

    const reasonCounts = {}
    busData.forEach((item) => {
      const reason = item.reason || 'Unknown'
      reasonCounts[reason] = (reasonCounts[reason] || 0) + 1
    })

    const labels = Object.keys(reasonCounts)
    const dataValues = Object.values(reasonCounts)

    const ctx = document.getElementById('myChart').getContext('2d')
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Bus Breakdowns by Reason',
            data: dataValues,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4CAF50',
              '#FF9800',
              '#9C27B0',
              '#3F51B5',
            ],
          },
        ],
      },
      options: {
        responsive: true,
      },
    })
  } catch (error) {
    console.error('Error fetching API data:', error)
  }
}

createChart()
</script>

<style scoped></style>
