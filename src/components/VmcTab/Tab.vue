<template>
  <button class="mdc-tab"
    :class="[
      active && 'mdc-tab--active'
      ]"
    @click="!active && $emit('activate', href)"
  >
    <span class="mdc-tab__content">
      <slot></slot>
    </span>
    <tab-indicator :active="active"></tab-indicator>
    <span class="mdc-tab__ripple"
    v-ripple:no-surface
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
