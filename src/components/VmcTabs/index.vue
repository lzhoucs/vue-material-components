<template>
  <div class="mdc-tab-bar">
    <tab-scroller><component :is="tabs"/></tab-scroller>
  </div>
</template>

<script>
import {isTabComponent, mergeProps } from '@/util'
import TabScroller from './TabScroller.vue'

export default {
  name: 'Tabs',
  components: {
    TabScroller
  },
  props: {
    modelValue: String
  },
  setup(props, context) {
    return {
      tabs: () => {
        const children = context.slots.default();

        children.forEach((vnode) => {
          if (isTabComponent(vnode)) {
            mergeProps(vnode, {
              onActivate(newHref) {
                context.emit("update:modelValue", newHref);
              },
              active: vnode.props.href === props.modelValue
            });
          } else {
            console.warn('VmcTab is expected to be the default slot of VmcTabs')
          }
        });
        return children;
      }
    };
  }
}
</script>

<style lang="sass">
@use "@material/tab-bar/mdc-tab-bar"
</style>
