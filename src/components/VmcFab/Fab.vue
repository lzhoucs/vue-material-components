<template>
  <button class="mdc-fab"
    :class="[
      extended && 'mdc-fab--extended',
      mini && 'mdc-fab--mini'
      ]"
  >
    <div class="mdc-fab__ripple"></div>
    <slot></slot>
  </button>
</template>

<script>
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
  }
}
</script>

<style lang="sass">
@use "@material/fab/mdc-fab"
</style>
