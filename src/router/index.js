import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import fefe from '@/views/fefe.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
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
      component: fefe,
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

router.getRoutes().forEach((route, index) => (route.meta.index = index))

export default router
