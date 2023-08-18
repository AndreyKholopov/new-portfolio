<script>
import Switcher from '@/components/Switcher.vue'

export default {
  components: {
    Switcher,
  },

  data() {
    return {
      colorScheme: [
        {
          value: 'light',
          label: 'Светлая',
          icon: 'sun',
        },
        {
          value: 'dark',
          label: 'Темная',
          icon: 'moon',
        },
      ],
      langScheme: [
        {
          value: 'ru',
          label: 'Русский',
          icon: 'r',
        },
        {
          value: 'en',
          label: 'Английский',
          icon: 'e',
        },
      ],
      userTheme: 'light',
      userLang: 'ru',
    }
  },

  mounted() {
    const initUserTheme =
      localStorage.getItem('user-theme') || this.getMediaPreference()
    const initUserLang =
      localStorage.getItem('user-lang') || this.getLangPreference()

    this.setTheme(initUserTheme)
    this.setLang(initUserLang)
  },

  methods: {
    setTheme(theme) {
      localStorage.setItem('user-theme', theme)
      this.userTheme = theme
      document.documentElement.className = `${theme}-theme`
    },

    setLang(lang) {
      localStorage.setItem('user-lang', lang)
      this.userLang = lang
      document.documentElement.lang = lang
      this.$lang.setValue(lang)
    },

    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches

      if (hasDarkPreference) return 'dark'
      else return 'light'
    },

    getLangPreference() {
      const langPreference = navigator.language || navigator.userLanguage

      if (langPreference === 'ru-RU') return 'ru'
      else return 'en'
    },
  },
}
</script>

<template>
  <Switcher
    switcherClass="switch-color"
    :inputs="colorScheme"
    :value="userTheme"
    @checked="setTheme"
  ></Switcher>

  <Switcher
    switcherClass="switch-lang"
    :inputs="langScheme"
    :value="userLang"
    @checked="setLang"
  ></Switcher>
</template>

<style lang="scss">
.switch-color {
  position: fixed;
  top: 8px;
  right: 8px;
  z-index: 100;
}

.switch-lang {
  position: fixed;
  top: 52px;
  right: 8px;
  z-index: 100;

  @media (max-width: 480px) {
    top: 8px;
    right: 88px;
  }
}
</style>
