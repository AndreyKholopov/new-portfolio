<script>
import Button from '@/components/Button.vue'

export default {
  components: {
    Button,
  },

  props: {
    name: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
  },

  methods: {
    copyInBuffer() {
      navigator.clipboard.writeText(this.value).catch((err) => {
        console.error('Error in copying text: ', err)
      })
    },

    getLink() {
      switch (this.name) {
        case 'phone':
          return `tel:${this.value}`

        case 'mail':
          return `mailto:${this.value}`

        default:
          return this.link || this.value
      }
    },
  },
}
</script>

<template>
  <div
    class="card"
    :style="{
      maxWidth: this.$isMobile.value
        ? 'calc(100vw - 113px)'
        : 'calc(100vw - 163px)',
    }"
  >
    <div class="card__title-wrap" @click="copyInBuffer">
      <h3 class="card__title">{{ value }}</h3>
    </div>

    <a :href="getLink()" target="_blank">
      <Button class="card__button" solid>&#11016;</Button>
    </a>
  </div>
</template>

<style lang="scss" scoped>
@mixin scroll {
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.4);
  }

  &::-webkit-scrollbar-thumb:active {
    background: rgba(0, 0, 0, 0.9);
  }
}

.card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: end;
  background: var(--white-color);
  transition: background-color 0.4s;
  width: min-content;
  overflow: hidden;

  &__button {
    padding: 20px 28px 20px 28px;
    font-size: 32px;
    aspect-ratio: 1/1;
  }

  &__title {
    padding: 24px 32px;
    white-space: nowrap;
    margin: 0;
    color: var(--black-color);

    @media (max-width: 480px) {
      padding: 24px 16px;
    }

    &-wrap {
      @include scroll();

      cursor: pointer;
      overflow-y: auto;
    }
  }
}
</style>
