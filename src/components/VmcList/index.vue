<template>
  <ul class="mdc-list"
    :class="twoLine && 'mdc-list--two-line'"
  >
    <component :is="items" />
  </ul>
</template>

<script>
import {isListChildren} from '@/util'

export default {
  name: 'VmcList',
  setup(props, {slots, emit}) {
    const children = slots.default ? slots.default() : []
    if(!children.every(isListChildren)) {
      console.warn('VmcListItem is expected to be the default slot of VmcList')
    }

    const twoLine = children.some(({props}) => props && props.title && props.subtitle)
    return {
      twoLine,
      items: () => children
    }
  }
}
</script>

<style lang="sass">
  @use "@material/list/mdc-list"
</style>
