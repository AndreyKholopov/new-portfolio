<script>
import PortfolioCard from '@/components/Cards/PortfolioCard.vue'
import projects from '@/data/projects.json'

export default {
  components: {
    PortfolioCard,
  },

  data() {
    return {
      projects,
    }
  },
}
</script>

<template>
  <div class="portfolio-page">
    <h2>{{ this.$route.meta.name[this.$lang.value] }}</h2>

    <div class="portfolio-page__cards-wrap">
      <PortfolioCard
        v-for="project in projects"
        :key="project.name"
        :description="project.about[this.$lang.value]"
        v-bind="project"
      >
      </PortfolioCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.portfolio-page {
  min-height: calc(100vh - 36px);
  padding: 18px 28px;

  &__cards-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 22px;
  }
}
</style>
