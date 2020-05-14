<template>
  <ul class="mdc-list"
    :class="twoLine && 'mdc-list--two-line'"
  >
    <component :is="items" />
  </ul>
</template>

<script>
import {isListChildren, isListItemComponent, addOrRemove} from '@/util'
import { mergeProps  } from 'vue'

export default {
  name: 'VmcList',
  props: {
    selectionMode: String,
    selectionKey: {
      type: String,
      default: 'value'
    },
    // TODO Is there way to not define type for this one
    modelValue: [String, Array]
  },
  setup(props, {slots, emit}) {
    const children = slots.default ? slots.default() : []
    if(!children.every(isListChildren)) {
      console.warn('VmcListItem is expected to be the default slot of VmcList')
    }

    const twoLine = children.some(({props}) => props && props.title && props.subtitle)

    return {
      twoLine,
      items: () => {
        // skip when no selectionMode is specified
        if (!props.selectionMode) return children;

        const singleMode = props.selectionMode.startsWith('single')

        children.forEach(vnode => {
          // skip stuff like dividers
          if (!isListItemComponent(vnode)) return vnode;

          const value = vnode.props[props.selectionKey]
          const selected = singleMode ? props.modelValue === value : (props.modelValue || []).includes(value)

          vnode.props = mergeProps(vnode.props, {
            onClick() {
              const currentlySelected = vnode.props.selected
              if (singleMode) {
                // in single selection mode, skip when it is already selected, however this is very optional
                // since nothing would happen when emit an existing value up, vue seems to have mechanism to avoid
                // unnecessary rendering when prop isn't changed as a result of an emit
                if (currentlySelected) return;
                else emit("update:modelValue", value)
              } else {
                const newModelValue = addOrRemove(props.modelValue, value, !currentlySelected)
                emit('update:modelValue', newModelValue)
              }
            },
            selected
          })
        })

        return children
      }
    }
  }
}
</script>

<style lang="sass">
  @use "@material/list/mdc-list"
</style>
