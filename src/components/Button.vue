<script>
export default {
  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    ripple: {
      default: false,
      type: Boolean,
    },
    round: {
      default: false,
      type: Boolean,
    },
    solid: {
      default: false,
      type: Boolean,
    },
  },

  emits: ['click'],

  mounted() {
    if (this.ripple)
      this.$refs.refButton.addEventListener('click', this.rippleOnButton)
  },

  methods: {
    rippleOnButton(e) {
      const x = e.layerX
      const y = e.layerY

      const ripples = document.createElement('div')

      ripples.style.left = x + 'px'
      ripples.style.top = y + 'px'

      this.$refs.refButton.appendChild(ripples).classList.add('ripples')

      setTimeout(() => {
        ripples.remove()
      }, 1000)
    },

    onClick() {
      this.$emit('click')
    },
  },
}
</script>

<template>
  <button
    @click="onClick"
    :disabled="disabled"
    ref="refButton"
    class="button"
    :class="solid && 'button__solid'"
    :style="
      round && {
        borderRadius: '50%',
        aspectRatio: '1/1',
      }
    "
  >
    <slot />
  </button>
</template>

<style>
/* ripples */
.button .ripples {
  position: absolute;

  transform: translate(-50%, -50%);

  border-radius: 50%;

  background: var(--white-color);

  pointer-events: none;
  animation: animate-ripples 1s linear infinite;
}

@keyframes animate-ripples {
  0% {
    width: 0;
    height: 0;

    opacity: 0.5;
  }
  100% {
    width: 500px;
    height: 500px;

    opacity: 0;
  }
}
</style>

<style lang="scss" scoped>
.button {
  position: relative;

  padding: 22px 28px 18px 28px;
  margin: 0;

  min-width: min-content;

  border: 3px solid var(--text-color);
  outline: none;
  overflow: hidden;

  color: var(--text-color);
  background: transparent;

  cursor: pointer;
  transition: 0.25s linear;

  &:hover,
  &:focus {
    border: 3px solid var(--first-color);
  }

  &[disabled] {
    opacity: 0.5;
    cursor: auto;

    &:hover,
    &:focus {
      border: 3px solid var(--text-color);
    }
  }

  &__solid {
    border: none;
    background: var(--black-color);
    color: var(--white-color);

    &:hover,
    &:focus {
      border: none;
      background: var(--first-color);
    }
  }
}
</style>
