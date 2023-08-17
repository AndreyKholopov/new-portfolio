<script>
export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
    mobile: {
      type: Number,
      default: 480,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      shearBlockWidth: 0,
      isMobile: false,
    }
  },

  mounted() {
    this.checkMobile()
    onresize = () => {
      this.checkMobile()
    }
  },

  methods: {
    checkMobile() {
      window.innerWidth > this.mobile
        ? (this.isMobile = false)
        : (this.isMobile = true)

      setTimeout(() => {
        if (!this.isMobile) this.shearBlockWidth = this.$refs.nav.offsetWidth
      }, 0)
    },
  },
}
</script>

<template>
  <div
    v-if="!isMobile"
    class="shear-block"
    :style="{ width: `${shearBlockWidth}px` }"
  ></div>

  <font-awesome-icon
    v-if="isMobile"
    class="nav__open-button"
    :icon="['fas', isOpen ? 'xmark' : 'bars']"
    @click="() => isOpen = !isOpen"
  />

  <aside class="nav__wrap" :class="{ nav__wrap_active: isOpen }" ref="nav">
    <nav class="nav">
      <RouterLink
        v-for="item in list"
        :key="item.name"
        :to="{ name: item.name }"
        class="nav__link"
      >
        <font-awesome-icon :icon="['fas', `${item.meta.icon}`]" />

        <span v-if="isMobile">{{ item.meta.name[this.$lang.value] }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<style lang="scss">
.shear-block {
  height: 100%;
}

.nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  padding: 32px 16px;
  height: calc(100% - 64px);

  &__open-button {
    position: absolute;
    top: 12px;
    left: 12px;
    color: var(--font-color);
    width: 32px;
    height: 32px;
    z-index: 1100;
  }

  &__wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: var(--nav-color);
    overflow-x: hidden;
    overflow-y: auto;

    @media (max-width: 480px) {
      width: 100vw;
      transform: translate(-100%);
      transition: background-color 0.5s, opacity 0.5s, transform 0.3s ease;

      &_active {
        transform: translate(0);
      }
    }
  }

  &__link {
    transition: color 0.25s;
    color: var(--font-color);

    span {
      margin-left: 8px;
    }

    &:hover {
      color: var(--font-accent-color);
    }

    &.router-link-exact-active {
      color: var(--active-color);
    }
  }
}
</style>
