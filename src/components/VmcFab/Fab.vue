<template>
  <button class="mdc-fab"
    :class="[
      extended && 'mdc-fab--extended',
      mini && 'mdc-fab--mini'
      ]"
    v-ripple:no-surface
  >
    <div class="mdc-fab__ripple"></div>
    <slot></slot>
  </button>
</template>

<script>
import ripple from 'D/ripple'
export default {
  name: 'Fab',
  props: {
    extended: {
      type: Boolean,
      default: false
    },
    mini: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    ripple
  }
}
</script>

<style lang="sass">
@use "@material/fab/mdc-fab"
</style>
