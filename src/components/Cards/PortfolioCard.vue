<script>
import Button from '@/components/Button.vue'

export default {
  components: {
    Button,
  },

  props: {
    img: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    links: {
      type: Object,
      default: {},
    },
  },

  data() {
    return {
      standartLinkName: {
        ru: 'Открыть',
        en: 'Open',
      },
    }
  },
}
</script>

<template>
  <div class="card">
    <a class="card__image_wrap" :href="links['Site']" target="_blank">
      <img class="card__image" :src="`/images/${img}`" :alt="img" />

      <Button class="card__image_button" solid>&#11016;</Button>
    </a>

    <div class="card__wrap">
      <h3 class="card__title">{{ name }}</h3>
      <p class="card__description">{{ description }}</p>

      <div class="card__button-wrap">
        <a
          v-for="(link, linkName) in links"
          :key="link"
          :href="link"
          target="_blank"
        >
          <Button class="card__button" ripple solid>
            {{
              linkName === 'Site'
                ? standartLinkName[this.$lang.value]
                : linkName
            }}
          </Button>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  background: var(--white-color);
  transition: background-color 0.4s;
  padding: 16px 16px 80px;
  width: 300px;

  &__image {
    width: 100%;
    margin-bottom: 12px;

    &:hover {
      ~ .card__image_button {
        background: var(--first-color);
      }
    }

    &_wrap {
      position: relative;
    }

    &_button {
      position: absolute;
      padding: 20px 28px 20px 28px;
      bottom: -16px;
      right: 16px;
      font-size: 32px;
      aspect-ratio: 1/1;
    }
  }

  &__wrap {
    width: 100%;
    margin: 0;
    color: var(--gray-color);
    transition: opacity 0.25s ease-in-out;
  }

  &__title {
    text-transform: uppercase;
    padding: 15px 10px 0;
    margin: 0;
    color: var(--black-color);
  }

  &__description {
    padding: 7px 10px;
    margin: 0;
  }

  &__button {
    padding: 14px;
    font-weight: bold;

    &-wrap {
      position: absolute;
      bottom: 16px;
      display: flex;
      justify-content: space-around;
      gap: 14px;
      margin-top: 24px;
    }
  }
}
</style>
