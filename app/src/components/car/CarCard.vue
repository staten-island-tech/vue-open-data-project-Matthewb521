<template>
  <div ref="card" class="flex justify-center draggable-card">
    <div class="w-full sm:w-96 md:w-[28rem] lg:w-[32rem] bg-white shadow-lg rounded-lg p-6">
      <h6 class="text-2xl font-semibold text-center mb-4">
        {{ datas.name }}
      </h6>
      <p class="text-gray-700"><strong>License Type:</strong> {{ datas.license_type }}</p>
      <p class="text-gray-700"><strong>Vehicle Year:</strong> {{ datas.vehicle_year }}</p>
      <p class="text-gray-700">
        <strong>License Plate:</strong> {{ datas.dmv_license_plate_number }}
      </p>
      <p class="text-gray-700"><strong>Base Name:</strong> {{ datas.base_name }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

const props = defineProps({ datas: Object })
const card = ref(null)

onMounted(() => {
  const originalPosition = { x: 0, y: 0 }
  let zIndexCounter = 1000

  Draggable.create(card.value, {
    type: 'x,y',
    edgeResistance: 0.65,
    bounds: 'body',
    inertia: true,
    cursor: 'grab',
    onDragStart() {
      originalPosition.x = this.x
      originalPosition.y = this.y
      this.target.style.zIndex = zIndexCounter++
    },
    onRelease() {
      gsap.to(this.target, {
        x: originalPosition.x,
        y: originalPosition.y,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      })
    },
  })
})
</script>

<style scoped></style>
