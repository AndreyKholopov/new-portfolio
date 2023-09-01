<script>
import Button from '@/components/Button.vue'
export default {
  components: {
    Button,
  },

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

  data() {
    return {
      timer: {}
    }
  },

  emits: ['update:isShow'],

  watch: {
    isShow(val) {
      if (val)
        this.timer = setTimeout(() => {
          this.$emit('update:isShow', false)
        }, 5000)
    },
  },

  methods: {
    closeNotification() {
      clearTimeout(this.timer)
      this.$emit('update:isShow', false)
    }
  }
}
</script>

<template>
  <transition :name="position">
    <div
      v-if="isShow"
      class="notification"
      :class="`notification__${position}`"
    >
      <Button class="notification__close-button" round @click="closeNotification">&#215;</Button>
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

  &__close-button {
    position: absolute;
    right: 8px;
    padding: 0 6px 3px;
    font-weight: bold;
    font-size: 30px;
    line-height: 0;
    color: var(--black-color);
    border-color: var(--black-color);
  }

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
