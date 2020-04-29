<template>
  <div class="mdc-tab-bar">
    <tab-scroller><slot></slot></tab-scroller>
  </div>
</template>

<script>
import TabScroller from './TabScroller.vue'

export default {
  name: 'VmcTabs',
  components: {
    TabScroller
  }
}
</script>

<style lang="sass">
@use "@material/tab-bar/mdc-tab-bar"
</style>
