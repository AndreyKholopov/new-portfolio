import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ExperienceView from '@/views/ExperienceView.vue'
import PortfolioView from '@/views/PortfolioView.vue'
import ContactsView from '@/views/ContactsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ top: 0 })
      }, 280)
    })
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        name: {
          ru: 'Начальная страница',
          en: 'Home',
        },
        icon: 'house',
      },
    },
    {
      path: '/About',
      name: 'about',
      component: AboutView,
      meta: {
        name: {
          ru: 'Обо мне',
          en: 'About',
        },
        icon: 'address-card',
      },
    },
    {
      path: '/Experience',
      name: 'experience',
      component: ExperienceView,
      meta: {
        name: {
          ru: 'Опыт работы',
          en: 'Experience',
        },
        icon: 'person-digging',
      },
    },
    {
      path: '/Portfolio',
      name: 'portfolio',
      component: PortfolioView,
      meta: {
        name: {
          ru: 'Портфолио',
          en: 'Portfolio',
        },
        icon: 'briefcase',
      },
    },
    {
      path: '/Contacts',
      name: 'contacts',
      component: ContactsView,
      meta: {
        name: {
          ru: 'Контакты',
          en: 'Contacts',
        },
        icon: 'address-book',
      },
    },
  ],
})

router.getRoutes().forEach((route, index) => (route.meta.index = index))

export default router
