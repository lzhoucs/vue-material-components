<template>
  <aside class="mdc-drawer">
    <div class="mdc-drawer__header" v-if="title || subtitle">
      <h3 class="mdc-drawer__title" v-if="title">{{title}}</h3>
      <h6 class="mdc-drawer__subtitle">{{subtitle}}</h6>
    </div>
    <div class="mdc-drawer__content">
      <component :is="content" />
    </div>
  </aside>
</template>

<script>
import {mergeProps } from '@/util'

export default {
  name: "VmcDrawer",
  props: {
    title: String,
    subtitle: String
  },
  setup(props, {slots}) {
    const contentVNodeFactory = () => {
      // assuming default slot is a single list component
      const [listVNode] = slots.default()

      mergeProps(listVNode, {
        activationOnSelected: true
      })
      return listVNode
    }

    return {
      content: contentVNodeFactory
    }
  }
}
</script>

<style lang="sass">
@use "@material/drawer/mdc-drawer"
</style>
