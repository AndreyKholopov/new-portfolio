<script>
export default {
  props: {
    position: {
      validator(value) {
        return [
          'bottom-right',
          'bottom-left',
          'top-left',
          'top-right',
        ].includes(value)
      },
      default: 'bottom-right',
      type: String,
    },
    isShow: {
      default: false,
      type: Boolean,
    },
  },

  emits: ['update:isShow'],

  watch: {
    isShow(val) {
      if (val)
        setTimeout(() => {
          this.$emit('update:isShow', false)
        }, 5000)
    },
  },
}
</script>

<template>
  <transition :name="position">
    <div
      v-if="isShow"
      class="notification"
      :class="`notification__${position}`"
    >
      <slot />
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.notification {
  position: fixed;
  background: var(--white-color);
  border: 4px solid var(--black-color);
  padding: 12px 20px;
  width: min-content;
  z-index: 101;
  color: var(--gray-color);

  &__bottom-right {
    right: 8px;
    bottom: 8px;
    transition: transform 0.35s;
    transform: translateX(0);
  }
}

.bottom-right {
  &-leave-active,
  &-enter-active {
    transform: translateX(150%);
  }
}
</style>
