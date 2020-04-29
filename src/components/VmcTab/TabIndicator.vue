<template>
    <span class="mdc-tab-indicator"
      :class="[
        active && 'mdc-tab-indicator--active'
        ]"
    >
      <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
    </span>

</template>

<script>
export default {
  name: 'TabIndicator',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass">
@use "@material/tab-indicator/mdc-tab-indicator"
</style>
