<template>
  <span class="mdc-notched-outline"
    :class="[
      notchWidth && 'mdc-notched-outline--notched',
      !noLabel ? 'mdc-notched-outline--upgraded' : 'mdc-notched-outline--no-label'
      ]"
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
import { computed } from 'vue'
import { noChildren } from '@/util'

export default {
  name: "VmcNotchedOutline",
  props: {
    notchWidth: Number
  },
  setup(props, {slots}) {
    const noLabel = computed(() => noChildren(slots))

    return {
      noLabel
    }
  }
}
</script>

<style lang="sass">
@use "@material/notched-outline/mdc-notched-outline"
</style>
