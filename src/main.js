import '@/assets/styles/main.scss'

import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons'
import {
  faHouse,
  faBriefcase,
  faSun,
  faMoon,
  faE,
  faR,
  faBars,
  faXmark,
  faAddressBook,
  faPhone,
  faEnvelope,
  faAddressCard,
  faPersonDigging,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faHouse,
  faBriefcase,
  faSun,
  faMoon,
  faE,
  faR,
  faBars,
  faXmark,
  faAddressBook,
  faPhone,
  faEnvelope,
  faGithub,
  faTelegram,
  faAddressCard,
  faPersonDigging
)

const app = createApp(App)

const eventBus = (initValue) =>
  createApp({
    data: () => ({ value: initValue }),
    methods: {
      setValue(newValue) {
        this.value = newValue
      },
    },
    render: () => h('div'),
  }).mount(document.createElement('div'))

app.config.globalProperties.$lang = eventBus('ru')
app.config.globalProperties.$isMobile = eventBus(false)
app.config.globalProperties.$theme = eventBus('light')

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
