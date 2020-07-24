<template>
  <aside class="mdc-drawer"
    ref="rootRef"
    @transitionend="handleTransitionEnd"
    :class="[
      dismissible && css.DISMISSIBLE,
      modal && css.MODAL,
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
import handleTransition from './handleTransition'
import { onMounted, ref } from 'vue'
import {insertAfter} from 'C/addEl'

export default {
  name: "VmcDrawer",
  props: {
    title: String,
    subtitle: String,
    dismissible: Boolean,
    modal: Boolean,
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

    const rootRef = ref(null)

    const { handleTransitionEnd, state } = handleTransition(rootRef, ...arguments)

    if (props.modal) {
      // we don't have to check props.model since styling will make sure mdc-drawer-scrim is hidden by default and only display with mdc-drawer--modal
      insertAfter('mdc-drawer-scrim', rootRef)
    }

    return {
      content: contentVNodeFactory,
      state,
      handleTransitionEnd,
      css,
      rootRef
    }
  }
}
</script>

<style lang="sass">
  @use "@material/drawer/mdc-drawer"
</style>
