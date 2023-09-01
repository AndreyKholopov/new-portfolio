<script>
import { nextTick } from 'vue'

export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      shearBlockWidth: 50,
    }
  },

  mounted() {
    if (!this.$isMobile.value) this.changeShearBlockWidth()
  },

  watch: {
    '$isMobile.value': {
      handler(val) {
        if (!val) this.changeShearBlockWidth()
      },
      deep: true,
    },
  },

  methods: {
    async changeShearBlockWidth() {
      await nextTick()
      this.shearBlockWidth = this.$refs.nav.offsetWidth
    },
  },
}
</script>

<template>
  <div
    v-if="!this.$isMobile.value"
    class="shear-block"
    :style="{ minWidth: `${shearBlockWidth}px` }"
  ></div>

  <font-awesome-icon
    v-if="this.$isMobile.value"
    class="nav__open-button"
    :icon="['fas', isOpen ? 'xmark' : 'bars']"
    @click="() => (isOpen = !isOpen)"
  />

  <aside class="nav__wrap" :class="{ nav__wrap_active: isOpen }" ref="nav">
    <nav class="nav">
      <RouterLink
        v-for="item in list"
        :key="item.name"
        :to="{ name: item.name }"
        class="nav__link"
      >
        <font-awesome-icon :icon="['fas', item.meta.icon]" />

        <span v-if="this.$isMobile.value">{{
          item.meta.name[this.$lang.value]
        }}</span>
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
  gap: 26px;
  padding: 32px 8px;
  height: calc(100% - 64px);

  &__open-button {
    position: fixed;
    top: 10px;
    left: 10px;
    color: var(--title-color);
    width: 30px;
    height: 30px;
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
      transition: transform 0.3s ease;

      &_active {
        transform: translate(0);
      }
    }
  }

  &__link {
    transition: color 0.25s;
    color: var(--title-color);
    padding: 8px;

    span {
      margin-left: 8px;
    }

    &:hover {
      color: var(--nav-active-color);
    }

    &.router-link-exact-active {
      color: var(--nav-active-color);
      text-decoration: underline;
      font-weight: bold;
    }
  }
}
</style>
