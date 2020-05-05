<template>
  <span class="mdc-line-ripple"
    :class="active ? 'mdc-line-ripple--active' : 'mdc-line-ripple--deactivating'"
    :style="transformOriginX && {'transform-origin': `${transformOriginX}px center`}"
  ></span>
</template>

<script>
export default {
  name: 'VmcLineRipple',
  props: {
    transformOriginX: Number,
    active: Boolean
  }
}
</script>

<style lang="sass">
@use "@material/line-ripple/mdc-line-ripple"
</style>
