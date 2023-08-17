import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        name: {
          ru: 'Домашняя страница',
          en: 'Home page',
        },
        icon: 'house',
      },
    },
    {
      path: '/1',
      name: 'home1',
      component: HomeView,
      meta: {
        name: {
          ru: 'Домашняя страница',
          en: 'Home page',
        },
        icon: 'house',
      },
    },
  ],
})

export default router
