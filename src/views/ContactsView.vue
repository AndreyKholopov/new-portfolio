<script>
import Button from '@/components/Button.vue'
import contacts from '@/data/contacts.json'
import ContactCard from '@/components/Cards/ContactCard.vue'

export default {
  components: {
    Button,
    ContactCard,
  },

  data() {
    return {
      contacts,
      active: contacts[0],
    }
  },
}
</script>

<template>
  <div class="contacts-page">
    <h2>{{ this.$route.meta.name[this.$lang.value] }}</h2>

    <div class="contacts-page__wrap">
      <div class="contacts-page__buttons-wrap">
        <Button
          class="contacts-page__buttons"
          v-for="contact in contacts"
          :key="contact.name"
          :active="active.name === contact.name"
          @click="active = contact"
          solid
          ripple
        >
          <font-awesome-icon v-if="!contact.notFa" :icon="[...contact.icon]" />

          <svg v-if="contact.notFa" :viewBox="contact.viewBox">
            <use
              :xlink:href="`icons/${contact.icon[0]}.svg#${contact.icon[0]}`"
            />
          </svg>
        </Button>
      </div>

      <ContactCard
        class="contacts-page__card"
        v-bind="active"
      ></ContactCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contacts-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 36px);
  padding: 18px 28px;

  &__wrap {
    width: calc(100% - 56px);
    margin: auto 0;
  }

  &__buttons {
    background: var(--gray-color);
    color: var(--white-color);
    fill: var(--white-color);
    aspect-ratio: 1/1;

    svg {
      height: 40px;
    }

    &-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      gap: 22px;
      transition: 0.5s ease-in-out;
    }

    &[active='true'] {
      background: var(--first-color);
    }
  }

  &__card {
    margin: 64px auto;

    @media (max-width: 480px) {
      margin: 32px auto;
    }
  }
}
</style>
