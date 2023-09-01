<script>
import experience from '@/data/experience.json'
import ExperienceCard from '@/components/Cards/ExperienceCard.vue'

export default {
  components: {
    ExperienceCard,
  },

  data() {
    return {
      experience,
    }
  },
}
</script>

<template>
  <div class="experience-page">
    <h2>{{ this.$route.meta.name[this.$lang.value] }}</h2>

    <div class="experience-page__card-wrap">
      <ExperienceCard
        v-for="card in experience"
        :key="card.name"
        v-bind="card"
      ></ExperienceCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.experience-page {
  min-height: calc(100vh - 36px);
  padding: 18px 28px;

  &__card-wrap {
    display: flex;
    flex-direction: column;
    gap: 60px;
  }
}
</style>
