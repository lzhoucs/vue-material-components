<template>
  <button class="mdc-tab"
    :class="[
      active && 'mdc-tab--active',
      stacked && 'mdc-tab--stacked'
      ]"
    @click="!active && $emit('activate', href)"
  >
    <span class="mdc-tab__content">
      <slot></slot>
    </span>
    <tab-indicator :active="active"></tab-indicator>
    <span class="mdc-tab__ripple"
    v-ripple.noSurface
    ></span>
  </button>

</template>

<script>
import ripple from 'D/ripple'
import TabIndicator from './TabIndicator.vue'
export default {
  name: 'Tab',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      required: true
    },
    stacked: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TabIndicator
  },
  directives: {
    ripple
  }
}
</script>

<style lang="sass">
@use "@material/tab/mdc-tab"
</style>
