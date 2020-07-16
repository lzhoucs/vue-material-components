<template>
  <aside class="mdc-drawer"
    @transitionend="handleTransitionEnd"
    :class="[
      dismissible && css.DISMISSIBLE,
      (open || (state ==='closing')) && css.OPEN,
      open && (state !=='opened') && css.ANIMATE,
      (state === 'opening') && css.OPENING,
      (state === 'closing') && css.CLOSING
      ]"
  >
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
import { nextTick, watch, ref, onMounted } from 'vue'
import {cssClasses as css} from '@material/drawer/constants'

export default {
  name: "VmcDrawer",
  props: {
    title: String,
    subtitle: String,
    dismissible: Boolean,
    open: Boolean
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

    const state = ref(null)

    watch(() => props.open, open => {
      if (props.dismissible) {
        if (open) {
          requestAnimationFrame(() => {
            setTimeout(() => state.value = "opening", 0)
          })
        } else {
          state.value = "closing"
        }
      }

    })

    const handleTransitionEnd = () => {
      if (state.value === 'opening') state.value = "opened"
      else if (state.value === 'closing') state.value = "closed"
    }

    return {
      content: contentVNodeFactory,
      state,
      handleTransitionEnd,
      css
    }
  }
}
</script>

<style lang="sass">
  @use "@material/drawer/mdc-drawer"
</style>
