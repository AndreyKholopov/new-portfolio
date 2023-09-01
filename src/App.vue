<script>
import router from '@/router'
import Nav from '@/layout/Nav.vue'
import checkSwipeY from '@/api/checkSwipeY'

export default {
  components: {
    Nav,
  },

  data() {
    return {
      navList: router.getRoutes(),
      transitionName: '',
      previousScrollTopPosition: 0,
      scrollOnTop: true,
      scrollOnBottom: false,
      lockScroll: false,
      mobile: 480,
    }
  },

  created() {
    window.onwheel = (ev) => this.onwheel(ev)
    window.onkeydown = (ev) => this.onkeydown(ev)
    checkSwipeY(this.goToNextPage, this.goToPreviousPage)
    window.onscroll = () => this.onScroll()

    this.checkMobile()
    onresize = () => this.checkMobile()
  },

  mounted() {
    const initUserTheme =
      localStorage.getItem('user-theme') || this.getMediaPreference()
    const initUserLang =
      localStorage.getItem('user-lang') || this.getLangPreference()

    this.setTheme(initUserTheme)
    this.setLang(initUserLang)
  },

  watch: {
    $route(to, from) {
      if (!from.name) return ''
      this.transitionName =
        to.meta.index > from.meta.index ? 'move-up' : 'move-down'

      this.lockScroll = true

      setTimeout(() => {
        this.lockScroll = false
      }, 1000)
    },
  },

  methods: {
    checkMobile() {
      window.innerWidth > this.mobile
        ? this.$isMobile.setValue(false)
        : this.$isMobile.setValue(true)
    },

    goToNextPage() {
      if (!this.lockScroll) {
        const htmlHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight

        if (this.scrollOnBottom || htmlHeight === clientHeight) {
          const nextPage = this.navList[this.$route.meta.index + 1]

          if (nextPage) router.push({ name: nextPage.name })
        }
      }
    },

    goToPreviousPage() {
      if (!this.lockScroll && this.scrollOnTop) {
        const previousPage = this.navList[this.$route.meta.index - 1]

        if (previousPage) router.push({ name: previousPage.name })
      }
    },

    onwheel(ev) {
      if (ev.wheelDeltaY > 0) this.goToPreviousPage()
      else if (ev.wheelDeltaY < 0) this.goToNextPage()
    },

    onkeydown(ev) {
      if (ev.code === 'ArrowUp') this.goToPreviousPage()
      else if (ev.code === 'ArrowDown') this.goToNextPage()
    },

    onScroll() {
      this.scrollOnTop = false
      this.scrollOnBottom = false

      const scrollTopPosition = window.scrollY
      const htmlHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight

      if (
        this.previousScrollTopPosition > scrollTopPosition &&
        scrollTopPosition === 0
      ) {
        this.scrollOnTop = true
      } else if (
        this.previousScrollTopPosition < scrollTopPosition &&
        htmlHeight === clientHeight + scrollTopPosition
      ) {
        this.scrollOnBottom = true
      }

      this.previousScrollTopPosition = scrollTopPosition
    },

    setTheme(theme) {
      localStorage.setItem('user-theme', theme)
      document.documentElement.className = `${theme}-theme`
      this.$theme.setValue(theme)
    },

    setLang(lang) {
      localStorage.setItem('user-lang', lang)
      document.documentElement.lang = lang
      this.$lang.setValue(lang)
    },

    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches

      if (hasDarkPreference) return 'dark'
      else return 'light'
    },

    getLangPreference() {
      const langPreference = navigator.language || navigator.userLanguage

      if (langPreference === 'ru-RU') return 'ru'
      else return 'en'
    },
  },
}
</script>

<template>
  <Nav :list="navList"></Nav>

  <main>
    <RouterView v-slot="{ Component }">
      <transition :name="transitionName" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </transition>
    </RouterView>
  </main>
</template>

<style lang="scss" scoped>
.move-up,
.move-down {
  &-enter-active,
  &-leave-active {
    transition: transform 0.3s ease-in-out;
  }

  &-enter-active {
    height: 100vh;
    z-index: 50;
  }

  &-leave-active {
    z-index: 40;
  }
}
.move-up {
  &-enter-from {
    transform: translateY(100%);
  }

  &-enter-to,
  &-leave-from {
    transform: translateY(0);
  }

  &-leave-to {
    transform: translateY(-100%);
  }
}

.move-down {
  &-enter-from {
    transform: translateY(-100%);
  }

  &-enter-to,
  &-leave-from {
    transform: translateY(0);
  }

  &-leave-to {
    transform: translateY(100%);
  }
}
</style>
