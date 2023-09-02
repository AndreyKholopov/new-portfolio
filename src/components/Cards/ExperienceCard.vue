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
    dateRange: {
      type: Array,
      default: [],
    },
    link: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      startDate: this.getDate(this.dateRange[0]),
      finishDate: this.getDate(this.dateRange[1]),
    }
  },

  computed: {
    descriptionWithLink() {
      return this.description
        .split(' ')
        .map((el) => {
          if (!el.includes('http')) return el

          const res = el.replaceAll(/,|\(|\)/g, '')
          return `<a href="${res}" target="blank">${el}</a>`
        })
        .join(' ')
    },
  },

  methods: {
    getDate(range) {
      let date = new Date(range)
      date = date.toLocaleString(this.$lang.value, {
        year: 'numeric',
        month: 'long',
      })
      return date.charAt(0).toUpperCase() + date.slice(1)
    },
  },
}
</script>

<template>
  <div class="card">
    <a class="card__image_wrap" :href="link" target="_blank">
      <img class="card__image" :src="`/images/${img}`" :alt="img" />

      <Button class="card__image_button" solid>&#11016;</Button>
    </a>

    <div class="card__wrap">
      <h3 class="card__title">{{ name }}</h3>
      <p class="card__date">{{ startDate }} — {{ finishDate }}</p>
      <p class="card__description" v-html="descriptionWithLink"></p>
    </div>
  </div>
</template>

<style lang="scss">
.card {
  &__description {
    a {
      font-weight: bold;
      color: var(--black-color);
      transition: color 0.3s ease-in-out;

      &:hover {
        color: var(--first-color);
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.card {
  position: relative;
  background: var(--white-color);
  transition: background-color 0.4s;
  display: flex;

  @media (max-width: 750px) {
    flex-wrap: wrap;
    padding-bottom: 20px;
  }

  &__image {
    width: 200px;

    &_wrap {
      display: flex;
      justify-content: center;
      position: relative;
      background: #fff;

      @media (max-width: 750px) {
        margin-bottom: 40px;
        width: 100%;
      }

      &:hover {
        .card__image_button {
          background: var(--first-color);
        }
      }
    }

    &_button {
      position: absolute;
      padding: 20px 28px 20px 28px;
      bottom: -40px;
      right: -16px;
      font-size: 32px;
      aspect-ratio: 1/1;
    }
  }

  &__wrap {
    width: 100%;
    margin: 0;
    margin-left: 16px;
    color: var(--gray-color);
    transition: opacity 0.25s ease-in-out;
  }

  &__title {
    text-transform: uppercase;
    padding: 15px 10px 0;
    margin: 0;
    color: var(--black-color);
  }

  &__date {
    padding: 16px 10px;
    margin: 0;
  }

  &__description {
    padding: 7px 10px;
    margin: 0;
  }
}
</style>
