<script>
export default {
  data() {
    return {
      howOld: this.getHowOld(),
    }
  },

  computed: {
    about() {
      const text =
        this.$lang.value === 'ru'
          ? [
              `Я <b>Холопов Андрей Андреевич</b>. Мне ${this.howOld} лет и я <b>фронтенд разработчик</b>. В основном работаю с <b>Vue.js</b> и <b>React</b>, а также имею опыт с <b>Svelte</b>. Без проблем читаю документацию на английском. На хорошем уровне владею Photoshop и Figma.`,
              'Имею неполное высшее. Доучился до 3 курса Московского Авиационного Института.',
              'Проходил службу в армии. Во время службы получил управленческий опыт работы на должности заместителя командира взвода роты молодого пополнения (КМБ) и начальника бригадной смены.',
              'Мне хочется и нравится развиваться в сфере фронтенда и веб разработки.',
            ]
          : [
              `I am <b>Kholopov Andrey Andreevich</b>. ${this.howOld} years old.  I work as a <b>front-end developer</b>. Mainly work with <b>Vue.js</b> and <b>React</b>, and also have experience with <b>Svelte</b>. Read the documentation in English without any problems. I have good knowledge of Photoshop and Figma.`,
              'I have an incomplete higher education, but left on 3rd year of study in the Moscow Aviation Institute.',
              'i am served in the army. During my service, when gained managerial experience as a deputy platoon commander of a young replacement company and a brigade shift leader.',
              'I want and like to develop in the field of front-end and web development.',
            ]
      return text.reduce((acc, el) => acc + '<br /><br />' + el)
    },
  },

  methods: {
    getHowOld() {
      const date = new Date()
      const birhdayDate = new Date(1994, 10, 25)
      const res = new Date(date - birhdayDate)

      return ~~(res / (1000 * 3600 * 24 * 365))
    },
  },
}
</script>

<template>
  <div class="about-page">
    <h2>{{ this.$route.meta.name[this.$lang.value] }}</h2>

    <div class="about-page__content-wrap">
      <div class="about-page__content-image-wrap">
        <img
          src="@/assets/images/myPhoto.jpeg"
          alt="my photo"
          class="about-page__content-image"
        />
        <div class="about-page__content-image-shadow"></div>
      </div>

      <p class="about-page__content" v-html="about"></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-page {
  min-height: calc(100vh - 36px);
  padding: 18px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__content {
    color: var(--text-color);
    min-width: 300px;
    width: calc(100% - 390px);

    @media (max-width: 800px) {
      width: 100%;
    }

    &-wrap {
      margin: auto;
      padding-bottom: 81px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 40px;
      max-width: 1000px;

      @media (max-width: 800px) {
        padding-bottom: 0;
      }
    }

    &-image {
      width: 300px;
      border: 4px solid var(--black-color);

      &-wrap {
        position: relative;
      }

      &-shadow {
        position: absolute;
        top: 16px;
        left: 16px;
        width: 300px;
        height: 375px;
        border: 4px solid var(--black-color);
        z-index: -1;
        background: var(--container-color);
      }
    }
  }
}
</style>
