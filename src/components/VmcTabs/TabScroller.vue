<template>
  <div class="mdc-tab-scroller">
    <div class="mdc-tab-scroller__scroll-area">
      <div class="mdc-tab-scroller__scroll-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
// doesn't do much right now, or is there anything needs to be done?
export default {
  name: 'TabScroller'
}
</script>

<style lang="sass">
@use "@material/tab-scroller/mdc-tab-scroller"
</style>
