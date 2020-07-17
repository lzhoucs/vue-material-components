<template>
  <div ref="rootRef"
    class="vmc-drawer-app-content"
    :class="[
      hasDismissibleDrawer && 'mdc-drawer-app-content'
      ]">
    <component :is="content"></component>
  </div>
</template>

<script>
import {mergeProps, isAppBarComponent } from '@/util'
import {cssClasses as css} from '@material/drawer/constants'
import { onMounted, ref } from 'vue'

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


    const rootRef = ref(null)
    const hasDismissibleDrawer = ref(false)
    const hasModalDrawer = ref(false)

    onMounted(() => {
      const drawer = rootRef.value.previousElementSibling;
      if (drawer && drawer.classList.contains(css.DISMISSIBLE)) hasDismissibleDrawer.value = true
    })

    return {
      content: contentVNodesFactory,
      rootRef,
      hasDismissibleDrawer,
      hasModalDrawer
    }
  }
}
</script>

<style lang="sass" scoped>
  .vmc-drawer-app-content
    position: relative
</style>
