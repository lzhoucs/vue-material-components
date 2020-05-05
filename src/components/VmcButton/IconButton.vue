<template>
  <button class="mdc-icon-button"
    :class="modelValue && 'mdc-icon-button--on'"
    v-ripple.noSurface.unbounded
    @click="$emit('update:modelValue', !modelValue)"
  ><slot></slot></button>

</template>

<script>
import ripple from 'D/ripple'

export default {
  name: 'VmcIconButton',
  props: {
    modelValue: {
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
  @use "@material/icon-button/mdc-icon-button"

</style>
