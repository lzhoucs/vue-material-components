<template>
  <button class="mdc-tab"
    :class="[
      active && 'mdc-tab--active'
      ]"
  >
    <span class="mdc-tab__content">
      <slot></slot>
    </span>
    <tab-indicator :active="active"></tab-indicator>
    <span class="mdc-tab__ripple"></span>
  </button>

</template>

<script>
import TabIndicator from './TabIndicator.vue'
export default {
  name: 'Tab',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TabIndicator
  }
}
</script>

<style lang="sass">
@use "@material/tab/mdc-tab"
</style>
