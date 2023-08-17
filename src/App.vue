<script>
import router from '@/router'
import Nav from '@/layout/Nav.vue'
import Header from '@/layout/Header.vue'

export default {
  components: {
    Nav,
    Header
  },

  data() {
    return {
      navList: router.getRoutes(),
    }
  },
}
</script>

<template>
  <Nav :list="navList"></Nav>

  <Header></Header>

  <RouterView />
</template>
