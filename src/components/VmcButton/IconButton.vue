<template>
  <button class="mdc-icon-button material-icons"
    v-ripple:no-surface&unbounded
  ><slot></slot></button>
</template>

<script>
import ripple from 'D/ripple'

export default {
  name: 'vmc-icon-button',
  directives: {
    ripple
  }
}
</script>

<style lang="sass">
  @use "@material/icon-button/mdc-icon-button"

</style>
