<script>
export default {
  props: {
    inputs: {
      type: Array,
      default: [],
    },
    switcherClass: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },

  computed: {
    checked: {
      get() {
        return this.inputs.findIndex(el => el.value === this.value)
      },
      set(valueInput) {
        this.$emit('checked', this.inputs[valueInput].value)
      },
    },
  },

  emits: ['checked'],
}
</script>

<template>
  <fieldset
    class="switcher"
    :class="switcherClass"
    :style="{
      gridTemplateColumns: inputs.reduce((accum) => accum + '1fr ', ''),
    }"
  >
    <label
      class="switcher__box"
      v-for="(input, index) in inputs"
      :key="input.value"
    >
      <input
        class="switcher__radio"
        type="radio"
        :value="input.value"
        :aria-label="input.label"
        :checked="checked === index"
        @click="checked = index"
      />

      <font-awesome-icon :icon="['fas', `${input.icon}`]" />
    </label>
    <div
      class="switcher__status"
      :style="{ backgroundPosition: `left ${2 + 32 * checked}px center` }"
    ></div>
  </fieldset>
</template>

<style lang="scss" scoped>
.switcher {
  margin: 0;
  margin-left: -50px;
  padding: 2px;
  display: grid;
  border: none;

  &__box {
    position: relative;
    width: 32px;
    height: 32px;
    margin: 0;
    cursor: pointer;
  }

  &__radio {
    -webkit-appearance: none;
    appearance: none;
    width: 32px;
    height: 32px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 24px;
    transition: filter 0.1s ease-in;

    & ~ svg {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 28px;
      height: 28px;
      color: #1a1a1a;
    }

    &:checked ~ svg {
      color: #f9f9f9;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible ~ .switcher__status {
      box-shadow: 0 0 0 2px black;
    }
  }

  &__status {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    box-shadow: 0 0 0 2px rgb(0 0 0 / 0.2);
    border-radius: 18px;
    background-color: rgb(255 255 255 / 0.5);
    background-repeat: no-repeat;
    background-image: url('@/assets/icons/switcher-status.svg');
    background-size: 32px;
    transition: background-position 0.1s ease-in;
  }
}
</style>
