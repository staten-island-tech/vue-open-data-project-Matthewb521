import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Welcome to the New York Transportation website' },
    },
    {
      path: '/bus',
      name: 'bus',
      component: () => import('../views/BusView.vue'),
      meta: { title: 'Bus Breakdown Data in New York' },
    },
    {
      path: '/taxi',
      name: 'taxi',
      component: () => import('../views/TaxiView.vue'),
      meta: { title: 'Taxi Data in New York' },
    },
  ],
})

export default router
