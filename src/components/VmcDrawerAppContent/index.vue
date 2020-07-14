<template>
  <div class="mdc-drawer-app-content">
    <component :is="content"></component>
  </div>
</template>

<script>
import {mergeProps } from '@/util'
import {isAppBarComponent} from '@/util'

export default {
  name: "VmcDrawerAppContent",
  setup(props, {slots}) {
    const contentVNodesFactory = () => {
      const contentVNodes = slots.default ? slots.default() : []

      contentVNodes.forEach(vnode => {
        if (!isAppBarComponent(vnode)) return vnode;

        mergeProps(vnode, {
          absolute: true
        })
      })

      return contentVNodes
    }

    return {
      content: contentVNodesFactory
    }
  }
}
</script>
