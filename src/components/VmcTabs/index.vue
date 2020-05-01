<template>
  <div class="mdc-tab-bar">
    <tab-scroller><component :is="tabs"/></tab-scroller>
  </div>
</template>

<script>
import {isTabComponent, mergeProps } from '@/util'
import TabScroller from './TabScroller.vue'
import { watch, ref } from 'vue'

const tabIndicatorContentSelector = '.mdc-tab-indicator__content'

export default {
  name: 'Tabs',
  components: {
    TabScroller
  },
  props: {
    modelValue: String
  },
  setup(props, context) {

    const activatedTab = ref(null)
    watch(activatedTab, (curr, prev) => {
      if (!prev || !curr) return;

      const prevIndicatorContentEl = prev.el.querySelector(tabIndicatorContentSelector)
      const currIndicatorContentEl = curr.el.querySelector(tabIndicatorContentSelector)

      const {width: prevWidth, left: prevLeft } = prevIndicatorContentEl.getBoundingClientRect()
      const {width: currWidth, left: currLeft } = currIndicatorContentEl.getBoundingClientRect()
      const widthDelta = prevWidth / currWidth;
      const xPosition = prevLeft - currLeft;

      curr.el.classList.add('mdc-tab-indicator--no-transition')
      currIndicatorContentEl.style.setProperty('transform', `translateX(${xPosition}px) scaleX(${widthDelta})`)

      currIndicatorContentEl.getBoundingClientRect()

      curr.el.classList.remove('mdc-tab-indicator--no-transition')
      currIndicatorContentEl.style.setProperty('transform', '')
    })

    return {
      tabs: () => {
        const modelValue = props.modelValue
        const children = context.slots.default();

        children.forEach(vnode => {
          if (isTabComponent(vnode)) {

            const active = vnode.props.href === modelValue
            if (active) {
              activatedTab.value = vnode
            }

            mergeProps(vnode, {
              onActivate(newHref) {
                context.emit("update:modelValue", newHref);
              },
              active
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
