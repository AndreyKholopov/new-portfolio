<script>
import router from '@/router'
import Nav from '@/layout/Nav.vue'
import Header from '@/layout/Header.vue'
import checkSwipeY from '@/api/checkSwipeY'

export default {
  components: {
    Nav,
    Header,
  },

  data() {
    return {
      navList: router.getRoutes(),
      transitionName: '',
      previousScrollTopPosition: 0,
      scrollOnTop: true,
      scrollOnBottom: false,
    }
  },

  created() {
    window.onwheel = (ev) => this.onwheel(ev)
    checkSwipeY(this.goToNextPage, this.goToPreviousPage)
    window.onscroll = () => this.onScroll()
  },

  watch: {
    $route(to, from) {
      if (!from.name) return ''
      this.transitionName =
        to.meta.index > from.meta.index ? 'move-up' : 'move-down'
    },
  },

  methods: {
    goToNextPage() {
      const htmlHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight

      if (this.scrollOnBottom || htmlHeight === clientHeight) {
        const nextPage = this.navList[this.$route.meta.index + 1]
        if (nextPage) router.push({ name: nextPage.name })
      }
    },

    goToPreviousPage() {
      if (this.scrollOnTop) {
        const previousPage = this.navList[this.$route.meta.index - 1]
        if (previousPage) router.push({ name: previousPage.name })
      }
    },

    onwheel(ev) {
      if (ev.wheelDeltaY > 0) this.goToPreviousPage()
      else if (ev.wheelDeltaY < 0) this.goToNextPage()
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
  },
}
</script>

<template>
  <Nav :list="navList"></Nav>

  <Header></Header>

  <main>
    <RouterView v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component" :key="$route.path" />
      </transition>
    </RouterView>
  </main>
</template>

<style lang="scss">
.move-up {
  &-enter-active {
    position: absolute;
    transform-origin: bottom;
    animation: moveEnter 0.5s ease-in;
  }

  &-leave-active {
    position: absolute;
    transform-origin: top;
    animation: moveLeave 0.5s ease-in;
  }
}

.move-down {
  &-enter-active {
    position: absolute;
    transform-origin: top;
    animation: moveEnter 0.5s ease-in;
  }

  &-leave-active {
    position: absolute;
    transform-origin: bottom;
    animation: moveLeave 0.5s ease-in;
  }
}

@keyframes moveEnter {
  0% {
    transform: scaleY(0);
  }
  85% {
    transform: scaleY(1);
  }
}

@keyframes moveLeave {
  0% {
    transform: scaleY(1);
  }
  85% {
    transform: scaleY(0);
  }
}
</style>
