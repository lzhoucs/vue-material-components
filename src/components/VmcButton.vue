<template>
 <button class="mdc-button" v-ripple>
   <div class="mdc-button__ripple"></div>
   <span class="mdc-button__label"><slot>Button Label</slot></span>
</button>
</template>

<script>
import ripple from 'D/ripple'

export default {
  name: 'vpc-button',
  directives: {
    ripple
  }
}
</script>

<style lang="sass">
  @use "@material/button/mdc-button"

</style>
