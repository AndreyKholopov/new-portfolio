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
    }
  },

  methods: {
    setTheme(theme) {
      localStorage.setItem('user-theme', theme)
      document.documentElement.className = `${theme}-theme`
      this.$theme.setValue(theme)
    },

    setLang(lang) {
      localStorage.setItem('user-lang', lang)
      document.documentElement.lang = lang
      this.$lang.setValue(lang)
    },
  },
}
</script>

<template>
  <Switcher
    switcherClass="switch-color"
    :inputs="colorScheme"
    :value="this.$theme.value"
    @checked="setTheme"
  ></Switcher>

  <Switcher
    switcherClass="switch-lang"
    :inputs="langScheme"
    :value="this.$lang.value"
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
