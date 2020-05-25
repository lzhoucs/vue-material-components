<template>
  <ul class="mdc-list"
    :class="twoLine && 'mdc-list--two-line'"
  >
    <component :is="items" />
  </ul>
</template>

<script>
import {isListChildren, isListItemComponent, addOrRemove} from '@/util'
import VmcRadio from "C/VmcRadio"
import { cloneVNode,
         h,
         /* not available for import: normalizeChildren, ShapeFlags  */
         getCurrentInstance,
} from 'vue'

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

        return children.map(vnode => {
          // skip stuff like dividers
          if (!isListItemComponent(vnode)) return vnode;

          const value = vnode.props[props.selectionKey]
          const selected = singleMode ? props.modelValue === value : (props.modelValue || []).includes(value)

          const newVNode = cloneVNode(vnode, {
            // workaround. see: https://github.com/vuejs/vue-next/issues/1206
            onSelected(currentlySelected) {
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

          const prefixNode = createSelectionNode(props.selectionMode.split('-')[1])
          if (prefixNode) {
            // solution 1: not available
            // normalizeChildren(newVNode, {
            //   prefix: () => prefixNode
            // })

            // solution 2: becuase normalizeChildren is not available, we are pretty much duplicating the logic here
            // https://github.com/vuejs/vue-next/blob/master/packages/shared/src/shapeFlags.ts
            const SLOTS_CHILDREN = 1 << 5;
            newVNode.shapeFlag |= SLOTS_CHILDREN
            newVNode.children = {
              _ctx: getCurrentInstance(),
              prefix: () => h('span', { class: 'mdc-list-item__graphic' }, prefixNode)
            }
          }

          return newVNode
        })
      }
    }
  }
}

const createSelectionNode = type => {
  if (type === 'radio') return h(VmcRadio)
}
</script>

<style lang="sass">
  @use "@material/list/mdc-list"
</style>
