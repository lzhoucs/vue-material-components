<template>
  <span class="mdc-notched-outline"
    :class="notchWidth && 'mdc-notched-outline--notched'"
  >
      <span class="mdc-notched-outline__leading"></span>
      <span class="mdc-notched-outline__notch"
        :style="notchWidth && {'width': `${notchWidth + 8}px`}"
      >
        <slot></slot>
      </span>
      <span class="mdc-notched-outline__trailing"></span>
  </span>

</template>

<script>

export default {
  name: "VmcNotchedOutline",
  props: {
    notchWidth: Number
  }
}
</script>

<style lang="sass">
@use "@material/notched-outline/mdc-notched-outline"
</style>
