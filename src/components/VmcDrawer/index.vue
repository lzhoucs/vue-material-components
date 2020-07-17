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
import {cssClasses as css} from '@material/drawer/constants'
import userDismissible from './useDismissible'

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

    const { handleTransitionEnd, state } = userDismissible(...arguments)

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
