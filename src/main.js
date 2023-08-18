import '@/assets/styles/main.scss'

import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHouse,
  faSun,
  faMoon,
  faE,
  faR,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

library.add(faHouse, faSun, faMoon, faE, faR, faBars, faXmark)

const app = createApp(App)

app.config.globalProperties.$lang = createApp({
  data: () => ({ value: 'ru' }),
  methods: {
    setValue(newValue) {
      this.value = newValue
    },
  },
  render: () => h('div'),
}).mount(document.createElement('div'))

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
