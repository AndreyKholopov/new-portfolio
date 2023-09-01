<script>
import Button from '@/components/Button.vue'
import Notification from '@/components/Notification.vue'
import Header from '@/components/Header.vue'

import EnSurname from '@/components/Titles/EnSurname.vue'
import EnName from '@/components/Titles/EnName.vue'
import RuSurname from '@/components/Titles/RuSurname.vue'
import RuName from '@/components/Titles/RuName.vue'

export default {
  components: {
    Header,
    Button,
    Notification,
    EnSurname,
    EnName,
    RuSurname,
    RuName,
  },

  data() {
    return {
      showNotification: false,
      pageName: {
        ru: 'Сайт портфолио',
        en: 'Portfolio website of',
      },
    }
  },
}
</script>

<template>
  <div class="home-page">
    <Header></Header>

    <div class="home-page__content">
      <h2>{{ pageName[this.$lang.value] }}</h2>

      <EnSurname
        v-if="this.$lang.value === 'en'"
        class="home-page__surname"
      ></EnSurname>
      <EnName v-if="this.$lang.value === 'en'" class="home-page__name"></EnName>

      <RuSurname
        v-if="this.$lang.value === 'ru'"
        class="home-page__surname"
      ></RuSurname>
      <RuName v-if="this.$lang.value === 'ru'" class="home-page__name"></RuName>
    </div>

    <Button class="help-button" ripple round @click="showNotification = true">
      ?
    </Button>

    <Notification
      v-model:isShow="showNotification"
    >
      <div v-if="this.$lang.value === 'ru'">
        <p style="min-width: 300px">
          Вы можете переключаться между страницами с помощью:
        </p>

        <ol>
          <li>Кнопок на навигационной панели слева;</li>
          <li>Клавиш верх и вниз на клавиатуре пролистав до конца страницы;</li>
          <li>
            Свайпа на мобильных устройствах или колеса мыши на пк пролистав до
            конца страницы.
          </li>
        </ol>
      </div>

      <div v-if="this.$lang.value === 'en'">
        <p style="min-width: 300px">You can switch between pages using:</p>

      <ol>
        <li>Buttons on the navigation bar;</li>
        <li>
          Up and down keys on the keyboard to scroll to the bottom of the page;
        </li>
        <li>
          Swipe on mobile devices or mouse wheel on PC by scrolling to the
          bottom of the page.
        </li>
      </ol>
      </div>
    </Notification>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  min-height: calc(100vh - 36px);
  padding: 18px 28px;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 36px);
  }

  &__surname {
    min-width: 350px;
    width: 50%;
  }

  &__name {
    margin-top: 32px;
    min-width: 270px;
    width: 38%;
  }
}

.help-button {
  position: absolute;
  right: 8px;
  bottom: 8px;
  font-size: 2.2em;
  font-weight: bold;
  padding: 18px 28px;

  @media (max-width: 480px) {
    font-size: 1.6em;
    padding: 16px 22px;
  }
}
</style>
