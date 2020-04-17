<template>
  <button class="mdc-button"
    :class="raised && 'mdc-button--raised'"
    v-ripple>
   <div class="mdc-button__ripple"></div>
   <span class="mdc-button__label"><slot></slot></span>
</button>
</template>

<script>
import ripple from 'D/ripple'

export default {
  name: 'vpc-button',
  props: {
    raised: {
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
  @use "@material/button/mdc-button"

</style>
