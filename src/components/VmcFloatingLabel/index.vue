<template>
	<span class="mdc-floating-label"
    :class="float && 'mdc-floating-label--float-above'"
  ><slot></slot></span>
</template>

<script>
export default {
  name: "VmcFloatingLabel",
  props: {
    float: Boolean
  }
}
</script>

<style lang="sass">
@use "@material/floating-label/mdc-floating-label"
</style>
