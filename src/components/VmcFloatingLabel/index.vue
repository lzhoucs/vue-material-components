<template>
	<span class="mdc-floating-label"
    :class="float && 'mdc-floating-label--float-above'"
  ><slot></slot></span>
</template>

<script>
import {estimateScrollWidth} from '@material/dom/ponyfill';

export default {
  name: "VmcFloatingLabel",
  props: {
    float: Boolean
  },
  methods: {
    // due to this, this method can't be replaced in setup
    getWidth() {
      return estimateScrollWidth(this.$el)
    }
  }
}
</script>

<style lang="sass">
@use "@material/floating-label/mdc-floating-label"
</style>
